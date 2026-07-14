import { prisma } from "@/lib/prisma";
import { editAppointment } from "../../actions";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function EditAppointmentPage({ params }) {
  const { id } = await params;

  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const appointment = await prisma.appointment.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!appointment) notFound();

  return (
    <form action={editAppointment}>
      <h1>Edit appointment</h1>

      {/* THE hidden input */}
      <input type="hidden" name="id" value={id} />

      {/* Rest of inputs */}
      <label>
        Doctor name :{" "}
        <input
          type="text"
          name="doctorName"
          defaultValue={appointment.doctorName}
          required
        />
      </label>
      <label>
        Specialty :{" "}
        <input
          type="text"
          name="specialty"
          defaultValue={appointment.specialty}
          required
        />
      </label>
      <label>
        Date :{" "}
        <input
          type="date"
          name="date"
          defaultValue={appointment.date.toISOString().split("T")[0]}
          required
        />
      </label>
      <label>
        Location :{" "}
        <input
          type="text"
          name="location"
          defaultValue={appointment.location}
          required
        />
      </label>
      <label>
        Reason :{" "}
        <input
          type="text"
          name="reason"
          defaultValue={appointment.reason}
          required
        />
      </label>
      <label>
        Notes :{" "}
        <textarea name="notes" defaultValue={appointment.notes}></textarea>
      </label>
      <label>
        Status :{" "}
        <select name="status" defaultValue={appointment.status}>
          <option value="UPCOMING">Upcoming</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </label>
      <button type="submit">Edit</button>
    </form>
  );
}
