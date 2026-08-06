import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3001;

const rooms = {};

function makeRoomCode(){
    return Math.random().toString(36).slice(2,7).toUpperCase();
}

// same odds/logic as your original drawCardButton.jsx, just living on
// the server now so both players share one fair source of randomness
function getRandomCard(){
    let num = Math.floor(Math.random() * 10);
    if (num < 3){
        const pick = Math.floor(Math.random() * 4);
        if (pick === 0){
            num = "+2";
        } else if (pick === 1){
            num = "stop";
        } else if (pick === 2){
            return { color: null, number: "WILD" };
        } else {
            return { color: null, number: "+4" };
        }
    }
    const colors = ["blue","red","green","yellow"];
    const color = colors[Math.floor(Math.random()*4)];
    return { color, number: num };
}

function stateFor(room, idx, announcement){
    const opponent = room.players[idx === 0 ? 1 : 0];
    return {
        yourHand: room.players[idx].hand,
        opponentCardCount: opponent ? opponent.hand.length : 0,
        opponentConnected: !!opponent,
        lastColor: room.lastColor,
        isYourTurn: room.started && room.turn === idx,
        started: room.started,
        awaitingColorChoice: room.awaitingColorChoice === idx,
        winner: room.winner === idx ? "you" : (room.winner !== null ? "opponent" : null),
        announcement: announcement || "",
    };
}

function sendState(roomCode, announcement){
    const room = rooms[roomCode];
    if (!room) return;
    room.players.forEach((p, idx) => {
        io.to(p.id).emit("game_state", stateFor(room, idx, announcement));
    });
}

io.on("connection", (socket) => {
    socket.on("create_room", () => {
        let code = makeRoomCode();
        while (rooms[code]) code = makeRoomCode();
        rooms[code] = {
            players: [{ id: socket.id, hand: [] }],
            turn: 0,
            lastColor: "",
            awaitingColorChoice: null,
            started: false,
            winner: null,
        };
        socket.join(code);
        socket.data.roomCode = code;
        socket.emit("room_created", { roomCode: code });
    });

    socket.on("join_room", (roomCode) => {
        const code = (roomCode || "").toUpperCase().trim();
        const room = rooms[code];
        if (!room) return socket.emit("join_error", "That room code doesn't exist.");
        if (room.players.length >= 2) return socket.emit("join_error", "That room already has 2 players.");
        room.players.push({ id: socket.id, hand: [] });
        socket.join(code);
        socket.data.roomCode = code;
        room.started = true;
        socket.emit("room_joined", { roomCode: code });
        sendState(code, "game started! player 1 goes first.");
    });

    socket.on("draw_card", () => {
        const room = rooms[socket.data.roomCode];
        if (!room || !room.started) return;
        const myIndex = room.players.findIndex(p => p.id === socket.id);
        if (room.turn !== myIndex) return;
        room.players[myIndex].hand.push(getRandomCard());
        room.turn = myIndex === 0 ? 1 : 0;
        sendState(socket.data.roomCode, `player ${myIndex+1} drew a card.`);
    });

    socket.on("play_card", (cardIndex) => {
        const room = rooms[socket.data.roomCode];
        if (!room || !room.started) return;
        const myIndex = room.players.findIndex(p => p.id === socket.id);
        if (room.turn !== myIndex) return;
        const hand = room.players[myIndex].hand;
        const card = hand[cardIndex];
        if (!card) return;

        const canPlay = card.color === null || card.color === room.lastColor || room.lastColor === "";
        if (!canPlay){
            io.to(socket.id).emit("game_state", stateFor(room, myIndex, "same color"));
            return;
        }

        hand.splice(cardIndex, 1);

        if (hand.length === 0){
            room.started = false;
            room.winner = myIndex;
            sendState(socket.data.roomCode, `player ${myIndex+1} wins!`);
            return;
        }

        if (card.color === null){
            room.lastColor = "choose your color";
            room.awaitingColorChoice = myIndex;
            sendState(socket.data.roomCode, `player ${myIndex+1} played a ${card.number} and is choosing a color...`);
            return;
        }

        room.lastColor = card.color;
        room.turn = myIndex === 0 ? 1 : 0;
        sendState(socket.data.roomCode, `player ${myIndex+1} played a ${card.color} ${card.number}.`);
    });

    socket.on("choose_color", (color) => {
        const room = rooms[socket.data.roomCode];
        if (!room || !room.started) return;
        const myIndex = room.players.findIndex(p => p.id === socket.id);
        if (room.awaitingColorChoice !== myIndex) return;
        room.lastColor = color;
        room.awaitingColorChoice = null;
        room.turn = myIndex === 0 ? 1 : 0;
        sendState(socket.data.roomCode, `color changed to ${color}.`);
    });

    socket.on("disconnect", () => {
        const code = socket.data.roomCode;
        if (code && rooms[code]) io.to(code).emit("opponent_left");
    });
});

server.listen(PORT, () => console.log(`UNO server listening on port ${PORT}`));