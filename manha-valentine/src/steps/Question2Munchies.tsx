import { useEffect, useState } from "react";
import type { StepComponentProps } from "react-multistep";

const OPTIONS = ["bigway", "mcdonald's", "uncle fatih's", "jam jar"] as const;
const ANSWER = "bigway";

function Question2Munchies({ signalParent }: Partial<StepComponentProps>) {
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState("");

  const isCorrect = selected === ANSWER;

  useEffect(() => {
    if (!signalParent) return;
    signalParent({ isValid: isCorrect });
  }, [isCorrect, signalParent]);

  return (
    <div className="step step--choice">
      <p>it's 1am and you're geeked with tal. where do you go for the munchies?</p>
      <ul className="step__options">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt;
          const isSelectedCorrect = isSelected && opt === ANSWER;
          return (
            <li key={opt}>
              <label
                className={`step__option${isSelectedCorrect ? " step__option--correct" : ""}`}
              >
                <input
                  type="radio"
                  name="munchies"
                  value={opt}
                  checked={isSelected}
                  onChange={() => {
                    setSelected(opt);
                    setError(opt === ANSWER ? "" : "Wrong, try again.");
                  }}
                />
                <span>{opt}</span>
              </label>
            </li>
          );
        })}
      </ul>
      {error && <p className="step__error">{error}</p>}
    </div>
  );
}

export default Question2Munchies;
