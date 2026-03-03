"use client";

import { usePathname } from "next/navigation";
import NavButton from "./NavButton";

export default function SubNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 border-b border-base-300 bg-base-200 px-4 py-2 print:hidden">
      <NavButton
        label="Create a New Card"
        href="/create"
        active={pathname === "/create"}
      />
      <NavButton
        label="Previous Printed Cards"
        href="/history"
        active={pathname === "/history"}
      />
    </nav>
  );
}
