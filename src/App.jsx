import DrawCardButton from "./game/drawCardButton";
import Display from "./game/display";
import Annoucement from "./game/Announcement";
import ChangeColorUI from "./game/changeColorUI";
import { useState } from "react";
import LastColor from "./game/lastColor";

function App(){
  const [hand1, setHand1] = useState([]);
  const [hand2, setHand2] = useState([]);
  const [turn, setTurn] = useState(1);
  const [announcement, setAnnouncement] = useState("");
  const [lastColor, setLastColor] = useState("");
  const [winner, setWinner] = useState(null);

  const pack = turn === 1 ? hand1 : hand2;
  const setPack = turn === 1 ? setHand1 : setHand2;

  function endTurn(){
    const next = turn === 1 ? 2 : 1;
    setTurn(next);
    setAnnouncement(`player ${next}'s turn`);
  }

  function onWin(){
    setWinner(turn);
  }

  if (winner){
    return (
      <div>
        <h1>UNO</h1>
        <h2>player {winner} wins!</h2>
      </div>
    );
  }

  return(
    <div>
      <h1>UNO</h1>
      <h2>player {turn}'s turn</h2>
      <p>player 1: {hand1.length} cards — player 2: {hand2.length} cards</p>
      <Display pack={pack}
               setAnnouncement={setAnnouncement}
               setLastColor={setLastColor}
               lastColor={lastColor}
               endTurn={endTurn}
               onWin={onWin}/>
      <DrawCardButton setPack={setPack} 
                      pack={pack}
                      setAnnouncement={setAnnouncement}
                      endTurn={endTurn}></DrawCardButton>
      <Annoucement setAnnouncement={setAnnouncement} 
                   announcement={announcement}/>
      <LastColor lastColor={lastColor}></LastColor>
      <ChangeColorUI lastColor={lastColor}
                     setLastColor={setLastColor}
                     endTurn={endTurn}/>
    </div>
  );
}
export default App;