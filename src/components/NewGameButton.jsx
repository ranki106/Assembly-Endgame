export default function NewGameButton(props) {
    return (
        <div className="new-game">
            <button  
                onClick={() => props.onClick()}
            className="new-game">
                New Game
            </button>
        </div>
    )
}

//onClick={props.onClick}