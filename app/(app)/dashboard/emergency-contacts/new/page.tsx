import { createEmergencyContact } from "../actions";
import { Heart } from "lucide-react";

export default function NewEmergencyContact() {
  return (
    <div>
      <h1 className="text-4xl font-display font-bold text-center">
        Add new contact
      </h1>
      <div className="text-sm mb-5 text-center">
        Save someone you trust for when you need a hand.
      </div>
      <form
        action={createEmergencyContact}
        className="grid grid-cols-1 md:grid-cols-2 bg-surface rounded-3xl p-5 gap-x-10"
      >
        <div className="flex gap-4 items-center md:col-span-2">
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

        <div className="md:col-span-2">
          <label htmlFor="name" className="mt-8 font-bold text-sm block">
            Full name*
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="e.g. Maya Nilson"
            required
            className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5 w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="relationship" className="font-bold text-sm block">
            Relationship*
          </label>
          <input
            name="relationship"
            id="relationship"
            type="text"
            placeholder="e.g. Sister"
            required
            className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5 w-full"
          />
        </div>

        <div>
          <label htmlFor="phone" className="font-bold text-sm block">
            Phone number*{" "}
          </label>
          <input
            name="phone"
            id="phone"
            type="tel"
            placeholder="e.g. +1 (555) 000-0000"
            required
            className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5 w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="font-bold text-sm block">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="e.g. name@example.com"
            className="bg-card-bg rounded-2xl border border-border p-3 text-sm mt-1 mb-5 w-full"
          ></input>
        </div>

        <button
          type="submit"
          className="bg-foreground text-surface font-bold p-4 w-full rounded-full cursor-pointer md:col-span-2"
        >
          Add contact
        </button>
      </form>
    </div>
  );
}
