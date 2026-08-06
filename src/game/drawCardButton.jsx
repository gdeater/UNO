function DrawCardButton({setPack,pack,setAnnouncement,endTurn}){
    let color = 0;
    let num = 0;
    function getRandomCard(){
        num = Math.floor(Math.random() * 10);
        if (num < 3){
            num = Math.floor(Math.random() * 4);
            if (num === 0){
                num = "+2";
            }
            else if (num === 1){
                num = "stop";
            }
            else if (num === 2){
                num = "WILD";
                setPack([...pack,{"color": null,
                          "number": "WILD"
                }]);
                setAnnouncement(`you draw a WILD`);
                endTurn();
                return;
            }
            else {
                num = "+4";
                setPack([...pack,{"color": null,
                          "number": "+4"
                }]);
                setAnnouncement(`you draw a +4`);
                endTurn();
                return;
            }
        }
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
        setAnnouncement(`you draw a ${color} ${num}`);
        endTurn();
    }
    return(
        <button onClick={() => getRandomCard()}>draw</button>
    );
}
export default DrawCardButton;