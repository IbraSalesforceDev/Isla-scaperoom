import type { Difficulty } from "./types";

export const DIFFICULTIES: Difficulty[] = [
  {
    id: "facil",
    name: "Explorador",
    tagline: "Un paseo por la arena. Tiempo de sobra y pistas a mano.",
    puzzleCount: 3,
    timeSeconds: 15 * 60,
    hintsPerPuzzle: 3,
    strict: false,
    accent: "from-emerald-400 to-teal-500",
    emoji: "🏖️",
  },
  {
    id: "medio",
    name: "Náufrago",
    tagline: "La marea aprieta. Menos pistas, más ingenio.",
    puzzleCount: 4,
    timeSeconds: 12 * 60,
    hintsPerPuzzle: 2,
    strict: false,
    accent: "from-amber-400 to-orange-500",
    emoji: "🌅",
  },
  {
    id: "dificil",
    name: "Superviviente",
    tagline: "Una sola pista, el reloj en contra y respuestas exactas.",
    puzzleCount: 5,
    timeSeconds: 10 * 60,
    hintsPerPuzzle: 1,
    strict: true,
    accent: "from-rose-500 to-red-600",
    emoji: "⛈️",
  },
];

export function getDifficulty(id: string): Difficulty {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[0];
}
