import DrawCardButton from "./game/drawCardButton";
import Display from "./game/display";
import Annoucement from "./game/Announcement";
import ChangeColorUI from "./game/changeColorUI";
import { useState } from "react";
import LastColor from "./game/lastColor";
function App(){
  const [pack,setPack] = useState([]);
  const [announcement,setAnnouncement] = useState("");
  const [lastColor,setLastColor] = useState("");

  return(
    <div>
      <h1>UNO</h1>
      <Display pack={pack}
               setAnnouncement={setAnnouncement}
               setLastColor={setLastColor}
               lastColor={lastColor}/>
      <DrawCardButton setPack={setPack} 
                      pack={pack}
                      setAnnouncement={setAnnouncement}></DrawCardButton>
      <Annoucement setAnnouncement={setAnnouncement} 
                   announcement={announcement}/>
      <LastColor lastColor={lastColor}></LastColor>
      <ChangeColorUI lastColor={lastColor}
                     setLastColor={setLastColor}/>
    </div>
  );
}
export default App;