import { auth } from "@/auth";
import {
  getEmergencyContacts,
  getMainContact,
  addMainContact,
} from "./actions";
import { Heart } from "lucide-react";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

export default async function EmergencyContactsPage() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const contacts = await getEmergencyContacts();
  const mainContact = await getMainContact();

  type Contact = {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    relationship: string;
  };

  function makeContactCard(contact: Contact) {
    return (
      <div className="bg-surface rounded-3xl p-5 border border-border shadow-sm mb-5">
        <div className="flex gap-4 items-center">
          <div className="bg-accent/30 text-xl text-accent grid place-items-center h-12 w-12 font-extrabold rounded-full">
            {contact.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-bold text-xl">{contact.name}</div>
            <div className="text-sm text-foreground/70">
              {contact.relationship} · {contact.phone}
            </div>
            <form action={addMainContact.bind(null, contact.id)}>
              <button
                type="submit"
                className="cursor-pointer text-accent font-bold text-sm mt-2 bg-background py-2 px-4 rounded-full"
              >
                Make main contact
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-5 justify-end font-bold">
          <Link href={`/dashboard/emergency-contacts/${contact.id}/edit`}>
            Edit
          </Link>
          <DeleteButton id={contact.id} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-4xl font-display">Emergency contacts</h1>
      <p className="text-foreground/70 text-sm">Your people, close at hand.</p>
      <Link
        href="/dashboard/emergency-contacts/new"
        className="flex bg-foreground text-surface my-6 w-full p-5 justify-center font-bold rounded-3xl"
      >
        + Add Emergency Contact
      </Link>
      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        <div>
          {mainContact === null ? (
            <p>No main emergency contact selected.</p>
          ) : (
            <div className="bg-surface rounded-3xl p-5 border border-border shadow-sm">
              <div className="flex gap-3 items-center">
                <div className="grid place-items-center h-12 w-12 font-extrabold text-red-600 bg-red-200 rounded-full">
                  <Heart className="fill-red-600 h-5" />
                </div>
                <div className="uppercase font-bold tracking-widest text-xs text-foreground/70">
                  Main emergency contact
                </div>
              </div>
              <div>
                <div className="text-3xl font-display mt-3 mb-1">
                  {mainContact.name}
                </div>
                <div className="text-sm text-foreground/70 mb-1 pb-4 border-b border-border">
                  {mainContact.relationship}
                </div>
                <div className="uppercase text-foreground/70 pt-4 text-sm font-bold">
                  Phone
                </div>
                <div className="text-sm font-bold mb-2">
                  {mainContact.phone}
                </div>
                <div className="text-sm font-bold">
                  {mainContact.email ?? ""}
                </div>
              </div>
            </div>
          )}
          <div>
            <div className="text-2xl font-display mt-10 mb-5">
              Other contacts
            </div>
            <ul>
              {contacts
                .filter((contact) => contact.id !== mainContact?.id)
                .map((contact) => (
                  <li key={contact.id}>{makeContactCard(contact)}</li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
