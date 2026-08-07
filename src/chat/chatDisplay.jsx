import { useState } from "react";

function ChatDisplay({ chat, socket }) {
    const [temp, setTemp] = useState("");

    function sendChat() {
        if (temp.trim() === "") return;
        socket.emit("chat_on", temp);

        setTemp("");
    }

    return (
        <div>
            <h1>-------CHAT FIELD-------</h1>

            {chat.map((message, index) => (
                <p key={index}>
                    Player {message.player}: {message.message}
                </p>
            ))}

            <textarea
                placeholder="enter chat"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
            />

            <button onClick={() => sendChat()}>
                Send
            </button>
        </div>
    );
}

export default ChatDisplay;