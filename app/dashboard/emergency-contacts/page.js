import { auth } from "@/auth";
import { getEmergencyContacts } from "./actions";

export default async function EmergencyContactsPage() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await getEmergencyContacts();
  return (
    <div>
      <h1>Emergency contacts : </h1>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
