import { auth } from "@/auth";
import { editEmergencyContact } from "../../actions";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditEmergencyContact({ params }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const { id } = await params;

  const contact = await prisma.emergencyContact.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!contact) notFound();

  return (
    <form action={editEmergencyContact}>
      <h1>Edit emergency contact</h1>

      <input name="id" type="hidden" value={id} />

      <label>
        Name :{" "}
        <input name="name" type="text" defaultValue={contact.name} required />
      </label>
      <label>
        Phone :{" "}
        <input name="phone" type="tel" defaultValue={contact.phone} required />
      </label>
      <label>
        Email :{" "}
        <input name="email" type="email" defaultValue={contact.email || ""} />
      </label>
      <label>
        Relationship :{" "}
        <input
          name="relationship"
          type="text"
          defaultValue={contact.relationship || ""}
        />
      </label>
      <button type="submit">Edit</button>
    </form>
  );
}
