function OpponentInfo({ opponentCardCount, opponentConnected, isYourTurn }) {
    return (
        <div>
            <p>opponent: {opponentConnected ? `${opponentCardCount} cards` : "waiting for them to join..."}</p>
            {opponentConnected && <p><strong>{isYourTurn ? "your turn" : "opponent's turn"}</strong></p>}
        </div>
    );
}
export default OpponentInfo;