import clsx from 'clsx'
import { getFarewellText } from '../utils.js'
import { languages } from '../languages.js'

export default function Status(props) {
    const className = clsx("status", {
        won: props.isGameWon,
        lost: props.isGameLost,
        farewell: !props.isGameOver && props.isLastGuessIncorrect,
    })

    function renderGameStatus() {
        if(!props.isGameOver && props.isLastGuessIncorrect) {
            const randMessage = getFarewellText(languages[props.wrongGuesses - 1].name)
            return (
                <>
                    <p className='farewell-message'> {randMessage} </p>
                </>
            )
        }

        if(props.isGameWon) {
            return (
                <>
                    <h2> You win! </h2>
                    <p> Well done! 🎉 </p>
                </>
            )
        } else if(props.isGameLost) {
            return (
                <>
                    <h2> Game Over! </h2>
                    <p> You lose! Better start learning Assembly 😭 </p>
                </>
            )
        }

        return null
    }

    return (
        <section 
            aria-live="polite"
            role="status"
            className={className}
        >
            {renderGameStatus()}
        </section>
    ) 
}