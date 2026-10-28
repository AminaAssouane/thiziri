import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <main className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
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
