import Image from "next/image";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <h1 className="moon-title font-display text-6xl md:text-7xl">
          Thiziri
        </h1>

        <p className="mt-2 mb-12 text-sm uppercase tracking-widest text-lagoon">
          moonlight · ⵜⵉⵣⵉⵔⵉ
        </p>
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="relative hidden md:block">
        <Image
          src="/hero6.png"
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
    </main>
  );
}
