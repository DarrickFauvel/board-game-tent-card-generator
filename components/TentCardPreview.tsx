"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { GameData } from "@/types/game";

interface TentCardPreviewProps {
  data: GameData;
  onBack: () => void;
}

export default function TentCardPreview({ data, onBack }: TentCardPreviewProps) {
  return (
    <div className="p-6 print:p-0">
      {/* Controls — hidden when printing */}
      <div className="mb-6 flex justify-between print:hidden">
        <button className="btn btn-outline" onClick={onBack}>
          ← Back
        </button>
        <button className="btn btn-primary" onClick={() => {
          localStorage.setItem("tentCard", JSON.stringify(data));
          window.print();
          onBack();
        }}>
          🖨 Print
        </button>
      </div>

      {/* Tent Card */}
      <div className="card tent-card mx-auto w-full max-w-2xl border border-base-300 bg-base-100 text-base-content shadow-lg overflow-hidden print:shadow-none print:border-none print:max-w-none print:w-full print:h-[8.5in] print:rounded-none">

        {/* Back panel — printed upside-down, reads correctly when folded */}
        <div className="flex rotate-180 flex-col items-center justify-center gap-2 border-b-2 border-dashed border-base-300 bg-base-200 p-8 text-center print:h-[4.25in] print:shrink-0">
          <p className="text-sm uppercase tracking-widest text-base-content/60">
            Owner
          </p>
          <p className="text-xl font-semibold">{data.gameOwner || "—"}</p>
          <p className="mt-2 text-3xl font-bold">{data.name}</p>
        </div>

        {/* Front half — header + content fill the remaining 4.25in */}
        <div className="flex flex-col print:h-[4.25in]">
          {/* Front panel header bar */}
          <div className="bg-primary text-primary-content px-8 py-3 print:shrink-0">
            <h1 className="text-2xl font-bold">{data.name}</h1>
          </div>

          {/* Front panel */}
          <div className="flex flex-col gap-4 p-8 print:flex-1 print:overflow-hidden">
            <div className="flex gap-6">
              {/* Left: image + details */}
              <div className="flex flex-1 flex-col gap-3">
                {data.imageUrl && (
                  <div className="relative h-40 w-full overflow-hidden rounded">
                    <Image
                      src={data.imageUrl}
                      alt={data.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                {data.gameOwner && (
                  <p className="text-sm text-base-content/70">
                    Brought by <span className="font-medium">{data.gameOwner}</span>
                  </p>
                )}
                {data.summary && (
                  <p className="text-sm leading-relaxed text-base-content/80">
                    {data.summary}
                  </p>
                )}
              </div>

              {/* Right: QR code */}
              <div className="flex flex-col items-center gap-2 shrink-0">
                <QRCode value={data.bggUrl} size={120} />
                <p className="text-center text-xs text-base-content/60">
                  View on BGG
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
