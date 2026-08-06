import { useState } from "react";
function Display({pack, setAnnouncement, setLastColor, lastColor}){
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
    function playCard(card,idx){
        if ((lastColor === "" || card.color === lastColor) && card.color !== null){
            setAnnouncement(`you played a: ${card.color} ${card.number}`)
            pack.splice(idx,1);
            setLastColor(card.color);
            return;
        }
        else if (card.color === null){
            setAnnouncement(`you played a: ${card.number}`);
            pack.splice(idx,1);
            setLastColor(`choose your color`);
            return;
        } else {
            setAnnouncement(`same color`);
            return;
        }
    }
    return(
        <div>
            <p>you currently has:{pack.length} cards includes:</p>
            {pack.slice(page*5,(page+1)*5).map((card,idx) => (
                <div key={idx}>
                    <span>
                        {`${card.color === null ? "" : card.color} ${card.number}`}
                    </span>
                    <button onClick={() => playCard(card,idx)}>play</button>
                </div>
            ))}
            <button onClick={() => changePage(0)}>up</button>
            <button onClick={() => changePage(1)}>down</button>
            <p>{page}/{Math.floor(pack.length / 5)}</p>
        </div>
    );
}
export default Display;