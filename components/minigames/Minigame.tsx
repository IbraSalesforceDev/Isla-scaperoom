"use client";

import type { MinigameConfig } from "@/lib/types";
import LockDial from "./LockDial";
import WireConnect from "./WireConnect";
import MemorySequence from "./MemorySequence";
import TuneSlider from "./TuneSlider";

export default function Minigame({
  config,
  onSolve,
}: {
  config: MinigameConfig;
  onSolve: () => void;
}) {
  switch (config.type) {
    case "lock":
      return <LockDial config={config} onSolve={onSolve} />;
    case "wires":
      return <WireConnect config={config} onSolve={onSolve} />;
    case "memory":
      return <MemorySequence config={config} onSolve={onSolve} />;
    case "tune":
      return <TuneSlider config={config} onSolve={onSolve} />;
    default:
      return null;
  }
}
