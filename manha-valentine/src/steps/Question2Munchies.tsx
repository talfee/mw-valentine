import { useEffect, useState } from "react";
import type { StepComponentProps } from "react-multistep";

const OPTIONS = ["Bigway", "McDonald's", "Uncle Fatih's", "Jam Jar"] as const;
const ANSWER = "Uncle Fatih's";

function Question2Munchies({ signalParent }: Partial<StepComponentProps>) {
  if (!signalParent) return null;
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isCorrect = selected === ANSWER;

  useEffect(() => {
    signalParent({ isValid: isCorrect });
  }, [isCorrect, signalParent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) {
      setError("Pick an option.");
      return;
    }
    if (selected !== ANSWER) {
      setError("Wrong, try again.");
      return;
    }
    setError("");
  };

  return (
    <div className="step step--choice">
      <h2>2/3</h2>
      <p>It's 1am and you're geeked with Tal. Where do you go for the munchies?</p>
      <form onSubmit={handleSubmit}>
        <ul className="step__options">
          {OPTIONS.map((opt) => (
            <li key={opt}>
              <label className="step__option">
                <input
                  type="radio"
                  name="munchies"
                  value={opt}
                  checked={selected === opt}
                  onChange={() => {
                    setSelected(opt);
                    setError("");
                  }}
                />
                <span>{opt}</span>
              </label>
            </li>
          ))}
        </ul>
        <button type="submit" className="step__submit">
          Check
        </button>
      </form>
      {error && <p className="step__error">{error}</p>}
    </div>
  );
}

export default Question2Munchies;
