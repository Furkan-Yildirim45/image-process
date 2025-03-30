"use client";

export default function ImagePreview({ imageUrl }: { imageUrl: string | null }) {
  return (
    <div className="flex items-center justify-center w-full h-64 border border-gray-300 rounded-md bg-gray-100">
      {imageUrl ? (
        <img src={imageUrl} alt="Önizleme" className="max-w-full max-h-full" />
      ) : (
        <p className="text-gray-500">Önizleme burada görünecek</p>
      )}
    </div>
  );
}
