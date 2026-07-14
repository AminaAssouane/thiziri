import { getAppointments } from "./actions";

export default async function Appointments() {
  const appointments = await getAppointments();

  return (
    <div>
      <h1>Appointments</h1>
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
          </li>
        ))}
      </ul>
    </div>
  );
}
