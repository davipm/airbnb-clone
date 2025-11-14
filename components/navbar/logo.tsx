import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="w-max inline-block">
      <Image
        src="/images/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="hidden md:block cursor-pointer h-auto w-auto"
      />
    </Link>
  );
}
