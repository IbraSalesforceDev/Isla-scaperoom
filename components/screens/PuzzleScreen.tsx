"use client";

import { useEffect, useRef, useState } from "react";
import type { Difficulty, Puzzle, Scenario } from "@/lib/types";
import { checkAnswer, formatTime } from "@/lib/game";
import Minigame from "@/components/minigames/Minigame";

export default function PuzzleScreen({
  scenario,
  difficulty,
  puzzle,
  index,
  total,
  timeLeft,
  onSolved,
}: {
  scenario: Scenario;
  difficulty: Difficulty;
  puzzle: Puzzle;
  index: number;
  total: number;
  timeLeft: number;
  onSolved: (hintsUsed: number) => void;
}) {
  const [input, setInput] = useState("");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [solved, setSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLast = index === total - 1;
  const maxHints = Math.min(difficulty.hintsPerPuzzle, puzzle.hints.length);
  const lowTime = timeLeft <= 30;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function submit(value: string) {
    if (solved) return;
    if (checkAnswer(puzzle, value, difficulty)) {
      setSolved(true);
    } else {
      setWrong(true);
      setAttempts((a) => a + 1);
      setTimeout(() => setWrong(false), 450);
    }
  }

  function handleTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(input);
  }

  function revealHint() {
    if (hintsRevealed < maxHints) setHintsRevealed((h) => h + 1);
  }

  const progress = ((index + (solved ? 1 : 0)) / total) * 100;

  return (
    <section className="animate-fade-up">
      {/* Cabecera: progreso + reloj */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-ocean-100/80">
          <span className="text-lg">{scenario.icon}</span>
          <span className="hidden sm:inline">{scenario.title}</span>
          <span className="opacity-60">·</span>
          <span>
            Enigma {index + 1}/{total}
          </span>
        </div>
        <div
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-sm font-bold transition-colors ${
            lowTime
              ? "bg-red-500/90 text-white animate-pulse"
              : "bg-white/15 text-white"
          }`}
        >
          ⏱️ {formatTime(Math.max(0, timeLeft))}
        </div>
      </div>

      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tarjeta del enigma */}
      <div
        className={`glass rounded-[2rem] p-7 sm:p-9 ${wrong ? "animate-shake" : ""}`}
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-white/15 text-3xl">
            {puzzle.icon}
          </div>
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight">
              {puzzle.title}
            </h2>
            {isLast && (
              <span className="mt-1 inline-block rounded-full bg-amber-400/20 px-3 py-0.5 text-xs font-semibold text-amber-200">
                ✦ El escape
              </span>
            )}
          </div>
        </div>

        <p className="mt-5 text-ocean-50/90 leading-relaxed text-[15px] sm:text-base">
          {puzzle.scene}
        </p>

        <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-4">
          <p className="text-[15px] sm:text-base font-medium text-amber-50 leading-relaxed">
            {puzzle.riddle}
          </p>
        </div>

        {!solved ? (
          <>
            {puzzle.kind === "minigame" && puzzle.minigame ? (
              <Minigame
                config={puzzle.minigame}
                onSolve={() => setSolved(true)}
              />
            ) : puzzle.kind === "choice" && puzzle.options ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {puzzle.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => submit(opt)}
                    className="rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-left font-medium transition-all hover:scale-[1.02] hover:bg-white/20 active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleTextSubmit} className="mt-6 flex gap-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  inputMode={puzzle.kind === "code" ? "numeric" : "text"}
                  placeholder="Escribe tu respuesta…"
                  className="flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/40 outline-none transition focus:border-amber-300/60 focus:bg-white/15"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3.5 font-bold text-ocean-950 transition-transform hover:scale-105 active:scale-95"
                >
                  Probar
                </button>
              </form>
            )}

            {wrong && (
              <p className="mt-3 text-sm text-red-300">
                Eso no encaja. {attempts >= 2 ? "Quizá una pista ayude 👇" : "Inténtalo de nuevo."}
              </p>
            )}

            {/* Pistas */}
            <div className="mt-6">
              {hintsRevealed > 0 && (
                <ul className="mb-3 space-y-2">
                  {puzzle.hints.slice(0, hintsRevealed).map((h, i) => (
                    <li
                      key={i}
                      className="animate-pop-in rounded-xl bg-white/10 px-4 py-2.5 text-sm text-ocean-50/90"
                    >
                      <span className="mr-2">💡</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              {hintsRevealed < maxHints ? (
                <button
                  onClick={revealHint}
                  className="text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
                >
                  💡 Pedir una pista ({maxHints - hintsRevealed} restantes)
                </button>
              ) : (
                maxHints > 0 && (
                  <p className="text-xs text-ocean-100/50">
                    No quedan pistas para este enigma.
                  </p>
                )
              )}
            </div>
          </>
        ) : (
          <div className="mt-6 animate-fade-up">
            <div className="rounded-2xl border border-emerald-300/40 bg-emerald-400/15 p-5">
              <p className="font-semibold text-emerald-100 mb-1">
                ✓ ¡Correcto!
              </p>
              <p className="text-[15px] text-emerald-50/90 leading-relaxed">
                {puzzle.success}
              </p>
            </div>
            <button
              onClick={() => onSolved(hintsRevealed)}
              className="btn-shine mt-5 w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 px-8 py-4 text-lg font-bold text-ocean-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
            >
              {isLast ? "Escapar de la isla 🏆" : "Continuar →"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
