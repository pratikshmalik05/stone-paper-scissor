import { useState } from "react";

// The 3 choices available in the game
const choices = ["Stone", "Paper", "Scissors"];

// This function decides who wins
function getResult(player, computer) {
  if (player === computer) {
    return "Draw!";
  }
  if (
    (player === "Stone" && computer === "Scissors") ||
    (player === "Paper" && computer === "Stone") ||
    (player === "Scissors" && computer === "Paper")
  ) {
    return "You Win!";
  }
  return "You Lose!";
}

export default function App() {
  // Store what the player and computer picked
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");

  // Store the result message
  const [result, setResult] = useState("");

  // Store the score
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  // This runs when the player clicks a button
  function handleClick(choice) {
    // Computer picks randomly
    const randomIndex = Math.floor(Math.random() * 3);
    const compChoice = choices[randomIndex];

    // Find out the result
    const outcome = getResult(choice, compChoice);

    // Save the choices and result to state
    setPlayerChoice(choice);
    setComputerChoice(compChoice);
    setResult(outcome);

    // Update the score
    if (outcome === "You Win!") {
      setScore({ ...score, win: score.win + 1 });
    } else if (outcome === "You Lose!") {
      setScore({ ...score, lose: score.lose + 1 });
    } else {
      setScore({ ...score, draw: score.draw + 1 });
    }
  }

  // Reset everything back to start
  function handleReset() {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setScore({ win: 0, lose: 0, draw: 0 });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <h1>Stone Paper Scissors</h1>

      {/* Score Board */}
      <p>
        Wins: {score.win} | Losses: {score.lose} | Draws: {score.draw}
      </p>

      {/* Choice Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleClick("Stone")}  style={btnStyle}>🪨 Stone</button>
        <button onClick={() => handleClick("Paper")}  style={btnStyle}>📄 Paper</button>
        <button onClick={() => handleClick("Scissors")} style={btnStyle}>✂️ Scissors</button>
      </div>

      {/* Show result only after a choice is made */}
      {result && (
        <div>
          <p>You picked: <strong>{playerChoice}</strong></p>
          <p>Computer picked: <strong>{computerChoice}</strong></p>
          <h2>{result}</h2>
        </div>
      )}

      {/* Reset Button */}
      {result && (
        <button onClick={handleReset} style={resetStyle}>
          Reset
        </button>
      )}
    </div>
  );
}

// Button styles stored in a variable to keep JSX clean
const btnStyle = {
  margin: "5px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "1px solid #ccc",
};

const resetStyle = {
  marginTop: "10px",
  padding: "8px 20px",
  fontSize: "14px",
  cursor: "pointer",
  borderRadius: "8px",
  border: "1px solid #ccc",
  background: "#f0f0f0",
};