"use client";

import { useMemo, useState } from "react";
import type { TuneConfig } from "@/lib/types";

export default function TuneSlider({
  config,
  onSolve,
}: {
  config: TuneConfig;
  onSolve: () => void;
}) {
  // Posición inicial aleatoria lejos del objetivo
  const [value, setValue] = useState<number>(() => {
    const span = config.max - config.min;
    let v = config.min + Math.random() * span;
    if (Math.abs(v - config.target) < span * 0.25) {
      v = config.min + ((v - config.min + span * 0.5) % span);
    }
    return Math.round(v / config.step) * config.step;
  });
  const [done, setDone] = useState(false);

  const distance = Math.abs(value - config.target);
  const locked = distance <= config.tolerance;
  // Intensidad de señal 0..100 según cercanía
  const signal = useMemo(() => {
    const span = config.max - config.min;
    const s = Math.max(0, 100 - (distance / (span * 0.5)) * 100);
    return Math.round(s);
  }, [distance, config.max, config.min]);

  function confirm() {
    if (!locked) return;
    setDone(true);
    setTimeout(onSolve, 650);
  }

  const bars = 12;
  const litBars = Math.round((signal / 100) * bars);

  return (
    <div className="mt-6 flex flex-col items-center">
      <p className="mb-4 text-center text-sm text-ocean-50/80">{config.clue}</p>

      <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-ocean-950/40 p-5">
        {/* Lectura */}
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-2xl font-bold text-amber-200">
            {value.toFixed(config.step < 1 ? 1 : 0)}
            <span className="ml-1 text-sm text-ocean-100/70">{config.unit}</span>
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              locked
                ? "bg-emerald-400 text-ocean-950 animate-pulse"
                : "bg-white/15 text-white"
            }`}
          >
            {locked ? "● SEÑAL FIJADA" : "buscando…"}
          </span>
        </div>

        {/* Medidor de señal */}
        <div className="mb-4 flex h-8 items-end gap-1">
          {Array.from({ length: bars }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-150"
              style={{
                height: `${20 + (i / bars) * 80}%`,
                backgroundColor:
                  i < litBars
                    ? locked
                      ? "#34d399"
                      : "#fbbf24"
                    : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>

        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          disabled={done}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-amber-400"
        />
        <div className="mt-1 flex justify-between text-xs text-ocean-100/50">
          <span>
            {config.min}
            {config.unit}
          </span>
          <span>
            {config.max}
            {config.unit}
          </span>
        </div>
      </div>

      {!done && (
        <button
          onClick={confirm}
          disabled={!locked}
          className={`mt-5 rounded-xl px-7 py-3 font-bold transition-transform active:scale-95 ${
            locked
              ? "bg-gradient-to-r from-amber-400 to-orange-500 text-ocean-950 hover:scale-105"
              : "cursor-not-allowed bg-white/10 text-white/40"
          }`}
        >
          Confirmar
        </button>
      )}
      {!locked && !done && (
        <p className="mt-3 text-center text-xs text-ocean-100/60">
          Acércate al valor correcto hasta que la señal se fije.
        </p>
      )}
    </div>
  );
}
