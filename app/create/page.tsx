"use client";

import { useState, useEffect } from "react";
import GameInfoForm from "@/components/GameInfoForm";
import TentCardPreview from "@/components/TentCardPreview";
import { GameData } from "@/types/game";

const emptyFormData: GameData = { name: "", summary: "", imageUrl: "", bggUrl: "", gameOwner: "" };

export default function CreatePage() {
  const [gameData, setGameData] = useState<GameData | null>(null);

  // Lazy initializer handles "edit" synchronously so the form mounts with the right data.
  const [lastFormData, setLastFormData] = useState<GameData>(() => {
    try {
      const raw = localStorage.getItem("tentCardAction");
      if (raw) {
        const { mode, card } = JSON.parse(raw) as { mode: string; card: GameData };
        if (mode === "edit") {
          localStorage.removeItem("tentCardAction");
          return card;
        }
      }
      const saved = localStorage.getItem("tentCards");
      if (saved) {
        const cards = JSON.parse(saved) as GameData[];
        if (cards.length > 0) return cards[cards.length - 1];
      }
    } catch {}
    return emptyFormData;
  });

  // "reprint" is handled in an effect so setGameData can be called after mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tentCardAction");
      if (!raw) return;
      const { mode, card } = JSON.parse(raw) as { mode: string; card: GameData };
      if (mode === "reprint") {
        localStorage.removeItem("tentCardAction");
        setGameData(card);
      }
    } catch {}
  }, []);

  function handleSubmit(data: GameData) {
    setLastFormData(data);
    setGameData(data);
  }

  if (gameData) {
    return <TentCardPreview data={gameData} onBack={() => setGameData(null)} />;
  }

  return <GameInfoForm initialData={lastFormData} onSubmit={handleSubmit} />;
}
