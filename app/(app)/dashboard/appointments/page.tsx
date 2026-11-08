import Link from "next/link";
import { getAppointments } from "./actions";
import { DeleteButton } from "./DeleteButton";

export default async function Appointments() {
  const appointments = await getAppointments();

  type appointment = {
    id: string;
    doctorName: string;
    specialty: string;
    date: Date;
    location: string;
    reason: string;
    notes: string | null;
    status: "UPCOMING" | "COMPLETED" | "CANCELLED";
  };

  function appCard(app: appointment) {
    return (
      <div className="bg-surface rounded-3xl border border-border shadow-sm mt-4 p-5">
        <div className="flex gap-4 items-center ">
          <div className="bg-background text-foreground rounded-2xl p-4 mt-2 text-center font-bold">
            <p className="text-xs">
              {app.date
                .toLocaleDateString("en-US", { month: "short" })
                .toUpperCase()}
            </p>
            <p>{app.date.getDate()}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-bold">{app.specialty}</p>
            <p className="text-foreground/90 text-xs mt-1">
              {app.date.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}{" "}
              · {app.doctorName}
            </p>
            <p className="text-xs mt-1 text-foreground/70">{app.location}</p>
          </div>
          {app.status !== "CANCELLED" ? (
            <div className="ml-auto text-xs font-bold bg-background text-moss py-2 px-4 rounded-2xl">
              {app.status}
            </div>
          ) : (
            <div className="ml-auto text-xs font-bold bg-red-200 text-red-700 py-2 px-4 rounded-2xl">
              {app.status}
            </div>
          )}
        </div>
        <div className="flex justify-between mt-4 text-sm font-bold">
          <Link
            href={`/dashboard/appointments/${app.id}/edit`}
            className="block"
          >
            Edit
          </Link>
          <DeleteButton id={app.id} />{" "}
        </div>
      </div>
    );
  }

  const nextAppointment = appointments.find(
    (appointment) =>
      appointment.status === "UPCOMING" && appointment.date >= new Date(),
  );
  const upcomingAppointments = appointments.filter(
    (app) => app.status === "UPCOMING" && app.date >= new Date(),
  );
  const historyAppointments = appointments.filter(
    (app) => app.status !== "UPCOMING",
  );

  return (
    <div>
      <div className="font-bold uppercase tracking-widest text-xs text-foreground/70 mb-1">
        Your care, in one place
      </div>
      <h1 className="font-display text-4xl font-bold mb-1">Appointments</h1>
      <div className="text-sm">Keep track of the next steps in your care.</div>
      <Link
        href="/dashboard/appointments/new"
        className="block bg-foreground text-surface rounded-full w-full p-4 my-4 font-bold text-center"
      >
        + Add Appointment
      </Link>

      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <div>
          <div className="rounded-3xl bg-accent text-surface p-5">
            <p className="uppercase tracking-widest text-xs font-bold">
              Keep in your orbit
            </p>
            <p className="font-bold text-2xl mt-1 mb-2">
              Your next appointment
            </p>
            {!nextAppointment ? (
              <div>No upcoming appointment</div>
            ) : (
              <div className="flex gap-4 items-center">
                <div>
                  <div className="bg-background text-foreground rounded-2xl p-4 mt-2 text-center font-bold">
                    <p className="text-xs">
                      {nextAppointment.date
                        .toLocaleDateString("en-US", { month: "short" })
                        .toUpperCase()}
                    </p>
                    <p className="text-2xl">{nextAppointment.date.getDate()}</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">{nextAppointment.specialty}</p>
                  <p className="text-background/90 text-xs mt-1">
                    {nextAppointment.date.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}{" "}
                    · {nextAppointment.doctorName}
                  </p>
                  <p className="text-xs mt-1 text-background/70">
                    {nextAppointment.location}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 font-bold font-display text-2xl">Upcoming</div>
          <ul>
            {upcomingAppointments.length === 0 ? (
              <li>No upcoming appointments</li>
            ) : (
              upcomingAppointments.map((appointment) => (
                <li key={appointment.id}>{appCard(appointment)}</li>
              ))
            )}
          </ul>
          <div className="mt-5 font-bold font-display text-2xl">History</div>
          <ul>
            {historyAppointments.length === 0 ? (
              <li>No past appointments.</li>
            ) : (
              historyAppointments.map((appointment) => (
                <li key={appointment.id}>{appCard(appointment)}</li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
