export const processImage = async (file: File, settings: any) => {
  const formData = new FormData();
  formData.append("file", file);
  Object.keys(settings).forEach((key) => {
    formData.append(key, settings[key]);
  });

  const response = await fetch("http://10.53.200.138:3000/process", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("İşlem başarısız!");

  return response.json();
};
