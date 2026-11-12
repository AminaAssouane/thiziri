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

        <form
          action={updateHealthStatus}
          className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 mt-3"
        >
          <input type="hidden" name="id" value={currentStatus.id} />
          <div>
            <label htmlFor="weight" className="block font-bold text-sm my-2">
              Weight (kg){" "}
            </label>
            <input
              type="number"
              step="0.1"
              id="weight"
              name="weight"
              defaultValue={currentStatus.weight ?? ""}
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
              placeholder="e.g. 68.5 kg"
            />
          </div>
          <div>
            <label htmlFor="bloodP" className="block font-bold text-sm my-2">
              Blood Pressure{" "}
            </label>
            <input
              type="text"
              id="bloodP"
              name="bloodPressure"
              defaultValue={currentStatus.bloodPressure ?? ""}
              placeholder="e.g. 120/80"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="bloodS" className="block font-bold text-sm my-2">
              Blood Sugar
            </label>
            <input
              type="number"
              id="bloodS"
              step="0.1"
              name="bloodSugar"
              defaultValue={currentStatus.bloodSugar ?? ""}
              placeholder="Add today's reading"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
            />
          </div>

          <div>
            <label htmlFor="temp" className="block font-bold text-sm my-2">
              Temperature (°C){" "}
            </label>
            <input
              type="number"
              id="temp"
              step="0.1"
              name="temperature"
              defaultValue={currentStatus.temperature ?? ""}
              placeholder="e.g. 36.8 °C"
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block font-bold text-sm my-2">
              Notes{" "}
              <span className="text-foreground/60 font-medium">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Anything to remember about today?"
              defaultValue={currentStatus.notes ?? ""}
              className="bg-surface border-border border rounded-2xl p-3 mb-4 text-sm w-full"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-foreground text-background rounded-2xl font-bold p-4 hover:cursor-pointer w-full md:col-span-2"
          >
            Save the changes →
          </button>
        </form>
      </section>
    </div>
  );
}
