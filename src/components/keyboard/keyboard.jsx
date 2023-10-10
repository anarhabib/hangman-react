import letters from "../../letters.json";
import styles from "./keyboard.module.css";

export function Keyboard({
  activeLetters,
  incorrectLetters,
  addGuessedLetter,
  disabled = false,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit ,minmax(75px,1fr))",
        gap: ".5rem",
      }}
    >
      {letters.map((letter) => {
        const isAvtive = activeLetters.includes(letter);
        const isInactive = incorrectLetters.includes(letter);

        return (
          <button
            onClick={() => {
              addGuessedLetter(letter);
            }}
            className={`${styles.btn} ${isAvtive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            disabled={isAvtive || isInactive || disabled}
            key={letter}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
