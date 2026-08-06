import { useState } from "react";
function Display({pack}){
    const [page,setPage] = useState(0);
    function changePage(dir){
        if (dir === 0){
            if (page === 0){
                return;
            }
            setPage(page - 1);
        }
        if (dir === 1){
            if (page === Math.floor(pack.length / 5)){
                return;
            }
            setPage(page + 1);
        }
    }   
    function playCard(card){
        console.log(card);
    }
    return(
        <div>
            <p>you currently has:{pack.length} cards includes:</p>
            {pack.slice(page*5,(page+1)*5).map((card,idx) => (
                <div key={idx}>
                    <p>
                        {`${card.color} ${card.number}`}
                    </p>
                    <button onClick={() => playCard(card)}>play</button>
                </div>
            ))}
            <button onClick={() => changePage(0)}>up</button>
            <button onClick={() => changePage(1)}>down</button>
            <p>{page}/{Math.floor(pack.length / 5)}</p>
        </div>
    );
}
export default Display;