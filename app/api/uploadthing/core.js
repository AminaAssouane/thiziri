import { createUploadthing } from "uploadthing/next";
import { auth } from "@/auth";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await auth();

      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }

      // whatever is returned here is available in onUploadComplete
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File url:", file.url);

      // return value is sent to the client's onClientUploadComplete
      return { uploadedBy: metadata.userId, url: file.url };
    }),
};
