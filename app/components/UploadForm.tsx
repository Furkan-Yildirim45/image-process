"use client";

import { useState } from "react";

export default function UploadForm({ onImageUpload }: { onImageUpload: (file: File) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      onImageUpload(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Resim Yükle</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
      />
      {selectedFile && <p className="text-sm mt-2">Seçilen dosya: {selectedFile.name}</p>}
    </div>
  );
}
