import { useCallback, useEffect, useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import "./App.css";
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { category, word };
  }, [words]);

  const startGame = useCallback(
    (selectedDifficulty = "easy") => {
      setDifficulty(selectedDifficulty);
      setGuessedLetters([]);
      setWrongLetters([]);

      const { category, word } = pickWordAndCategory();
      const wordLetters = word.toLowerCase().split("");

      setPickedCategory(category);
      setPickedWord(word);
      setLetters(wordLetters);

      const initialGuesses = selectedDifficulty === "hard" ? 2 : 5;
      setGuesses(initialGuesses);

      setGameStage(stages[1].name);
    },
    [pickWordAndCategory]
  );

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  const clearGame = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  useEffect(() => {
    if (guesses <= 0) {
      const currentHighScore = parseInt(localStorage.getItem("highscore")) || 0;
      if (score > currentHighScore) {
        localStorage.setItem("highscore", score);
      }
      clearGame();
      setGameStage(stages[2].name);
    }
  }, [guesses, score]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    if (uniqueLetters.length > 0 && guessedLetters.length === uniqueLetters.length) {
      setScore((s) => s + 100);
      startGame(difficulty);
    }
  }, [guessedLetters, letters, startGame, difficulty]);

  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
