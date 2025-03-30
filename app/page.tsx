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
      
      // İşlenmiş resmi blob olarak ayarla
      const processedBlob = await fetch(data.processedImageUrl).then((res) => res.blob());
      const processedUrl = URL.createObjectURL(processedBlob);
      setPreview(processedUrl);

      // İşlenmiş resmi yeni dosya olarak ayarla
      const processedFile = new File([processedBlob], "processedImage.jpg", { type: "image/jpeg" });
      setSelectedFile(processedFile);
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-1/3 p-8 bg-white shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Resim İşleme</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />

        <Controls onApply={handleApply} />
      </div>

      <div className="w-2/3 flex items-center justify-center p-8">
        {preview ? (
          <img
            src={preview}
            alt="Önizleme"
            className="max-w-full max-h-96 rounded-lg shadow-md"
          />
        ) : (
          <p className="text-gray-500">Önizleme burada görünecek</p>
        )}
      </div>
    </div>
  );
}
