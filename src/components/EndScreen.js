import "./EndScreen.css"
const EndScreen = ({restart, score}) => {

  return (
    <div>
      <h1>Fim de jogo</h1>
      <h1>A sua pontuação foi de: <span>{score}</span></h1>
      <button onClick={restart} className="Button reset-button" focus>Restart game</button>
    </div>
  )
}

export default EndScreen