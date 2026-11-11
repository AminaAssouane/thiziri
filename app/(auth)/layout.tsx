import ShiningMoon from "@/components/ShiningMoon";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="grid relative min-h-screen overflow-hidden bg-linear-to-t md:bg-linear-to-r from-[#00181C] to-lagoon md:grid-cols-2 text-[#9ed7e8] ">
      <div className="flex flex-col items-center justify-center px-6  py-12">
        <h1 className="moon-title font-display text-6xl md:text-7xl">
          Thiziri
        </h1>

        <p className="mt-2 mb-12 text-sm uppercase tracking-widest ">
          moonlight · ⵜⵉⵣⵉⵔⵉ
        </p>
        <div className="w-full max-w-sm">{children}</div>
      </div>
      <div className="mx-auto my-auto hidden md:block">
        <ShiningMoon size={350} />
      </div>
      <footer className="flex text-gray-400 flex-col text-center md:flex-row md:items-center md:justify-between md:col-span-2 w-full px-20">
        <p>© Made by Amina Assouane</p>
        <div className="flex justify-center gap-4 mt-1">
          <a
            href="https://github.com/AminaAssouane"
            className="cursor-pointer hover:text-white hover:font-bold"
          >
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/amina-assouane/"
            className="cursor-pointer hover:text-white hover:font-bold"
          >
            Linkedin
          </a>
        </div>
      </footer>
    </main>
  );
}
