import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { updateHealthStatus } from "../../actions";

type EditHealthStatusPageProps = { params: Promise<{ id: string }> };

export default async function EditHealthStatusPage({
  params,
}: EditHealthStatusPageProps) {
  const { id } = await params;

  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const currentStatus = await prisma.healthStatus.findUnique({
    where: { id, userId: session.user.id },
  });

  if (!currentStatus) notFound();

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-foreground/70 text-center">
        Your personal record
      </p>
      <h1 className="text-foreground text-4xl font-display font-bold  text-center">
        Edit check-in
      </h1>
      <p className="text-xs mb-3 text-foreground/70 text-center">
        {date.format(currentStatus.createdAt)}
      </p>
      <section className="bg-card-bg text-foreground rounded-3xl p-5">
        <h2 className="font-bold text-[1.2rem] mb-1 pb-3 border-b border-border">
          Your health check-in
        </h2>

        <form action={updateHealthStatus} className="flex flex-col mt-3">
          <input type="hidden" name="id" value={currentStatus.id} />

          <label htmlFor="weight" className="font-bold text-sm my-2">
            Weight (kg){" "}
          </label>
          <input
            type="number"
            step="0.1"
            id="weight"
            name="weight"
            defaultValue={currentStatus.weight ?? ""}
            className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm"
            placeholder="e.g. 68.5 kg"
          />

          <label htmlFor="bloodP" className="font-bold text-sm my-2">
            Blood Pressure{" "}
          </label>
          <input
            type="text"
            id="bloodP"
            name="bloodPressure"
            defaultValue={currentStatus.bloodPressure ?? ""}
            placeholder="e.g. 120/80"
            className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm"
          />

          <label htmlFor="bloodS" className="font-bold text-sm my-2">
            Blood Sugar
          </label>
          <input
            type="number"
            id="bloodS"
            step="0.1"
            name="bloodSugar"
            defaultValue={currentStatus.bloodSugar ?? ""}
            placeholder="Add today's reading"
            className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm"
          />

          <label htmlFor="temp" className="font-bold text-sm my-2">
            Temperature (°C){" "}
          </label>
          <input
            type="number"
            id="temp"
            step="0.1"
            name="temperature"
            defaultValue={currentStatus.temperature ?? ""}
            placeholder="e.g. 36.8 °C"
            className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm"
          />

          <label htmlFor="notes" className="font-bold text-sm my-2">
            Notes{" "}
            <span className="text-foreground/60 font-medium">(optional)</span>
          </label>
          <textarea
            id="notes"
            name="notes"
            placeholder="Anything to remember about today?"
            defaultValue={currentStatus.notes ?? ""}
            className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm"
          ></textarea>

          <button
            type="submit"
            className="bg-foreground text-background rounded-2xl font-bold p-4 hover:cursor-pointer"
          >
            Save the changes →
          </button>
        </form>
      </section>
    </div>
  );
}
