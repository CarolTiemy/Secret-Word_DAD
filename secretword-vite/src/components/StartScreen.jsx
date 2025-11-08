import { useState } from "react";
import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  const [difficulty, setDifficulty] = useState("easy");

  const handleStart = () => {
    startGame(difficulty); 
  };

  return (
    <div className="start">
      <h1>Secret Word 🤫</h1>
      <p>Escolha a dificuldade e clique para começar 👇</p>

      <div className="difficulty">
        <label htmlFor="difficulty">Dificuldade:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Fácil (5 vidas)</option>
          <option value="hard">Difícil (2 vidas)</option>
        </select>
      </div>

      <button onClick={handleStart}>Começar jogo</button>
    </div>
  );
};

export default StartScreen;
