import { useState } from "react";
import QuizFlow from "./QuizFlow";
import ValentineReveal from "./ValentineReveal";
import "./App.css";

function App() {
  const [phase, setPhase] = useState<"quiz" | "reveal">("quiz");

  return (
    <main className="app">
      {phase === "quiz" ? (
        <QuizFlow onComplete={() => setPhase("reveal")} />
      ) : (
        <ValentineReveal />
      )}
    </main>
  );
}

export default App;
