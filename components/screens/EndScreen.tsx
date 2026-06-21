"use client";

import type { Difficulty, Scenario } from "@/lib/types";
import { formatTime } from "@/lib/game";

export default function EndScreen({
  won,
  scenario,
  difficulty,
  elapsed,
  hintsTotal,
  solved,
  total,
  onPlayAgain,
  onHome,
}: {
  won: boolean;
  scenario: Scenario;
  difficulty: Difficulty;
  elapsed: number;
  hintsTotal: number;
  solved: number;
  total: number;
  onPlayAgain: () => void;
  onHome: () => void;
}) {
  // Puntuación simple: base por dificultad - tiempo - pistas
  const base = { facil: 1000, medio: 1500, dificil: 2200 }[difficulty.id];
  const score = won
    ? Math.max(100, base - elapsed * 2 - hintsTotal * 75)
    : solved * 150;

  return (
    <section className="animate-fade-up text-center">
      <div className="glass rounded-[2rem] overflow-hidden">
        <div
          className={`px-8 pt-10 pb-8 bg-gradient-to-br ${
            won ? "from-emerald-500 to-teal-600" : "from-slate-700 to-ocean-900"
          }`}
        >
          <div className="text-7xl mb-3 animate-floaty drop-shadow-xl">
            {won ? "🏆" : "🌊"}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold drop-shadow">
            {won ? "¡Has escapado!" : "La isla te retiene…"}
          </h2>
          <p className="mt-2 text-white/80 text-sm">
            {scenario.icon} {scenario.title} · Nivel {difficulty.name}
          </p>
        </div>

        <div className="px-7 sm:px-9 py-7">
          <p className="text-ocean-50/90 leading-relaxed text-[15px] sm:text-base italic">
            {won
              ? scenario.ending
              : "Se acabó el tiempo. La marea sube, la luz se apaga y la isla guarda su secreto un día más. Pero ahora conoces el terreno: la próxima vez será distinto."}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <Stat label="Puntuación" value={score.toLocaleString("es-ES")} highlight />
            <Stat
              label="Tiempo"
              value={won ? formatTime(elapsed) : "Agotado"}
            />
            <Stat label="Pistas usadas" value={String(hintsTotal)} />
          </div>

          {!won && (
            <p className="mt-4 text-sm text-ocean-100/70">
              Resolviste {solved} de {total} enigmas.
            </p>
          )}

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onPlayAgain}
              className="btn-shine flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-4 text-lg font-bold text-ocean-950 shadow-xl transition-transform hover:scale-[1.02] active:scale-95"
            >
              Jugar otra vez 🔁
            </button>
            <button
              onClick={onHome}
              className="rounded-2xl border border-white/20 bg-white/10 px-6 py-4 font-semibold transition hover:bg-white/20"
            >
              Inicio
            </button>
          </div>
          <p className="mt-4 text-xs text-ocean-100/55">
            Cada partida elige una historia distinta entre 5 posibles. ¿Las
            descubrirás todas?
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        highlight ? "bg-amber-400/15 border border-amber-300/30" : "bg-white/10"
      }`}
    >
      <p
        className={`font-bold text-xl ${
          highlight ? "text-amber-200" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-0.5 text-xs text-ocean-100/70">{label}</p>
    </div>
  );
}
