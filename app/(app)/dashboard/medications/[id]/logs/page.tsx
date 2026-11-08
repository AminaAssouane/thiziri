import { getMedLogs } from "./actions";
import { getMedication } from "../../actions";
import DeleteButton from "./DeleteButton";
import Link from "next/link";

type MedLogsPageProps = { params: Promise<{ id: string }> };

export default async function MedLogsPage({ params }: MedLogsPageProps) {
  const { id } = await params;
  const medLogs = await getMedLogs(id);
  const medInfo = await getMedication(id);

  if (medInfo === null) return <div>Non-existant medication.</div>;

  type log = {
    id: string;
    takenAt: Date | null;
    skipped: boolean;
    notes: string | null;
  };

  function logCard(log: log) {
    return (
      <div className="mt-5">
        <div className="font-bold uppercase text-foreground/70 text-sm">
          {log.takenAt?.toDateString()}
        </div>
        <div className="bg-surface p-5 mt-2 rounded-2xl shadow-sm">
          <div className="flex gap-3 items-center">
            {!log.skipped ? (
              <div className="flex items-center justify-center font-bold text-xl bg-background text-moss rounded-full h-10 w-10">
                ✓
              </div>
            ) : (
              <div className="flex items-center justify-center font-bold text-xl bg-red-200 text-red-700 rounded-full h-10 w-10">
                x
              </div>
            )}
            <div>
              <div className="font-bold">{`${String(log.takenAt?.getHours()).padStart(2, "0")}:${String(log.takenAt?.getMinutes()).padStart(2, "0")}`}</div>
              <div className="text-foreground/80 text-xs">
                {log.notes ?? ""}
              </div>
            </div>
            {!log.skipped ? (
              <div className="uppercase ml-auto font-bold text-xs bg-background text-moss rounded-full px-4 py-2">
                Taken
              </div>
            ) : (
              <div className="uppercase ml-auto font-bold text-xs bg-red-200 text-red-700 rounded-full px-4 py-2">
                Skipped
              </div>
            )}
          </div>
          <div className="flex justify-between text-xs font-bold mt-5 pt-5 text-foreground/60 border-t border-border">
            <Link
              href={`/dashboard/medications/${id}/logs/${log.id}/edit`}
              className=""
            >
              Edit
            </Link>
            <DeleteButton id={log.id} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display font-bold text-4xl">Medication logs</h1>
      <p className="text-sm text-foreground/70">A record of your daily care.</p>

      <div className="flex items-center gap-5 bg-foreground text-background rounded-2xl p-5 my-5">
        <div className="flex items-center justify-center font-bold text-2xl text-surface-muted bg-moss rounded-full p-5 h-12 w-12">
          ✚
        </div>
        <div>
          <p className="uppercase text-xs tracking-widest font-bold">
            Medication
          </p>
          <p className="text-2xl font-bold">{medInfo.name}</p>
          <p className="text-sm">
            {medInfo.dosage} · {medInfo.frequency}
          </p>
        </div>
      </div>

      <Link
        href={`/dashboard/medications/${id}/logs/new`}
        className="block bg-accent p-3 text-center text-surface font-bold rounded-full"
      >
        + Add a log
      </Link>

      <div className="mt-5 text-2xl font-bold font-display">Recent logs</div>
      <div className=" text-sm text-foreground/80">
        Individual check-ins, grouped by day.
      </div>

      {medLogs.length === 0 ? (
        <div> No medication logs yet.</div>
      ) : (
        <ul>
          {medLogs.map((medLog) => (
            <li key={medLog.id}>{logCard(medLog)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
