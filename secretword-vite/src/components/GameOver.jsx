import "./GameOver.css";

const GameOver = ({ retry, score }) => {
  const highScore = localStorage.getItem("highscore") || 0;

  return (
    <div className="gameover">
      <h2>Fim de jogo!</h2>
      <p>A sua pontuação foi: <span>{score}</span>!</p>
      <p>Pontuação Máxima: <span>{highScore}</span></p>
      <button onClick={retry}>Tentar Novamente 🔄</button>
    </div>
  );
};

export default GameOver;
