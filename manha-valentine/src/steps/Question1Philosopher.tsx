import { useEffect, useState } from "react";
import type { StepComponentProps } from "react-multistep";

const ANSWER = "joe bart";

function Question1Philosopher({ signalParent }: Partial<StepComponentProps>) {
  const [answer, setAnswer] = useState("");
  const [hintIndices, setHintIndices] = useState<number[]>([]);
  const [error, setError] = useState("");

  const normalized = answer.trim().toLowerCase();
  const isCorrect = normalized === ANSWER;

  useEffect(() => {
    if (!signalParent) return;
    signalParent({ isValid: isCorrect });
  }, [isCorrect, signalParent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect) return;
    setError("Wrong, try again.");
  };

  const revealHint = () => {
    // Reveal the next *letter* (skip spaces so the word gap is always visible)
    for (let idx = 0; idx < ANSWER.length; idx++) {
      if (ANSWER[idx] === " ") continue;
      if (hintIndices.includes(idx)) continue;
      setHintIndices((i) => [...i, idx]);
      return;
    }
  };

  const display = ANSWER
    .split("")
    .map((char, i) => {
      // Always render the word break as an empty gap (not a revealable character)
      if (char === " ") return "";
      return hintIndices.includes(i) ? char : "_";
    })
    .join(" ");

  return (
    <div className="step step--text">
      <p>who do you believe to be the most influential philosopher of all time?</p>
      <p className="step__hint-display">{display}</p>
      <div className="step__hint-row">
        <button type="button" className="step__hint-btn" onClick={revealHint}>
          Hint
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError("");
          }}
          placeholder="Your answer"
          className={`step__input${isCorrect ? " step__input--correct" : ""}`}
          autoComplete="off"
        />
      </form>
      {error && <p className="step__error">{error}</p>}
    </div>
  );
}

export default Question1Philosopher;
