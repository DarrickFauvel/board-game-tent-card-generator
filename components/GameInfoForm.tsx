"use client";

import { useState } from "react";
import { GameData } from "@/types/game";

interface GameInfoFormProps {
  initialData: GameData;
  onSubmit: (data: GameData) => void;
}

export default function GameInfoForm({ initialData, onSubmit }: GameInfoFormProps) {
  const [fields, setFields] = useState<GameData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof GameData, string>>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof GameData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Partial<Record<keyof GameData, string>> = {};
    if (!fields.name.trim()) newErrors.name = "Game name is required.";
    if (!fields.bggUrl.trim()) newErrors.bggUrl = "BGG URL is required.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(fields);
  }

  return (
    <div className="flex flex-col items-center p-6 gap-6">
      <p className="text-base-content/60 text-center">
        Fill in your game&apos;s details to generate a printable tent card.
      </p>

      <form onSubmit={handleSubmit} className="card bg-base-200 w-full max-w-lg shadow-md overflow-hidden">
        <div className="bg-primary h-2 rounded-t-2xl" />
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Game Information</h2>
          <div className="divider mt-0 mb-0" />

          <div className="flex flex-col gap-1">
            <label className="label text-sm font-medium" htmlFor="name">
              Game Name *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="e.g. Wingspan"
              autoComplete="on"
              className={`input w-full ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && (
              <p className="text-error text-sm">{errors.name}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="label text-sm font-medium" htmlFor="summary">
              Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={fields.summary}
              onChange={handleChange}
              placeholder="Brief description of the game..."
              autoComplete="on"
              className="textarea w-full"
              rows={3}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label text-sm font-medium" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={fields.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              autoComplete="on"
              className="input w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="label text-sm font-medium" htmlFor="bggUrl">
              BGG URL *
            </label>
            <input
              id="bggUrl"
              type="url"
              name="bggUrl"
              value={fields.bggUrl}
              onChange={handleChange}
              placeholder="https://boardgamegeek.com/boardgame/..."
              autoComplete="on"
              className={`input w-full ${errors.bggUrl ? "input-error" : ""}`}
            />
            {errors.bggUrl && (
              <p className="text-error text-sm">{errors.bggUrl}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="label text-sm font-medium" htmlFor="gameOwner">
              Game Owner
            </label>
            <input
              id="gameOwner"
              type="text"
              name="gameOwner"
              value={fields.gameOwner}
              onChange={handleChange}
              placeholder="Who brought this game?"
              autoComplete="on"
              className="input w-full"
            />
          </div>

          <div className="card-actions justify-end pt-2">
            <button type="submit" className="btn btn-primary">
              Preview Tent Card
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
