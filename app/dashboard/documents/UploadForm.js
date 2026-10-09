"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";

export default function UploadForm() {
  const [uploadedUrl, setUploadedUrl] = useState(null);

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

      {uploadedUrl && <p>File uploaded! Now fill in the details below.</p>}
    </div>
  );
}
