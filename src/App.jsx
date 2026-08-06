import DrawCardButton from "./game/drawCardButton";
import Display from "./game/display";
import Annoucement from "./game/Announcement";
import { useState } from "react";
function App(){
  const [pack,setPack] = useState([]);
  return(
    <div>
      <Display pack={pack}/>
      <DrawCardButton setPack={setPack} pack={pack}></DrawCardButton>
      <Annoucement/>
    </div>
  );
}
export default App;