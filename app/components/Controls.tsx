"use client";

import { useState } from "react";

export default function Controls({ onApply }: { onApply: (settings: any) => void }) {
  const [settings, setSettings] = useState({
    width: 300,
    height: 300,
    rotate: 0,
    flip: false,
    crop: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target as HTMLInputElement;
    const { name, value, type } = target;
    const newValue = type === "checkbox" ? target.checked : Number(value);

    setSettings((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Boyut</label>
      <input type="number" name="width" value={settings.width} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" placeholder="Genişlik" />
      <input type="number" name="height" value={settings.height} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" placeholder="Yükseklik" />

      <label className="block text-sm font-medium text-gray-700 mt-2">Döndürme (Derece)</label>
      <input type="number" name="rotate" value={settings.rotate} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-lg" />

      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center">
          <input type="checkbox" name="flip" checked={settings.flip} onChange={handleChange} className="mr-2" />
          Çevir
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="crop" checked={settings.crop} onChange={handleChange} className="mr-2" />
          Kırp
        </label>
      </div>

      <button
        onClick={() => onApply(settings)}
        className="mt-4 bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition"
      >
        Uygula
      </button>
    </div>
  );
}
