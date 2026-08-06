import DrawCardButton from "./game/drawCardButton";
import Display from "./game/display";
import Annoucement from "./game/Announcement";
import ChangeColorUI from "./game/changeColorUI";
import LastColor from "./game/lastColor";
import JoinRoom from "./game/joinRoom";
import OpponentInfo from "./game/opponentInfo";
import { useState, useEffect } from "react";
import { socket } from "./socket";

function App(){
  const [joined, setJoined] = useState(false);
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [myRoomCode, setMyRoomCode] = useState("");
  const [joinError, setJoinError] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [state, setState] = useState({
    yourHand: [], opponentCardCount: 0, opponentConnected: false,
    lastColor: "", isYourTurn: false, started: false,
    awaitingColorChoice: false, winner: null,
  });

  useEffect(() => {
    socket.connect();
    socket.on("room_created", ({ roomCode }) => setMyRoomCode(roomCode));
    socket.on("room_joined", () => setJoined(true));
    socket.on("join_error", (msg) => setJoinError(msg));
    socket.on("game_state", (s) => {
      setState(s);
      if (s.announcement) setAnnouncement(s.announcement);
      setJoined(true);
    });
    socket.on("opponent_left", () => setAnnouncement("your opponent disconnected."));
    return () => {
      socket.off("room_created");
      socket.off("room_joined");
      socket.off("join_error");
      socket.off("game_state");
      socket.off("opponent_left");
      socket.disconnect();
    };
  }, []);

  if (state.winner){
    return (
      <div>
        <h1>UNO</h1>
        <h2>{state.winner === "you" ? "you win!" : "you lose!"}</h2>
      </div>
    );
  }

  return(
    <div>
      <h1>UNO</h1>
      {!joined ? (
        <JoinRoom
          roomCodeInput={roomCodeInput}
          setRoomCodeInput={setRoomCodeInput}
          onCreate={() => socket.emit("create_room")}
          onJoin={() => socket.emit("join_room", roomCodeInput)}
          error={joinError}
          myRoomCode={myRoomCode}
        />
      ) : (
        <>
          <OpponentInfo opponentCardCount={state.opponentCardCount}
                        opponentConnected={state.opponentConnected}
                        isYourTurn={state.isYourTurn}/>
          <Display pack={state.yourHand}
                   lastColor={state.lastColor}
                   isYourTurn={state.isYourTurn}
                   onPlayCard={(card, idx) => socket.emit("play_card", idx)}/>
          <DrawCardButton onDraw={() => socket.emit("draw_card")} isYourTurn={state.isYourTurn}/>
          <Annoucement announcement={announcement}/>
          <LastColor lastColor={state.lastColor}/>
          <ChangeColorUI awaitingColorChoice={state.awaitingColorChoice}
                         onChooseColor={(color) => socket.emit("choose_color", color)}/>
        </>
      )}
    </div>
  );
}
export default App;