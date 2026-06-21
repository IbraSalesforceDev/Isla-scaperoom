"use client";

import { useCallback, useEffect, useState } from "react";
import type { MazeConfig } from "@/lib/types";

type Walls = { n: boolean; e: boolean; s: boolean; w: boolean };
type Dir = "n" | "e" | "s" | "w";

const OPP: Record<Dir, Dir> = { n: "s", s: "n", e: "w", w: "e" };
const DELTA: Record<Dir, { dr: number; dc: number }> = {
  n: { dr: -1, dc: 0 },
  s: { dr: 1, dc: 0 },
  e: { dr: 0, dc: 1 },
  w: { dr: 0, dc: -1 },
};

/** Genera un laberinto perfecto con backtracking recursivo (siempre tiene solución) */
function generateMaze(rows: number, cols: number): Walls[] {
  const cells: Walls[] = Array.from({ length: rows * cols }, () => ({
    n: true,
    e: true,
    s: true,
    w: true,
  }));
  const visited = new Array(rows * cols).fill(false);
  const idx = (r: number, c: number) => r * cols + c;
  const stack: [number, number][] = [[0, 0]];
  visited[0] = true;

  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const opts: Dir[] = [];
    (Object.keys(DELTA) as Dir[]).forEach((d) => {
      const nr = r + DELTA[d].dr;
      const nc = c + DELTA[d].dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[idx(nr, nc)]) {
        opts.push(d);
      }
    });
    if (!opts.length) {
      stack.pop();
      continue;
    }
    const d = opts[Math.floor(Math.random() * opts.length)];
    const nr = r + DELTA[d].dr;
    const nc = c + DELTA[d].dc;
    cells[idx(r, c)][d] = false;
    cells[idx(nr, nc)][OPP[d]] = false;
    visited[idx(nr, nc)] = true;
    stack.push([nr, nc]);
  }
  return cells;
}

export default function Maze({
  config,
  onSolve,
}: {
  config: MazeConfig;
  onSolve: () => void;
}) {
  const { rows, cols } = config;
  const [maze] = useState<Walls[]>(() => generateMaze(rows, cols));
  const [pos, setPos] = useState({ r: 0, c: 0 });
  const [done, setDone] = useState(false);
  const [steps, setSteps] = useState(0);

  const move = useCallback(
    (d: Dir) => {
      if (done) return;
      setPos((p) => {
        const cell = maze[p.r * cols + p.c];
        if (cell[d]) return p; // hay pared
        const nr = p.r + DELTA[d].dr;
        const nc = p.c + DELTA[d].dc;
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) return p;
        setSteps((s) => s + 1);
        if (nr === rows - 1 && nc === cols - 1) {
          setDone(true);
          setTimeout(onSolve, 650);
        }
        return { r: nr, c: nc };
      });
    },
    [maze, cols, rows, done, onSolve]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const map: Record<string, Dir> = {
        ArrowUp: "n",
        ArrowDown: "s",
        ArrowLeft: "w",
        ArrowRight: "e",
        w: "n",
        s: "s",
        a: "w",
        d: "e",
      };
      const dir = map[e.key];
      if (dir) {
        e.preventDefault();
        move(dir);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [move]);

  const cellPx = cols > 9 ? 26 : 30;

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-1 text-center text-sm text-ocean-50/80">{config.clue}</p>
      <p className="mb-4 text-center text-xs uppercase tracking-wider text-amber-300">
        Pasos: {steps}
      </p>

      <div
        className="rounded-2xl border border-white/15 bg-ocean-950/50 p-3"
        style={{ overflow: "hidden" }}
      >
        <div
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${cellPx}px)`,
            gridTemplateRows: `repeat(${rows}, ${cellPx}px)`,
          }}
        >
          {maze.map((cell, i) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            const isPlayer = pos.r === r && pos.c === c;
            const isGoal = r === rows - 1 && c === cols - 1;
            const wallC = "rgba(255,255,255,0.85)";
            return (
              <div
                key={i}
                style={{
                  width: cellPx,
                  height: cellPx,
                  borderTop: `2px solid ${cell.n ? wallC : "transparent"}`,
                  borderRight: `2px solid ${cell.e ? wallC : "transparent"}`,
                  borderBottom: `2px solid ${cell.s ? wallC : "transparent"}`,
                  borderLeft: `2px solid ${cell.w ? wallC : "transparent"}`,
                  backgroundColor: isGoal
                    ? "rgba(52,211,153,0.25)"
                    : "transparent",
                }}
                className="flex items-center justify-center"
              >
                {isGoal && !isPlayer && <span className="text-sm">🏁</span>}
                {isPlayer && (
                  <span
                    className={`block h-3 w-3 rounded-full ${
                      done ? "bg-emerald-400" : "bg-amber-400"
                    } shadow-[0_0_10px_rgba(251,191,36,0.9)] transition-colors`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Controles táctiles */}
      <div className="mt-4 grid grid-cols-3 gap-2" style={{ width: 168 }}>
        <span />
        <DPadButton label="▲" onClick={() => move("n")} />
        <span />
        <DPadButton label="◀" onClick={() => move("w")} />
        <DPadButton label="▼" onClick={() => move("s")} />
        <DPadButton label="▶" onClick={() => move("e")} />
      </div>

      <p className="mt-3 text-center text-xs text-ocean-100/60">
        Usa las flechas del teclado (o WASD) o los botones. Llega a la 🏁.
      </p>
    </div>
  );
}

function DPadButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg transition hover:bg-white/25 active:scale-90"
    >
      {label}
    </button>
  );
}
