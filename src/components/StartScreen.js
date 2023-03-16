import "./StartScreen.css"
const StartScreen = ({start}) => {
  return (
    <div className="Start">
        <h1>Secret Word</h1>
        <p>Clique no botão abaixo para começar</p>
        <button className="Button" onClick={start}>Começar a Jogar</button>
    </div>
  )
}

export default StartScreen