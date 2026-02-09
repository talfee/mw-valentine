import { cloneElement } from "react";
import type { ReactElement } from "react";
import MultiStep, { useMultiStep } from "react-multistep";
import type { StepComponentProps, SignalParent } from "react-multistep";
import Question1Philosopher from "./steps/Question1Philosopher";
import Question2Munchies from "./steps/Question2Munchies";
import Question3CatName from "./steps/Question3CatName";

function QuizChrome({
  onComplete,
  children,
}: {
  onComplete: () => void;
  children: React.ReactNode;
}) {
  const { activeStep, stepCount, next, previous, currentStepValid } = useMultiStep();
  const isLastStep = activeStep === stepCount - 1;
  const progress = stepCount > 0 ? ((activeStep + 1) / stepCount) * 100 : 0;

  return (
    <div className="quiz">
      <div className="quiz__progress-wrap">
        <div className="quiz__progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="quiz__step-label">
        Question {activeStep + 1} of {stepCount}
      </p>
      <div className="quiz__content">{children}</div>
      <div className="quiz__nav">
        <button
          type="button"
          className="quiz__btn quiz__btn--back"
          onClick={previous}
          disabled={activeStep === 0}
        >
          Back
        </button>
        {isLastStep ? (
          <button
            type="button"
            className="quiz__btn quiz__btn--next"
            onClick={() => currentStepValid && onComplete()}
            disabled={!currentStepValid}
          >
            See your valentine
          </button>
        ) : (
          <button
            type="button"
            className="quiz__btn quiz__btn--next"
            onClick={next}
            disabled={!currentStepValid}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

interface StepWrapperProps {
  step: number;
  onComplete: () => void;
  children: ReactElement<Partial<StepComponentProps>>; // signalParent injected by MultiStep and passed via cloneElement
  signalParent?: SignalParent;
}

function StepWrapper({ step, onComplete, children, signalParent }: StepWrapperProps) {
  const { activeStep } = useMultiStep();
  if (activeStep !== step) return null;
  if (!signalParent) return null;
  return (
    <QuizChrome onComplete={onComplete}>
      {cloneElement(children, { signalParent } as StepComponentProps)}
    </QuizChrome>
  );
}

export default function QuizFlow({ onComplete }: { onComplete: () => void }) {
  return (
    <MultiStep>
      <StepWrapper step={0} onComplete={onComplete}>
        <Question1Philosopher />
      </StepWrapper>
      <StepWrapper step={1} onComplete={onComplete}>
        <Question2Munchies />
      </StepWrapper>
      <StepWrapper step={2} onComplete={onComplete}>
        <Question3CatName />
      </StepWrapper>
    </MultiStep>
  );
}
