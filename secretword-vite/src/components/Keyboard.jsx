import React from "react";
import "./keyboard.css";

const Keyboard = ({ onKeyPress, disabledKeys = [] }) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÃÊÔÇÉ".split("");

  return (
    <div className="keyboard-container">
      {letters.map((letter) => (
        <button
          key={letter}
          className="keyboard-key"
          onClick={() => onKeyPress(letter.toLowerCase())}
          disabled={disabledKeys.includes(letter.toLowerCase())}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default Keyboard;
