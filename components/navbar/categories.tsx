"use client";

import { usePathname, useSearchParams } from "next/navigation";

import CategoryBox from "@/components/category-box";
import Container from "@/components/container";
import { categories } from "@/constants";

export default function Categories() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
}
