import { useCallback, useEffect, useState } from "react";
import words from "../../wordList.json";
import "./App.css";
import { StickMan } from "../stickman/stickman";
import { ActiveWord } from "../activeWord/activeWord";
import { Keyboard } from "../keyboard/keyboard";

function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord);
  const [guessedLetters, setGuessedLetters] = useState([]);

  const isLooser = guessedLetters.length >= 6;
  const isWinner = wordToGuess.split("").every((letter) => {
    guessedLetters.includes(letter);
  });

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const addGuessedLetter = useCallback(
    (letter) => {
      if (guessedLetters.includes(letter) || isLooser || isWinner) return;

      setGuessedLetters((currLetter) => [...currLetter, letter]);
    },
    [guessedLetters, isLooser, isWinner]
  );

  useEffect(() => {
    const handler = (e) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [guessedLetters]);

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "3rem",
          textAlign: "center",
        }}
      >
        {isWinner ? "You won the game!" : ""}
        {isWinner ? "You lost the game!" : ""}
      </div>
      <StickMan numberOfGuesses={incorrectLetters.length} />
      <ActiveWord
        reveal={isLooser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        <Keyboard
          disabled={isLooser || isWinner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          incorrectLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
