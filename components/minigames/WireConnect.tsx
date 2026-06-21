"use client";

import { useMemo, useState } from "react";
import type { WiresConfig } from "@/lib/types";

/** Baraja un array de forma estable durante el ciclo de vida del componente */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function WireConnect({
  config,
  onSolve,
}: {
  config: WiresConfig;
  onSolve: () => void;
}) {
  const lefts = config.pairs;
  // Columna derecha desordenada, con índice al par correcto
  const rights = useMemo(
    () => shuffle(lefts.map((p, i) => ({ label: p.right, correct: i }))),
    [lefts]
  );

  const [selected, setSelected] = useState<number | null>(null);
  // mapping[leftIndex] = índice (posición visual) en la columna derecha
  const [mapping, setMapping] = useState<Record<number, number>>({});
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  function clickLeft(i: number) {
    if (done) return;
    setSelected(i);
  }

  function clickRight(rPos: number) {
    if (done || selected === null) return;
    setMapping((prev) => {
      const next: Record<number, number> = {};
      // quita conexiones previas a ese mismo punto derecho o izquierdo
      for (const [l, r] of Object.entries(prev)) {
        if (Number(l) === selected) continue;
        if (r === rPos) continue;
        next[Number(l)] = r;
      }
      next[selected] = rPos;
      return next;
    });
    setSelected(null);
  }

  function check() {
    const allConnected = lefts.every((_, i) => mapping[i] !== undefined);
    if (!allConnected) {
      setWrong(true);
      setTimeout(() => setWrong(false), 450);
      return;
    }
    const correct = lefts.every((_, i) => rights[mapping[i]].correct === i);
    if (correct) {
      setDone(true);
      setTimeout(onSolve, 650);
    } else {
      setWrong(true);
      setTimeout(() => setWrong(false), 450);
    }
  }

  const rightConnectedBy = (rPos: number) =>
    Object.entries(mapping).find(([, r]) => r === rPos)?.[0];

  return (
    <div className="mt-6">
      <p className="mb-4 text-center text-sm text-ocean-50/80">{config.clue}</p>

      <div
        className={`grid grid-cols-2 gap-x-8 gap-y-3 rounded-2xl border border-white/15 bg-ocean-950/40 p-5 ${
          wrong ? "animate-shake" : ""
        }`}
      >
        {/* Columna izquierda */}
        <div className="flex flex-col gap-3">
          {lefts.map((p, i) => {
            const isSel = selected === i;
            const isConn = mapping[i] !== undefined;
            return (
              <button
                key={i}
                onClick={() => clickLeft(i)}
                disabled={done}
                style={{ borderColor: isConn || isSel ? p.color : undefined }}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition ${
                  isSel
                    ? "bg-white/25 scale-[1.02]"
                    : isConn
                    ? "bg-white/15"
                    : "border-white/20 bg-white/5 hover:bg-white/15"
                }`}
              >
                <span
                  className="h-3 w-3 flex-none rounded-full"
                  style={{ backgroundColor: p.color }}
                />
                {p.left}
              </button>
            );
          })}
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-3">
          {rights.map((r, rPos) => {
            const byLeft = rightConnectedBy(rPos);
            const color =
              byLeft !== undefined ? lefts[Number(byLeft)].color : undefined;
            return (
              <button
                key={rPos}
                onClick={() => clickRight(rPos)}
                disabled={done || selected === null}
                style={{ borderColor: color }}
                className={`flex items-center justify-end gap-2 rounded-xl border-2 px-3 py-2.5 text-right text-sm font-medium transition ${
                  color
                    ? "bg-white/15"
                    : "border-white/20 bg-white/5 hover:bg-white/15 disabled:hover:bg-white/5"
                }`}
              >
                {r.label}
                <span
                  className="h-3 w-3 flex-none rounded-full border border-white/40"
                  style={{ backgroundColor: color ?? "transparent" }}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-ocean-100/60">
        Pulsa un cable y luego su borne para conectarlos.
      </p>

      {!done && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={check}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3 font-bold text-ocean-950 transition-transform hover:scale-105 active:scale-95"
          >
            Dar corriente
          </button>
        </div>
      )}
      {wrong && (
        <p className="mt-3 text-center text-sm text-red-300">
          Chispas y nada más. Revisa las conexiones.
        </p>
      )}
      {done && (
        <p className="mt-3 text-center text-sm text-emerald-300">
          ⚡ ¡Circuito completo!
        </p>
      )}
    </div>
  );
}
