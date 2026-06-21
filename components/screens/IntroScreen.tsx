"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { text: "Tipo apareces en una isla", time: "14:43" },
  { text: "No sabes cómo has llegado", time: "14:43" },
  { text: "Y la única forma de salir de allí es encontrar cómo lo hiciste", time: "14:44" },
  { text: "Y ahora a partirse la cabeza 🤣🤣🤣", time: "14:44" },
];

export default function IntroScreen({ onStart }: { onStart: () => void }) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (visible >= MESSAGES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 350 : 850);
    return () => clearTimeout(t);
  }, [visible]);

  const allShown = visible >= MESSAGES.length;

  return (
    <section className="flex flex-col items-center text-center">
      <div className="animate-floaty text-7xl sm:text-8xl mb-3 drop-shadow-2xl">
        🏝️
      </div>
      <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight drop-shadow-lg">
        La Isla
      </h1>
      <p className="mt-2 text-ocean-100/90 uppercase tracking-[0.35em] text-xs sm:text-sm">
        Escape Room
      </p>

      <div className="mt-8 w-full flex flex-col gap-3 items-start">
        {MESSAGES.slice(0, visible).map((m, i) => (
          <div key={i} className="chat-bubble animate-pop-in self-start text-left">
            <p className="text-[15px] sm:text-base leading-snug">
              {m.text}
              <span className="ml-2 align-bottom text-[11px] text-slate-400">
                {m.time}
              </span>
            </p>
          </div>
        ))}
        {!allShown && (
          <div className="chat-bubble animate-pop-in">
            <span className="inline-flex gap-1">
              <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
            </span>
          </div>
        )}
      </div>

      {allShown && (
        <div className="mt-10 animate-fade-up flex flex-col items-center gap-4">
          <p className="max-w-md text-ocean-50/85 text-sm sm:text-base leading-relaxed">
            Cada partida te deja en la isla por un motivo distinto. Resuelve los
            enigmas, descubre cómo llegaste… y esa será tu única vía de escape.
          </p>
          <button
            onClick={onStart}
            className="btn-shine rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-10 py-4 text-lg font-bold text-ocean-950 shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            Despertar en la isla →
          </button>
          <p className="text-xs text-ocean-100/60">
            5 historias · 3 niveles de dificultad
          </p>
        </div>
      )}
    </section>
  );
}
