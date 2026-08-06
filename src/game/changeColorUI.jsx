// changeColorUI.jsx
function ChangeColorUI({ awaitingColorChoice, onChooseColor }) {
    return (
        awaitingColorChoice
            ? <div>
                <button onClick={() => onChooseColor("red")}>red</button>
                <button onClick={() => onChooseColor("blue")}>blue</button>
                <button onClick={() => onChooseColor("green")}>green</button>
                <button onClick={() => onChooseColor("yellow")}>yellow</button>
            </div>
            : null
    );
}
export default ChangeColorUI;