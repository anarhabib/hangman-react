export function ActiveWord({ wordToGuess, guessedLetters, reveal = false }) {
  return (
    <div
      style={{
        display: "flex",
        gap: ".25em",
        fontSize: "6rem",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontFamily: "monospace",
      }}
    >
      {wordToGuess.split("").map((lett, index) => (
        <span style={{ borderBottom: "3px  solid black" }} key={index}>
          <span
            style={{
              visibility:
                guessedLetters.includes(lett) || reveal ? "visible" : "hidden",
              color: !guessedLetters.includes(lett) && reveal ? "red" : "black",
            }}
          >
            {lett}
          </span>
        </span>
      ))}
    </div>
  );
}
