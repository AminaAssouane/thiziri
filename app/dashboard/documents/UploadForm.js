"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { createDocument } from "./actions";

export default function UploadForm() {
  const [uploadedUrl, setUploadedUrl] = useState(null);

  async function handleSubmit(formData) {
    await createDocument(formData);
    setUploadedUrl(null);
  }

  return (
    <div>
      {!uploadedUrl && (
        <UploadButton
          endpoint="documentUploader"
          onClientUploadComplete={(res) => {
            setUploadedUrl(res[0].ufsUrl);
          }}
          onUploadError={(error) => {
            console.error("Upload error:", error);
          }}
        />
      )}

      {uploadedUrl && (
        <form action={handleSubmit}>
          <input type="hidden" name="fileUrl" value={uploadedUrl} required />
          <label>
            Category: <input type="text" name="category" required />{" "}
          </label>

          <label>
            Notes: <textarea name="notes" />
          </label>

          <button>Save Document</button>
        </form>
      )}
    </div>
  );
}
