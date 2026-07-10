import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import MoodView from "./MoodView";

export default async function MoodPage() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const date = new Date();
  date.setHours(0, 0, 0, 0);

  const mood = await prisma.moodEntry.findUnique({
    where: { userId_date: { userId, date } },
  });

  return (
    <div>
      <h1>Mood</h1>
      <MoodView mood={mood} />
    </div>
  );
}
