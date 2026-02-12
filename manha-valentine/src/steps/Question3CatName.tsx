import { useEffect, useState } from "react";
import type { StepComponentProps } from "react-multistep";

const ANSWER = "gnocchi";

function Question3CatName({ signalParent }: Partial<StepComponentProps>) {
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
    const next = hintIndices.length;
    if (next < ANSWER.length) setHintIndices((i) => [...i, next]);
  };

  const display = ANSWER.split("").map((char, i) =>
    hintIndices.includes(i) ? char : "_"
  ).join(" ");

  return (
    <div className="step step--text">
      <p>who is this creature?</p>
      <img
        className="step__image"
        src="/gnocchi.png"
        alt="a cat in a green hoodie"
        loading="lazy"
      />
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

export default Question3CatName;
