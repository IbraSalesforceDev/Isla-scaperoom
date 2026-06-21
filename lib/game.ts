import type { Difficulty, Puzzle, Scenario } from "./types";

/** Normaliza texto: minúsculas, sin tildes, sin signos, espacios colapsados. */
export function normalize(value: string, strict: boolean): string {
  let v = value.trim().toLowerCase();
  if (!strict) {
    v = v.normalize("NFD").replace(/[̀-ͯ]/g, ""); // quita tildes
  }
  v = v.replace(/[¿?¡!.,;:'"`´]/g, ""); // quita signos
  v = v.replace(/\s+/g, " ").trim();
  return v;
}

export function checkAnswer(
  puzzle: Puzzle,
  input: string,
  difficulty: Difficulty
): boolean {
  const guess = normalize(input, difficulty.strict);
  if (!guess) return false;
  return puzzle.answers.some((a) => normalize(a, difficulty.strict) === guess);
}

/**
 * Devuelve los puzzles que se juegan según la dificultad.
 * Coge los primeros (count-1) de la progresión + el desenlace (último).
 */
export function selectPuzzles(
  scenario: Scenario,
  difficulty: Difficulty
): Puzzle[] {
  const all = scenario.puzzles;
  const finale = all[all.length - 1];
  const buildup = all.slice(0, all.length - 1);
  const take = Math.max(0, difficulty.puzzleCount - 1);
  return [...buildup.slice(0, take), finale];
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
