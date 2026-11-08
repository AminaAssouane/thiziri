import { createEmergencyContact } from "../actions";
import { Heart } from "lucide-react";

export default function NewEmergencyContact() {
  return (
    <div>
      <h1 className="text-4xl font-display font-bold">Add new contact</h1>
      <div className="text-sm mb-5">
        Save someone you trust for when you need a hand.
      </div>
      <form
        action={createEmergencyContact}
        className="flex flex-col bg-surface rounded-3xl p-5"
      >
        <div className="flex gap-4 items-center">
          <div className="grid place-items-center h-12 w-12 font-extrabold text-red-600 bg-red-200 rounded-full">
            <Heart className="fill-red-600 h-5" />
          </div>
          <div>
            <p className="font-bold uppercase tracking-widest text-sm text-foreground/70">
              Emergency contact
            </p>
            <p className="text-sm text-foreground/70">Your trusted person</p>
          </div>
        </div>

        <label htmlFor="name" className="mt-8 font-bold text-sm">
          Full name
        </label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="e.g. Maya Nilson"
          required
          className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5"
        />

        <label htmlFor="phone" className="font-bold text-sm">
          Phone number{" "}
        </label>
        <input
          name="phone"
          id="phone"
          type="tel"
          placeholder="e.g. +1 (555) 000-0000"
          required
          className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5"
        />

        <label htmlFor="relationship" className="font-bold text-sm">
          Relationship
        </label>
        <input
          name="relationship"
          id="relationship"
          type="text"
          placeholder="e.g. Sister"
          required
          className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5"
        />

        <label htmlFor="email" className="font-bold text-sm">
          Email
        </label>
        <input
          name="email"
          id="email"
          type="email"
          placeholder="e.g. name@example.com"
          className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5"
        ></input>

        <button
          type="submit"
          className="bg-foreground text-surface font-bold p-4 w-full rounded-full cursor-pointer"
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
