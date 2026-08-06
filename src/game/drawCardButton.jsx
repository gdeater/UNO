// drawCardButton.jsx
function DrawCardButton({ onDraw, isYourTurn }) {
    return (<button disabled={!isYourTurn} onClick={onDraw}>draw</button>);
}
export default DrawCardButton;