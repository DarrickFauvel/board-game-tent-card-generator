"use client";

import { useState } from "react";
import GameInfoForm from "@/components/GameInfoForm";
import TentCardPreview from "@/components/TentCardPreview";
import { GameData } from "@/types/game";

const emptyFormData: GameData = { name: "", summary: "", imageUrl: "", bggUrl: "", gameOwner: "" };

export default function Home() {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [lastFormData, setLastFormData] = useState<GameData>(() => {
    try {
      const saved = localStorage.getItem("tentCard");
      if (saved) return JSON.parse(saved) as GameData;
    } catch {}
    return emptyFormData;
  });

  function handleSubmit(data: GameData) {
    setLastFormData(data);
    setGameData(data);
  }

  if (gameData) {
    return <TentCardPreview data={gameData} onBack={() => setGameData(null)} />;
  }

  return <GameInfoForm initialData={lastFormData} onSubmit={handleSubmit} />;
}
