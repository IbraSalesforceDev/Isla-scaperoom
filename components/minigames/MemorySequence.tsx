"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MemoryConfig } from "@/lib/types";

type Phase = "showing" | "input" | "fail" | "done";

export default function MemorySequence({
  config,
  onSolve,
}: {
  config: MemoryConfig;
  onSolve: () => void;
}) {
  const { pads, length } = config;

  // Secuencia aleatoria nueva en cada partida → mayor rejugabilidad
  const [sequence, setSequence] = useState<number[]>(() =>
    Array.from({ length }, () => Math.floor(Math.random() * pads.length))
  );
  const [phase, setPhase] = useState<Phase>("showing");
  const [lit, setLit] = useState<number | null>(null);
  const [step, setStep] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const playSequence = useCallback(() => {
    clearTimers();
    setPhase("showing");
    setStep(0);
    setLit(null);
    sequence.forEach((pad, i) => {
      timers.current.push(
        setTimeout(() => setLit(pad), 600 + i * 750)
      );
      timers.current.push(
        setTimeout(() => setLit(null), 600 + i * 750 + 450)
      );
    });
    timers.current.push(
      setTimeout(() => setPhase("input"), 600 + sequence.length * 750)
    );
  }, [sequence]);

  useEffect(() => {
    playSequence();
    return clearTimers;
  }, [playSequence]);

  function flash(pad: number) {
    setLit(pad);
    setTimeout(() => setLit((c) => (c === pad ? null : c)), 250);
  }

  function press(pad: number) {
    if (phase !== "input") return;
    flash(pad);
    if (sequence[step] === pad) {
      const nextStep = step + 1;
      if (nextStep >= sequence.length) {
        setPhase("done");
        setTimeout(onSolve, 650);
      } else {
        setStep(nextStep);
      }
    } else {
      setPhase("fail");
      setStep(0);
    }
  }

  function retry() {
    setSequence(
      Array.from({ length }, () => Math.floor(Math.random() * pads.length))
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-2 text-center text-sm text-ocean-50/80">{config.clue}</p>
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-amber-300">
        {phase === "showing" && "Observa la secuencia…"}
        {phase === "input" &&
          `Repítela · ${step}/${sequence.length}`}
        {phase === "fail" && "Secuencia incorrecta"}
        {phase === "done" && "¡Secuencia correcta!"}
      </p>

      <div
        className={`grid grid-cols-2 gap-3 rounded-2xl border border-white/15 bg-ocean-950/40 p-5 ${
          phase === "fail" ? "animate-shake" : ""
        }`}
      >
        {pads.map((pad, i) => {
          const isLit = lit === i;
          return (
            <button
              key={i}
              onClick={() => press(i)}
              disabled={phase !== "input"}
              style={{
                backgroundColor: isLit ? pad.color : `${pad.color}55`,
                boxShadow: isLit ? `0 0 28px ${pad.color}` : undefined,
              }}
              className={`flex h-20 w-20 items-center justify-center rounded-2xl text-3xl transition-all duration-150 sm:h-24 sm:w-24 ${
                isLit ? "scale-105" : ""
              } ${phase === "input" ? "hover:brightness-125 active:scale-95" : ""}`}
            >
              {pad.symbol}
            </button>
          );
        })}
      </div>

      {(phase === "fail" || phase === "input") && (
        <button
          onClick={phase === "fail" ? retry : playSequence}
          className="mt-5 rounded-xl bg-white/15 px-6 py-2.5 text-sm font-semibold transition hover:bg-white/25"
        >
          {phase === "fail" ? "Reintentar 🔁" : "Volver a ver la secuencia 👁️"}
        </button>
      )}
    </div>
  );
}
