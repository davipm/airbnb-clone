"use client";

import Link from "next/link";

interface MenuItemProps {
  url: string;
  label: string;
}

export default function MenuItem({ url, label }: MenuItemProps) {
  return (
    <Link
      href={url}
      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
    >
      {label}
    </Link>
  );
}
