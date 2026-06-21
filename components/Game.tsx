"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Difficulty, GamePhase, Puzzle, Scenario } from "@/lib/types";
import { selectPuzzles } from "@/lib/game";
import { pickRandomScenario } from "@/lib/scenarios";
import IntroScreen from "./screens/IntroScreen";
import DifficultyScreen from "./screens/DifficultyScreen";
import StoryScreen from "./screens/StoryScreen";
import PuzzleScreen from "./screens/PuzzleScreen";
import EndScreen from "./screens/EndScreen";

export default function Game() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hintsTotal, setHintsTotal] = useState(0);

  const lastScenarioId = useRef<string | undefined>(undefined);

  // Temporizador: solo corre durante "playing".
  useEffect(() => {
    if (phase !== "playing") return;
    if (timeLeft <= 0) {
      setPhase("lost");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  const startWithDifficulty = useCallback((diff: Difficulty) => {
    const chosen = pickRandomScenario(lastScenarioId.current);
    lastScenarioId.current = chosen.id;
    const selected = selectPuzzles(chosen, diff);
    setDifficulty(diff);
    setScenario(chosen);
    setPuzzles(selected);
    setCurrentIndex(0);
    setTimeLeft(diff.timeSeconds);
    setHintsTotal(0);
    setPhase("story");
  }, []);

  const beginPlaying = useCallback(() => setPhase("playing"), []);

  const handleSolved = useCallback(
    (hintsUsedThisPuzzle: number) => {
      setHintsTotal((h) => h + hintsUsedThisPuzzle);
      setCurrentIndex((idx) => {
        const next = idx + 1;
        if (next >= puzzles.length) {
          setPhase("won");
          return idx;
        }
        return next;
      });
    },
    [puzzles.length]
  );

  const restart = useCallback(() => {
    setPhase("intro");
    setDifficulty(null);
    setScenario(null);
    setPuzzles([]);
    setCurrentIndex(0);
    setTimeLeft(0);
    setHintsTotal(0);
  }, []);

  const playAgain = useCallback(() => setPhase("difficulty"), []);

  const elapsed = useMemo(
    () => (difficulty ? difficulty.timeSeconds - timeLeft : 0),
    [difficulty, timeLeft]
  );

  return (
    <div className="w-full max-w-3xl">
      {phase === "intro" && (
        <IntroScreen onStart={() => setPhase("difficulty")} />
      )}

      {phase === "difficulty" && (
        <DifficultyScreen onSelect={startWithDifficulty} onBack={restart} />
      )}

      {phase === "story" && scenario && difficulty && (
        <StoryScreen
          scenario={scenario}
          difficulty={difficulty}
          puzzleCount={puzzles.length}
          onBegin={beginPlaying}
        />
      )}

      {phase === "playing" && scenario && difficulty && puzzles[currentIndex] && (
        <PuzzleScreen
          key={puzzles[currentIndex].id}
          scenario={scenario}
          difficulty={difficulty}
          puzzle={puzzles[currentIndex]}
          index={currentIndex}
          total={puzzles.length}
          timeLeft={timeLeft}
          onSolved={handleSolved}
        />
      )}

      {(phase === "won" || phase === "lost") && scenario && difficulty && (
        <EndScreen
          won={phase === "won"}
          scenario={scenario}
          difficulty={difficulty}
          elapsed={elapsed}
          hintsTotal={hintsTotal}
          solved={currentIndex + (phase === "won" ? 1 : 0)}
          total={puzzles.length}
          onPlayAgain={playAgain}
          onHome={restart}
        />
      )}
    </div>
  );
}
