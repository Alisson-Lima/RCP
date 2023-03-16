import "./GameScreen.css"
import { useState, useRef } from "react"
const GameScreen = ({verifyLetter, pickedWord, pickedTheme, letters, guessedLetters, wrongLetters, guesses, score}) => {
  
  const [letter, setLetter] = useState("")
  
  const letterInputRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    verifyLetter(letter)
    setLetter("")
    letterInputRef.current.focus()
  }


  return (
    <div className="Game">
      <p className="points">{score}</p>
      <h1>Adivinhe a palavra</h1>
      <h3 className="tip">Dica da palavra: <span>{pickedTheme}</span></h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordContainer">
        {
          letters.map((letter, i) =>(
            guessedLetters.includes(letter) ? (
              <span key={i} className="letter">{letter}</span>
            ) : (
              <span key={i} className="blankSquare"></span>
            )
          ))
        }
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra</p>
        <form onSubmit={handleSubmit}>
          <input type="text" maxLength={1} required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
          <button className="Button">Jogar</button>
        </form>
      </div>
      <div className="wrongLetters">
        <p>Letras já utilizadas:</p>
        {
          wrongLetters.map((letter, i) =>(
            <span key={i}>{letter}</span>
        ))
        }
      </div>
    </div>
  )
}

export default GameScreen