"use client";

import type { Difficulty, Scenario } from "@/lib/types";
import { formatTime } from "@/lib/game";

export default function StoryScreen({
  scenario,
  difficulty,
  puzzleCount,
  onBegin,
}: {
  scenario: Scenario;
  difficulty: Difficulty;
  puzzleCount: number;
  onBegin: () => void;
}) {
  return (
    <section className="animate-fade-up">
      <div
        className={`glass rounded-[2rem] overflow-hidden`}
      >
        <div
          className={`bg-gradient-to-br ${scenario.gradient} px-8 pt-10 pb-8 text-center`}
        >
          <div className="text-6xl sm:text-7xl mb-3 animate-floaty drop-shadow-xl">
            {scenario.icon}
          </div>
          <p className="uppercase tracking-[0.3em] text-xs text-white/70">
            Tu historia
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-1 drop-shadow">
            {scenario.title}
          </h2>
        </div>

        <div className="px-7 sm:px-9 py-7">
          <p className="text-ocean-50/95 leading-relaxed text-[15px] sm:text-base">
            {scenario.arrival}
          </p>

          <div className="mt-5 rounded-2xl bg-white/10 border border-white/10 p-4">
            <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-1">
              Tu objetivo
            </p>
            <p className="text-sm sm:text-[15px] text-ocean-50/90">
              {scenario.goal}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-1.5">
              {difficulty.emoji} Nivel {difficulty.name}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5">
              🧩 {puzzleCount} enigmas
            </span>
            <span className="rounded-full bg-white/10 px-4 py-1.5">
              ⏱️ {formatTime(difficulty.timeSeconds)} en el reloj
            </span>
          </div>

          <button
            onClick={onBegin}
            className="btn-shine mt-7 w-full rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-lg font-bold text-ocean-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
          >
            Empezar a escapar
          </button>
          <p className="mt-3 text-center text-xs text-ocean-100/60">
            El reloj empieza a correr en cuanto pulses.
          </p>
        </div>
      </div>
    </section>
  );
}
