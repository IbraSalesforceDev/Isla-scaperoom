"use client";

import { useMemo, useState } from "react";
import type { SlideConfig } from "@/lib/types";

/** Estado resuelto: 1..n*n-1 y null en la última posición */
function solvedBoard(n: number): (number | null)[] {
  const arr: (number | null)[] = [];
  for (let i = 1; i < n * n; i++) arr.push(i);
  arr.push(null);
  return arr;
}

function blankIndex(board: (number | null)[]) {
  return board.indexOf(null);
}

/** Vecinos (índices) de una casilla que pueden moverse al hueco */
function neighbors(idx: number, n: number): number[] {
  const r = Math.floor(idx / n);
  const c = idx % n;
  const res: number[] = [];
  if (r > 0) res.push(idx - n);
  if (r < n - 1) res.push(idx + n);
  if (c > 0) res.push(idx - 1);
  if (c < n - 1) res.push(idx + 1);
  return res;
}

/** Baraja haciendo movimientos válidos desde la solución (siempre resoluble) */
function scramble(n: number): (number | null)[] {
  let board = solvedBoard(n);
  let blank = blankIndex(board);
  let prev = -1;
  const moves = n * n * 20;
  for (let k = 0; k < moves; k++) {
    const opts = neighbors(blank, n).filter((i) => i !== prev);
    const pick = opts[Math.floor(Math.random() * opts.length)];
    [board[blank], board[pick]] = [board[pick], board[blank]];
    prev = blank;
    blank = pick;
  }
  // Evita empezar ya resuelto
  if (board.every((v, i) => v === solvedBoard(n)[i])) return scramble(n);
  return board;
}

export default function SlidePuzzle({
  config,
  onSolve,
}: {
  config: SlideConfig;
  onSolve: () => void;
}) {
  const n = config.size;
  const goal = useMemo(() => solvedBoard(n), [n]);
  const [board, setBoard] = useState<(number | null)[]>(() => scramble(n));
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  function move(idx: number) {
    if (done) return;
    const blank = blankIndex(board);
    if (!neighbors(blank, n).includes(idx)) return;
    const next = [...board];
    [next[blank], next[idx]] = [next[idx], next[blank]];
    setBoard(next);
    setMoves((m) => m + 1);
    if (next.every((v, i) => v === goal[i])) {
      setDone(true);
      setTimeout(onSolve, 650);
    }
  }

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-1 text-center text-sm text-ocean-50/80">{config.clue}</p>
      <p className="mb-4 text-center text-xs uppercase tracking-wider text-amber-300">
        Movimientos: {moves}
      </p>

      <div
        className="grid gap-2 rounded-2xl border border-white/15 bg-ocean-950/40 p-3"
        style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
      >
        {board.map((tile, idx) => {
          if (tile === null) {
            return (
              <div
                key={idx}
                className="h-16 w-16 rounded-xl bg-transparent sm:h-20 sm:w-20"
              />
            );
          }
          const blank = blankIndex(board);
          const movable = neighbors(blank, n).includes(idx) && !done;
          return (
            <button
              key={idx}
              onClick={() => move(idx)}
              className={`flex h-16 w-16 items-center justify-center rounded-xl font-display text-2xl font-bold shadow-md transition-all sm:h-20 sm:w-20 sm:text-3xl ${
                done
                  ? "bg-emerald-400 text-ocean-950"
                  : "bg-gradient-to-br from-sand-100 to-sand-300 text-ocean-950"
              } ${movable ? "hover:scale-105 active:scale-95 cursor-pointer" : "cursor-default opacity-95"}`}
            >
              {tile}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-center text-xs text-ocean-100/60">
        Toca una pieza junto al hueco para deslizarla. Ordena del 1 al{" "}
        {n * n - 1}.
      </p>
      {done && (
        <p className="mt-2 text-center text-sm text-emerald-300">
          🧩 ¡Recompuesto!
        </p>
      )}
    </div>
  );
}
