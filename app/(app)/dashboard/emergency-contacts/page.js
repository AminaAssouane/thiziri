import { auth } from "@/auth";
import { getEmergencyContacts } from "./actions";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

export default async function EmergencyContactsPage() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await getEmergencyContacts();
  return (
    <div>
      <h1>Emergency contacts : </h1>
      <Link href="/dashboard/emergency-contacts/new">
        + New Emergency Contact
      </Link>
      {contacts.length === 0 ? (
        <p>No contacts yet</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact.id}>
              <p>Name : {contact.name}</p>
              <p>Phone : {contact.phone}</p>
              <p>Email : {contact.email || ""}</p>
              <p>Relationship : {contact.relationship || ""}</p>
              <Link href={`/dashboard/emergency-contacts/${contact.id}/edit`}>
                Edit
              </Link>
              <DeleteButton id={contact.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
