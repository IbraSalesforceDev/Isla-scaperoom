"use client";

import { useEffect, useState } from "react";
import type { LockConfig } from "@/lib/types";

export default function LockDial({
  config,
  onSolve,
}: {
  config: LockConfig;
  onSolve: () => void;
}) {
  const [dials, setDials] = useState<number[]>(() =>
    Array.from({ length: config.digits }, () => 0)
  );
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  function change(i: number, delta: number) {
    if (done) return;
    setDials((prev) => {
      const next = [...prev];
      next[i] = (next[i] + delta + 10) % 10;
      return next;
    });
  }

  function tryOpen() {
    if (dials.join("") === config.code) {
      setDone(true);
      setTimeout(onSolve, 650);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 450);
    }
  }

  useEffect(() => {
    setWrong(false);
  }, [dials]);

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-4 text-center text-sm text-ocean-50/80">{config.clue}</p>

      <div
        className={`flex items-end gap-3 rounded-2xl border border-white/15 bg-ocean-950/40 px-5 py-5 ${
          wrong ? "animate-shake" : ""
        } ${done ? "border-emerald-300/60" : ""}`}
      >
        {dials.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <button
              aria-label="subir"
              onClick={() => change(i, 1)}
              className="text-2xl leading-none text-amber-300 transition hover:scale-125 active:scale-90"
            >
              ▲
            </button>
            <div
              className={`flex h-16 w-12 items-center justify-center rounded-xl font-mono text-3xl font-bold shadow-inner transition-colors ${
                done
                  ? "bg-emerald-400 text-ocean-950"
                  : "bg-white/90 text-ocean-950"
              }`}
            >
              {d}
            </div>
            <button
              aria-label="bajar"
              onClick={() => change(i, -1)}
              className="text-2xl leading-none text-amber-300 transition hover:scale-125 active:scale-90"
            >
              ▼
            </button>
          </div>
        ))}
        <div className="ml-1 self-center text-3xl">{done ? "🔓" : "🔒"}</div>
      </div>

      {!done && (
        <button
          onClick={tryOpen}
          className="mt-5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3 font-bold text-ocean-950 transition-transform hover:scale-105 active:scale-95"
        >
          Abrir candado
        </button>
      )}
      {wrong && (
        <p className="mt-3 text-sm text-red-300">No cede. Prueba otra combinación.</p>
      )}
    </div>
  );
}
