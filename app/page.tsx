"use client";

import { useState } from "react";
import Controls from "./components/Controls";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Resim seçildiğinde önizleme oluştur
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // API'ye resim ve ayarları gönder
  const handleApply = async (settings: any) => {
    if (!selectedFile) {
      alert("Lütfen bir resim seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    Object.keys(settings).forEach((key) => {
      formData.append(key, settings[key]);
    });

    setLoading(true);

    try {
      const response = await fetch("http://10.53.200.138:3000/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("İşlem başarısız!");

      const data = await response.json();
      setPreview(data.processedImageUrl);
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Resim İşleme</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full" />

      {preview && <img src={preview} alt="Önizleme" className="mb-4 max-w-full rounded-md" />}

      <Controls onApply={handleApply} />

      {loading && <p className="text-center text-gray-600">İşleniyor...</p>}
    </div>
  );
}
