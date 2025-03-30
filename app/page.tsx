"use client";

import { useState } from "react";
import { processImage } from "./api/imageProcessing";
import Controls from "./components/Controls";
import "./styles/page.css"

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

    setLoading(true);

    try {
      const data = await processImage(selectedFile, settings);
      const processedBlob = await fetch(data.processedImageUrl).then((res) => res.blob());
      const processedUrl = URL.createObjectURL(processedBlob);
      setPreview(processedUrl);

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
    <div className="container">
      <div className="sidebar">
        <h1 className="title">Resim İşleme</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="input-file"
        />

        <Controls onApply={handleApply} />
      </div>

      <div className="preview">
        {preview ? (
          <img
            src={preview}
            alt="Önizleme"
          />
        ) : (
          <p>Önizleme burada görünecek</p>
        )}
      </div>
    </div>
  );
}
