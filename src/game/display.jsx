import { useState } from "react";
function Display({ pack, lastColor, isYourTurn, onPlayCard }) {
    const [page, setPage] = useState(0);
    function changePage(dir) {
        if (dir === 0) { if (page === 0) return; setPage(page - 1); }
        if (dir === 1) { if (page === Math.floor(pack.length / 5)) return; setPage(page + 1); }
    }
    return (
        <div>
            <p>you currently have: {pack.length} cards including:</p>
            {pack.slice(page*5,(page+1)*5).map((card, idx) => (
                <div key={page*5+idx}>
                    <span>{`${card.color === null ? "" : card.color} ${card.number}`}</span>
                    <button disabled={!isYourTurn} onClick={() => onPlayCard(card, page*5+idx)}>play</button>
                </div>
            ))}
            <button onClick={() => changePage(0)}>up</button>
            <button onClick={() => changePage(1)}>down</button>
            <p>{page}/{Math.floor(pack.length / 5)}</p>
        </div>
    );
}
export default Display;