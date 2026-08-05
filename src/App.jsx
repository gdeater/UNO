import DrawCardButton from "./game/drawCardButton";
import Display from "./game/display";
import { useState } from "react";
function App(){
  const [pack,setPack] = useState([]);
  return(
    <div>
      <Display pack={pack}/>
      <DrawCardButton setPack={setPack} pack={pack}></DrawCardButton>
    </div>
  );
}
export default App;