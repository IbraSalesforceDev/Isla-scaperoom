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

export type PuzzleKind = "text" | "code" | "choice" | "minigame";

/** Tipos de minijuego interactivo disponibles */
export type MinigameType =
  | "lock"
  | "wires"
  | "memory"
  | "tune"
  | "slide"
  | "maze";

export interface LockConfig {
  type: "lock";
  /** Número de ruedas/dígitos */
  digits: number;
  /** Combinación correcta, p. ej. "64" */
  code: string;
  /** Texto que aparece grabado como pista junto a la cerradura */
  clue: string;
}

export interface WiresConfig {
  type: "wires";
  /** Pares correctos: left[i] conecta con right[i] */
  pairs: { left: string; right: string; color: string }[];
  clue: string;
}

export interface MemoryConfig {
  type: "memory";
  /** Botones disponibles (símbolo + color) */
  pads: { symbol: string; color: string }[];
  /** Longitud de la secuencia a memorizar */
  length: number;
  clue: string;
}

export interface TuneConfig {
  type: "tune";
  min: number;
  max: number;
  /** Valor objetivo */
  target: number;
  /** Margen aceptado alrededor del objetivo */
  tolerance: number;
  /** Salto del deslizador */
  step: number;
  unit: string;
  clue: string;
}

export interface SlideConfig {
  type: "slide";
  /** Lado del tablero (3 = puzzle 3x3 / taquín de 8 piezas) */
  size: number;
  clue: string;
}

export interface MazeConfig {
  type: "maze";
  cols: number;
  rows: number;
  clue: string;
}

export type MinigameConfig =
  | LockConfig
  | WiresConfig
  | MemoryConfig
  | TuneConfig
  | SlideConfig
  | MazeConfig;

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
  /** Respuestas válidas (se normalizan al comparar). Vacío en minijuegos. */
  answers: string[];
  /** Configuración del minijuego cuando kind === "minigame" */
  minigame?: MinigameConfig;
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
