"use client";

import Link from "next/link";

interface NavButtonProps {
  label: string;
  href: string;
  active?: boolean;
}

export default function NavButton({ label, href, active = false }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`}
    >
      {label}
    </Link>
  );
}
