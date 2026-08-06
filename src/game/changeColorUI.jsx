function ChangeColorUI({lastColor,setLastColor,endTurn}){
    function changeColor(color){
        setLastColor(color);
        endTurn();
    }
    return(
        lastColor === `choose your color` 
            ? <div>
                <button onClick={() => setLastColor("red")}>red</button>
                <button onClick={() => setLastColor("blue")}>blue</button>
                <button onClick={() => setLastColor("green")}>green</button>
                <button onClick={() => setLastColor("yellow")}>yellow</button>
            </div>
            : null
    );
}
export default ChangeColorUI;