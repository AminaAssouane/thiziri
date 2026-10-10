import { prisma } from "@/lib/prisma";
import UploadForm from "./UploadForm";
import { auth } from "@/auth";

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
      <h1>Documents</h1>
      <h2>Upload new document : </h2>
      <UploadForm />
      <h2>All documents : </h2>
      {documents.length === 0 ? (
        <div>No documents yet.</div>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <p>
                File URL :{" "}
                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                  View file
                </a>
              </p>
              <p>Category : {doc.category}</p>
              <p>Notes : {doc.notes || "No notes"}</p>
              <p>Upload date : {doc.createdAt.toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
