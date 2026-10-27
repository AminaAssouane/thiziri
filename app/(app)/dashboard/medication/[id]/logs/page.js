import { getMedLogs } from "./actions";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

export default async function MedLogsPage({ params }) {
  const { id } = await params;
  const medLogs = await getMedLogs(id);
  return (
    <div>
      <h1>Medication logs : </h1>
      <Link href={`/dashboard/medication/${id}/logs/new`}>+ New Log</Link>
      {medLogs.length === 0 ? (
        <div> No medication logs yet.</div>
      ) : (
        <ul>
          {medLogs.map((medLog) => (
            <li key={medLog.id}>
              <p>
                Taken at :{" "}
                {medLog.takenAt
                  ? medLog.takenAt.toLocaleDateString()
                  : "Date and time not specified"}
              </p>
              <p>Skipped : {medLog.skipped ? "Yes" : "No"}</p>
              <p>Notes : {medLog.notes ?? "No notes"}</p>
              <DeleteButton id={medLog.id} />
              <Link href={`/dashboard/medication/${id}/logs/${medLog.id}/edit`}>
                Edit log
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
