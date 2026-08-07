function JoinRoom({ roomCodeInput, setRoomCodeInput, onCreate, onJoin, error, myRoomCode }) {
    return (
        <div>
            <p>create room - join room.</p>
            <button onClick={onCreate}>create room</button>
            {myRoomCode && <p>your room code: <strong>{myRoomCode}</strong></p>}
            <input placeholder="enter room code" value={roomCodeInput} onChange={(e) => setRoomCodeInput(e.target.value)} />
            <button onClick={onJoin}>join room</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
export default JoinRoom;