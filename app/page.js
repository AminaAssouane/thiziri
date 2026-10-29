import Link from "next/link";
import Image from "next/image";

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
    <main>
      <section className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <h1 className="font-display text-6xl text-forest md:text-7xl">
            Thiziri
          </h1>
          <p className="mt-2 text-sm uppercase tracking-widest text-lagoon">
            moonlight · ⵜⵉⵣⵉⵔⵉ
          </p>
          <p className="mt-6 text-lg text-forest/80">
            A calm place to keep track of your health: mood, medications,
            appointments and documents.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:justify-start justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-forest px-8 py-3 text-center text-cream hover:bg-lagoon"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="rounded-full border-2 border-forest px-8 py-3 text-center hover:bg-forest hover:text-cream"
            >
              Log in
            </Link>
            <Link
              href="/guest"
              className="rounded-full px-8 py-3 text-center border-none bg-linear-to-r from-[#c87035] via-[#d21fbe] to-[#1356ea] text-cream hover:bg-none hover:bg-forest"
            >
              Try as guest
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:aspect-auto md:h-[36rem] hidden md:block">
          <Image
            src="/hero6.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-forest px-6 py-16 text-cream hidden md:block">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-moss/40 p-6"
            >
              <h3 className="font-display text-xl text-rose">{f.title}</h3>
              <p className="mt-2 text-cream/80">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
