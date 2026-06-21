"use client";

import type { Difficulty } from "@/lib/types";
import { DIFFICULTIES } from "@/lib/difficulties";
import { formatTime } from "@/lib/game";

export default function DifficultyScreen({
  onSelect,
  onBack,
}: {
  onSelect: (d: Difficulty) => void;
  onBack: () => void;
}) {
  return (
    <section className="animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl sm:text-4xl font-bold drop-shadow">
          Elige tu destino
        </h2>
        <p className="mt-2 text-ocean-100/80 text-sm sm:text-base">
          ¿Hasta dónde estás dispuesto a complicarte la supervivencia?
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {DIFFICULTIES.map((d, i) => (
          <button
            key={d.id}
            onClick={() => onSelect(d)}
            style={{ animationDelay: `${i * 90}ms` }}
            className="glass animate-pop-in group rounded-3xl p-6 text-left transition-all hover:scale-[1.03] hover:bg-white/20 active:scale-95"
          >
            <div
              className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${d.accent} text-3xl shadow-lg`}
            >
              {d.emoji}
            </div>
            <h3 className="text-xl font-bold">{d.name}</h3>
            <p className="mt-1 mb-4 text-sm text-ocean-50/80 leading-snug min-h-[3rem]">
              {d.tagline}
            </p>
            <ul className="space-y-1.5 text-sm text-ocean-50/90">
              <li className="flex items-center gap-2">
                <span>🧩</span> {d.puzzleCount} enigmas
              </li>
              <li className="flex items-center gap-2">
                <span>⏱️</span> {formatTime(d.timeSeconds)} min
              </li>
              <li className="flex items-center gap-2">
                <span>💡</span>{" "}
                {d.hintsPerPuzzle === 1
                  ? "1 pista por enigma"
                  : `${d.hintsPerPuzzle} pistas por enigma`}
              </li>
              <li className="flex items-center gap-2">
                <span>{d.strict ? "🎯" : "✅"}</span>{" "}
                {d.strict ? "Respuestas exactas" : "Respuestas flexibles"}
              </li>
            </ul>
            <p className="mt-4 text-sm font-semibold text-amber-300 opacity-0 transition-opacity group-hover:opacity-100">
              Empezar →
            </p>
          </button>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="text-ocean-100/70 text-sm hover:text-white transition-colors"
        >
          ← Volver al inicio
        </button>
      </div>
    </section>
  );
}
