function DrawCardButton({setPack,pack}){
    let color = 0;
    let num = 0;
    function getRandomCard(){
        num = Math.floor(Math.random() * 10)
        color = Math.floor(Math.random() * 4);
        if (color === 0){
            color = "blue";
        } 
        else if (color === 1){
            color = "red";
        }
        else if (color === 2){
            color = "green";
        }
        else if (color === 3){
            color = "yellow";
        }
        setPack([...pack,{"color": color,
                          "number": num
        }])
    }
    return(
        <button onClick={() => getRandomCard()}>draw</button>
    );
}
export default DrawCardButton;