import { prisma } from "@/lib/prisma";
import { editAppointment } from "../../actions";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

type EditAppointmentPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAppointmentPage({
  params,
}: EditAppointmentPageProps) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const appointment = await prisma.appointment.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!appointment) notFound();

  return (
    <form action={editAppointment}>
      <div className="uppercase tracking-wider font-bold text-xs">
        Your care, in one place
      </div>
      <h1 className="text-4xl font-bold font-display my-1">Edit appointment</h1>
      <div className="text-xs text-foreground/70">
        Update the details for your upcoming visit.
      </div>

      {/* THE hidden input */}
      <input type="hidden" name="id" value={id} />

      <div className="font-bold text-2xl my-3 font-display">Visit details</div>
      <label htmlFor="doctorName" className="font-bold text-sm">
        Doctor name{" "}
      </label>
      <input
        type="text"
        id="doctorName"
        name="doctorName"
        defaultValue={appointment.doctorName}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="specialty" className="font-bold text-sm">
        Specialty{" "}
      </label>
      <input
        type="text"
        name="specialty"
        id="specialty"
        defaultValue={appointment.specialty}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="date" className="font-bold text-sm">
        Date{" "}
      </label>
      <input
        type="date"
        id="date"
        name="date"
        defaultValue={appointment.date.toISOString().slice(0, 10)}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="time" className="font-bold text-sm">
        Time{" "}
      </label>
      <input
        type="time"
        id="time"
        name="time"
        defaultValue={appointment.date.toISOString().slice(11, 16)}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="location" className="font-bold text-sm">
        Location
      </label>
      <input
        type="text"
        id="location"
        name="location"
        defaultValue={appointment.location}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="reason" className="font-bold text-sm">
        Reason
      </label>
      <input
        type="text"
        id="reason"
        name="reason"
        defaultValue={appointment.reason}
        required
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      />
      <label htmlFor="notes" className="font-bold text-sm">
        Notes
      </label>
      <textarea
        id="notes"
        name="notes"
        defaultValue={appointment.notes ?? ""}
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      ></textarea>

      <label htmlFor="status" className="font-bold text-sm">
        Status :{" "}
      </label>
      <select
        id="status"
        name="status"
        defaultValue={appointment.status}
        className="bg-surface border border-border p-4 w-full rounded-2xl mt-2 mb-4"
      >
        <option value="UPCOMING">Upcoming</option>
        <option value="COMPLETED">Completed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>
      <button
        type="submit"
        className="text-center bg-accent text-surface font-bold w-full p-4 rounded-4xl mt-3 cursor-pointer"
      >
        Save changes
      </button>
    </form>
  );
}
