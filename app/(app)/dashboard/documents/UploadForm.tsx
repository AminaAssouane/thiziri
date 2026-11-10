"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";
import { createDocument } from "./actions";

export default function UploadForm() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    await createDocument(formData);
    setUploadedUrl(null);
  }

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-foreground/20 bg-card-bg p-5 text-center">
        <div className="mx-auto mb-3 grid size-11 place-items-center rounded-full bg-lightgreen text-forest">
          <span aria-hidden="true">↑</span>
        </div>

        <h2 className="font-serif text-xl text-foreground">Add a document</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Choose a prescription, test result, or visit summary.
        </p>

        <UploadButton
          className="documents-upload"
          endpoint="documentUploader"
          content={{ button: "Choose a file" }}
          appearance={{
            button:
              "mt-4 rounded-full bg-forest px-5 py-2 text-sm font-medium text-white",
            allowedContent: "mt-2 text-xs text-forest/70",
          }}
          onClientUploadComplete={(files) => {
            setUploadError(null);
            setUploadedUrl(files[0].url);
          }}
          onUploadError={(error) => {
            setUploadError(error.message);
          }}
        />

        {uploadError && (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {uploadError}
          </p>
        )}
      </section>

      {uploadedUrl && (
        <form action={handleSubmit} className="space-y-4">
          <input type="hidden" name="fileUrl" value={uploadedUrl} />

          <label className="block text-sm font-medium text-forest">
            Name
            <input
              name="name"
              placeholder="e.g. Blood test results"
              required
              className="mt-1 w-full rounded-xl border border-foreground/20 bg-white px-4 py-3"
            />
          </label>

          <label className="block text-sm font-medium text-forest">
            Category
            <input
              name="category"
              placeholder="Prescription, lab results…"
              className="mt-1 w-full rounded-xl border border-foreground/20 bg-white px-4 py-3"
            />
          </label>

          <label className="block text-sm font-medium text-forest">
            Notes <span className="font-normal text-forest/60">(optional)</span>
            <textarea
              name="notes"
              rows={3}
              placeholder="Add a note about this document"
              className="mt-1 w-full rounded-xl border border-foreground/20 bg-white px-4 py-3"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-full bg-forest px-5 py-3 font-medium text-white cursor-pointer"
          >
            Save document
          </button>
        </form>
      )}
    </div>
  );
}
