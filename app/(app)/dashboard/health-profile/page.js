import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import ProfileView from "./ProfileView";

export default async function HealthProfilePage() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");

  const profile = await prisma.healthProfile.findUnique({
    where: { userId: session.user.id },
    include: { allergies: true, chronicIllnesses: true },
  });

  return <ProfileView profile={profile} />;
}
