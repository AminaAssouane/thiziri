import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { MoodView } from "./MoodView";

type MoodPageProps = {
  searchParams: Promise<{ date?: string }>;
};

function parseDate(value?: string): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // Reject dates that JavaScript would otherwise roll into another month.
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(0, 0, 0, 0);
  return date;
}

function startOfWeek(date: Date): Date {
  const start = new Date(date);
  const daysSinceMonday = (start.getDay() + 6) % 7;

  start.setDate(start.getDate() - daysSinceMonday);
  start.setHours(0, 0, 0, 0);

  return start;
}

export default async function MoodPage({ searchParams }: MoodPageProps) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const { date: dateParam } = await searchParams;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selectedDate = parseDate(dateParam) ?? today;
  const weekStart = startOfWeek(selectedDate);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const moods = await prisma.moodEntry.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: weekStart,
        lt: weekEnd,
      },
    },
    orderBy: { date: "asc" },
  });

  const mood =
    moods.find(
      (entry) =>
        entry.date.getFullYear() === selectedDate.getFullYear() &&
        entry.date.getMonth() === selectedDate.getMonth() &&
        entry.date.getDate() === selectedDate.getDate(),
    ) ?? null;

  return <MoodView mood={mood} moods={moods} selectedDate={selectedDate} />;
}
