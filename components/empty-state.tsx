import Link from "next/link";

import Heading from "@/components/heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}: EmptyStateProps) {
  return (
    <section className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />

      {showReset && (
        <Link
          href="/"
          className="mt-2 rounded-lg hover:opacity-80 transition duration-300 bg-transparent border-2 border-black p-3 text-center"
        >
          Remove all filters
        </Link>
      )}
    </section>
  );
}
