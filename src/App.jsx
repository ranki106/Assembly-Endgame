import { useState } from 'react'
import Header from './components/Header.jsx'
import Main from './components/Body.jsx'
import Status from './components/Status.jsx'
import Languages from './components/Languages.jsx'
import { languages } from './languages.js'
import NewGameButton from './components/NewGameButton.jsx'
import { clsx } from 'clsx'
import { getRandomWord } from './utils.js'
import Confetti from 'react-confetti'

/*
  backlog
  - farewell messages in status section
  - fix ally issues i18n 
  - Make the new game button work
  - Choose a random word from the list of words
  - Confetti drop when the user wins
*/
function App() {

  //state values
  //() => getRandomWord()
  const [word, setWord] = useState("react")
  const [guesses, setGuesses] = useState([])
  
  //derived values
  const wrongGuesses = guesses.filter(letter => !word.includes(letter)).length
  const isGameLost = (wrongGuesses >= languages.length - 1); 
  const isGameWon = word.split('').every(letter => guesses.includes(letter))
  const isGameOver = isGameLost || isGameWon
  const isLastGuessIncorrect = guesses[guesses.length - 1] && !word.includes(guesses[guesses.length - 1])
  const lastGuessedLetter = guesses[guesses.length - 1]

  //static values
  const abcs = 'abcdefghijklmnopqrstuvwxyz'

  //creates our word
  const wordElements = word.split('').map((letter, index) => {
    const className = clsx({
      revealed: guesses.includes(letter) || isGameOver,
      gameOver: isGameOver && !guesses.includes(letter),
      letter: true,
    })

    return (
      <span key={index} className={className}>
        {letter.toUpperCase()}
      </span>
    )
  })

  //creates our keyboard
  const keyboardElements = abcs.split('').map((letter, index) => {
    const isGuessed = guesses.includes(letter)
    const isCorrect = isGuessed && word.includes(letter)
    const isWrong = isGuessed && !word.includes(letter)
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    })
 
    return (
      <button 
        key={index}
        onClick={() => handleGuess(letter)}
        className={className}
        disabled={isGameOver || isGuessed}
        aria-disabled={isGameOver || isGuessed}
        aria-label={`letter ${letter}`}
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  //function to handle guesses, updates our guess array only if its a new guess
  function handleGuess(letter){
    setGuesses(prevGuesses => prevGuesses.includes(letter) ? 
      prevGuesses : [...prevGuesses, letter])
  }

  //function to reset the game
  function newGameReset() {
    setWord(getRandomWord())
    setGuesses([])
  }

  return (
    <>
      <Header />
      <Status 
        isGameOver={isGameOver}
        isGameWon={isGameWon}
        isGameLost={isGameLost}
        wrongGuesses={wrongGuesses}
        isLastGuessIncorrect={isLastGuessIncorrect}
      />
      <Languages 
        languages={languages}
        wrongGuesses={wrongGuesses}
      />
      <Main />
      <section className="word">
        {wordElements}
      </section>

      {/*
        visually hidden section for screen readers using aria-live
      */}
      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {word.includes(lastGuessedLetter) ? 
            `Correct! The letter ${lastGuessedLetter} is in the word` : 
            `Sorry! The letter ${lastGuessedLetter} is not in the word` }
            You have {languages.length - 1 - wrongGuesses} guesses left
        </p>
        
        <p>Current word: {word.split("").map(letter => {
            guesses.includes(letter) ? letter + "." : "blank"
        }).join(" ")}</p>
      </section>
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <NewGameButton 
        onClick={() => newGameReset()}
      />}
      {isGameWon && <Confetti 
        recycle={false}
        numberOfPieces={200}
      />}
    </>
  )
}

export default App
