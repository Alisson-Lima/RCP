// CSS
import './App.css';

// REACT
import { useCallback, useEffect, useState } from "react";

// DATA
import {wordsList} from "./data/words"

// COMPONENTS
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
]

function App() {
  // Variables

  const guessesQTD = 3
  const [gameStage, setGameStage] = useState("start")
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState()
  const [pickedTheme, setPickedTheme] = useState()
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQTD)
  const [score, setScore] = useState(0)
  // Function to start the game

  const pickWordAndTheme = useCallback(()=>{
    // Theme
    const themes = Object.keys(words)
    const theme = themes[Math.floor(Math.random() * themes.length)]
    
    // Word
    const word = words[theme][Math.floor(Math.random() * words[theme].length)]
    return {theme, word}

  },[words])

  const startGame = useCallback(() =>{
    clearLetterStates()
    // Getting theme and word
    const {theme, word} = pickWordAndTheme()

    // Spliting word in array
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    // Fill states
    setPickedTheme(theme)
    setPickedWord(word)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  }, [pickWordAndTheme])

  // Function to verify letter of input
  const verifyLetter = (letter) =>{

    const normalized = letter.toLowerCase()

    // Check if letter have already been utilized
    if(guessedLetters.includes(normalized) || wrongLetters.includes(normalized)){
      return
    }

    // Push guessed letter or remove guess

    if(letters.includes(normalized)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalized,
      ])
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalized,
      ])

      setGuesses((actualguesses) => --actualguesses)
    }
  }
  

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(()=>{
    if(guesses <= 0){
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])

  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => (actualScore += 100) )
      startGame()
    }
  }, [guessedLetters, letters, startGame])

  // Function to restart the game
  const restartGame = () =>{
    setScore(0)
    setGuesses(guessesQTD)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
    {gameStage === "start" && <StartScreen start={startGame}/>}
    {gameStage === "game" && <GameScreen
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedTheme={pickedTheme}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
    />}
    {gameStage === "end" && <EndScreen restart={restartGame} score={score} lastWord={pickedWord}/>}
    </div>
  );
}

export default App;
