import { prisma } from "@/lib/prisma";
import UploadForm from "./UploadForm";
import { auth } from "@/auth";
import DeleteButton from "./DeleteButton";
import { ExternalLink, FileText } from "lucide-react";

export default async function Documents() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const userId = session.user.id;
  const documents = await prisma.document.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-4xl font-display">Documents</h1>
      <p className="text-xs text-foreground/70 mb-5">
        Keep your important health records close at hand.
      </p>

      <UploadForm />

      <h2 className="text-xl font-display mt-5">Your documents </h2>
      {documents.length === 0 ? (
        <div>No documents yet.</div>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="mt-3 grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 rounded-3xl border border-border bg-surface p-5 shadow-sm md:grid-cols-[2.75rem_minmax(0,1fr)_auto] md:items-center"
            >
              <div className="grid size-11 place-items-center rounded-2xl bg-lightgreen text-lagoon">
                <FileText size={21} aria-hidden="true" />
              </div>

              <div className="min-w-0">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-2 text-lg font-bold text-foreground hover:text-lagoon"
                >
                  <span className="truncate">{doc.name}</span>
                  <ExternalLink
                    size={15}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <p className="mt-1 text-sm text-foreground/70">
                  {doc.category || "Uncategorized"}
                  <span aria-hidden="true"> · </span>
                  Added {doc.createdAt.toLocaleDateString()}
                </p>

                {doc.notes && (
                  <p className="mt-2 text-sm text-foreground/80">{doc.notes}</p>
                )}
              </div>

              <div className="col-span-2 justify-self-end md:col-span-1">
                <DeleteButton id={doc.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
