import Link from "next/link";
import ShiningMoon from "@/components/ShiningMoon";

const features = [
  { title: "Daily mood", text: "One gentle check-in a day, seen at a glance." },
  {
    title: "Medications",
    text: "Doses, schedules and a log of what you took.",
  },
  {
    title: "Appointments",
    text: "Upcoming, completed and cancelled, in one place.",
  },
  { title: "Documents", text: "Keep results and prescriptions together." },
];

export default function Landing() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-r from-[#00181C] to-lagoon">
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h1 className="moon-title font-display text-6xl md:text-7xl">
            Thiziri
          </h1>

          <p className="mt-2 ml-5 text-sm uppercase tracking-widest text-[#9ed7e8]">
            moonlight · ⵜⵉⵣⵉⵔⵉ
          </p>
          <p className="mt-6 text-lg text-[#9ed7e8]">
            A calm place to keep track of your health: mood, medications,
            appointments and documents.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-start justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-foreground px-8 py-3 text-center text-background hover:bg-lagoon"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-full border-2 border-foreground px-8 py-3 text-center text-background hover:bg-foreground"
            >
              Log in
            </Link>
            <Link
              href="/guest"
              className="rounded-full px-8 py-3 text-center border-none bg-linear-to-r from-[#c87035] via-[#d21fbe] to-[#1356ea] text-background hover:bg-none hover:bg-foreground"
            >
              Try as guest
            </Link>
          </div>
        </div>

        <div className="ml-auto hidden md:block">
          <ShiningMoon size={350} label="Full moon" />
        </div>
      </section>

      <section className="bg-linear-to-r from-[#00181C] to-lagoon px-6 py-16 text-background hidden md:block">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-moss/40 p-6"
            >
              <h3 className="font-display text-xl text-lightblue">{f.title}</h3>
              <p className="mt-2 text-background/80">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
