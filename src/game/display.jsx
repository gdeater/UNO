function Display({pack}){
    return(
        <div>
            {pack.map((card,idx) => (
                <p key={idx}>
                    {`${card.color} ${card.number}`}
                </p>
            ))}
        </div>
    );
}
export default Display;