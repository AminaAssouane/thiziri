import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function EditHealthStatusPage({ params }) {
  const { id } = await params;

  const session = await auth();

  const currentStatus = await prisma.healthStatus.findUnique({
    where: { id, userId: session.user.id },
  });
  return null;
}
