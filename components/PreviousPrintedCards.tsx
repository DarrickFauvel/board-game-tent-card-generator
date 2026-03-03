"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GameData } from "@/types/game";

export default function PreviousPrintedCards() {
  const router = useRouter();
  const [cards, setCards] = useState<GameData[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tentCards");
      if (saved) setCards(JSON.parse(saved) as GameData[]);
    } catch {}
  }, []);

  function handleEdit(card: GameData) {
    localStorage.setItem("tentCardAction", JSON.stringify({ mode: "edit", card }));
    router.push("/create");
  }

  function handleReprint(card: GameData) {
    localStorage.setItem("tentCardAction", JSON.stringify({ mode: "reprint", card }));
    router.push("/create");
  }

  function handleDelete(originalIndex: number) {
    const updated = cards.filter((_, i) => i !== originalIndex);
    localStorage.setItem("tentCards", JSON.stringify(updated));
    setCards(updated);
  }

  if (cards.length === 0) {
    return (
      <div className="p-6 text-center text-base-content/60">
        No previously printed cards found.
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      {[...cards].reverse().map((card, reversedIdx) => {
        const originalIndex = cards.length - 1 - reversedIdx;
        return (
          <div key={originalIndex} className="card bg-base-200 shadow-sm w-full max-w-lg mx-auto">
            <div className="card-body">
              <h3 className="card-title">{card.name}</h3>
              {card.gameOwner && (
                <p className="text-sm text-base-content/60">
                  Brought by <span className="font-medium">{card.gameOwner}</span>
                </p>
              )}
              {card.summary && (
                <p className="text-sm text-base-content/80">{card.summary}</p>
              )}
              <div className="card-actions justify-end pt-2">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => handleReprint(card)}
                >
                  🖨 Reprint
                </button>
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => handleEdit(card)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => handleDelete(originalIndex)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
