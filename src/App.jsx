import { useState } from 'react'
import Header from './components/Header.jsx'
import Main from './components/Body.jsx'
import Status from './components/Status.jsx'
import Languages from './components/Languages.jsx'
import {languages} from './languages.js'
import NewGameButton from './components/NewGameButton.jsx'
import { clsx } from 'clsx'

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
  const [word, setWord] = useState('react')
  const [guesses, setGuesses] = useState([])
  
  //derived values
  const wrongGuesses = guesses.filter(letter => !word.includes(letter)).length
  const isGameLost = (wrongGuesses >= languages.length - 1); 
  const isGameWon = word.split('').every(letter => guesses.includes(letter))
  const isGameOver = isGameLost || isGameWon
  const isLastGuessIncorrect = guesses[guesses.length - 1] && !word.includes(guesses[guesses.length - 1])
  console.log(isLastGuessIncorrect)

  //static values
  const abcs = 'abcdefghijklmnopqrstuvwxyz'

  const wordElements = word.split('').map((letter, index) => {
    const className = clsx({
      revealed: guesses.includes(letter),
      letter: true,
    })

    return (
      <span key={index} className={className}>
        {letter.toUpperCase()}
      </span>
    )
  })

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
      >
        {letter.toUpperCase()}
      </button>
    )
  })

  function handleGuess(letter){
    setGuesses(prevGuesses => prevGuesses.includes(letter) ? 
      prevGuesses : [...prevGuesses, letter])
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
      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <NewGameButton />}
    </>
  )
}

export default App
