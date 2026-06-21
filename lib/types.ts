export type DifficultyId = "facil" | "medio" | "dificil";

export interface Difficulty {
  id: DifficultyId;
  name: string;
  tagline: string;
  /** Número de puzzles que se juegan en esta dificultad */
  puzzleCount: number;
  /** Tiempo total en segundos */
  timeSeconds: number;
  /** Pistas disponibles por puzzle */
  hintsPerPuzzle: number;
  /** Si true, la comprobación de respuestas es estricta (tildes/mayúsculas) */
  strict: boolean;
  accent: string;
  emoji: string;
}

export type PuzzleKind = "text" | "code" | "choice";

export interface Puzzle {
  id: string;
  /** Título corto de la escena */
  title: string;
  /** Narrativa de la escena */
  scene: string;
  /** El acertijo o pregunta concreta */
  riddle: string;
  kind: PuzzleKind;
  /** Para kind "choice": las opciones mostradas */
  options?: string[];
  /** Respuestas válidas (se normalizan al comparar) */
  answers: string[];
  /** Pistas progresivas */
  hints: string[];
  /** Texto que se muestra al acertar */
  success: string;
  /** Pista visual / icono de la escena */
  icon: string;
}

export interface Scenario {
  id: string;
  /** Cómo llegó el jugador a la isla */
  title: string;
  arrival: string;
  /** Resumen del objetivo de escape */
  goal: string;
  /** Frase final al escapar */
  ending: string;
  icon: string;
  /** Gradiente de fondo Tailwind para ambientar el escenario */
  gradient: string;
  puzzles: Puzzle[];
}

export type GamePhase =
  | "intro"
  | "difficulty"
  | "story"
  | "playing"
  | "won"
  | "lost";
