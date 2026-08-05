import DrawCardButton from "./game/drawCardButton";
import { useState } from "react";
function App(){
  const [pack,setPack] = useState([]);
  return(
    <div>
      <DrawCardButton setPack={setPack} pack={pack}></DrawCardButton>
    </div>
  );
}
export default App;