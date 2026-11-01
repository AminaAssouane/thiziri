import Link from "next/link";
import { getAppointments } from "./actions";
import { DeleteButton } from "./DeleteButton";

export default async function Appointments() {
  const appointments = await getAppointments();

  return (
    <div>
      <h1>Appointments</h1>
      <Link href="/dashboard/appointments/new">+ New Appointment</Link>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <p>Doctor name : {appointment.doctorName}</p>
              <p>Specialty : {appointment.specialty}</p>
              <p>Date : {appointment.date.toLocaleDateString()}</p>
              <p>Location : {appointment.location}</p>
              <p>Reason : {appointment.reason}</p>
              <p>Notes : {appointment.notes || "No notes"}</p>
              <p>Status : {appointment.status}</p>

              <Link href={`/dashboard/appointments/${appointment.id}/edit`}>
                Edit
              </Link>
              <DeleteButton id={appointment.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
