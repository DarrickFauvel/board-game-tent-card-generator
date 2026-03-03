import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-6">
      <div className="card bg-base-200 w-full max-w-lg shadow-md overflow-hidden">
        <div className="bg-primary h-2 rounded-t-2xl" />
        <div className="card-body gap-4 text-center">
          <h1 className="text-3xl font-bold">Welcome!</h1>
          <p className="text-base-content/70">
            Create printable tent cards for your board games. Display the game
            name, owner, a brief summary, and a QR code linking to
            BoardGameGeek — perfect for game days and conventions.
          </p>
          <div className="card-actions justify-center pt-2">
            <Link href="/create" className="btn btn-primary">
              Create a New Card
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
