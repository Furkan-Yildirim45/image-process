from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST"])
def process_image():
    if "file" not in request.files:
        return jsonify({"error": "Dosya yüklenmedi"}), 400

    file = request.files["file"]
    img = Image.open(file.stream)

    # Ayarları al
    width = int(request.form.get("width", img.width))
    height = int(request.form.get("height", img.height))
    rotate = int(request.form.get("rotate", 0))
    flip = request.form.get("flip") == "true"
    crop = request.form.get("crop") == "true"

    # İşlemler
    img = img.resize((width, height))
    img = img.rotate(rotate, expand=True)

    if flip:
        img = img.transpose(Image.FLIP_LEFT_RIGHT)
    if crop:
        img = img.crop((10, 10, width - 10, height - 10))  # 10 px içeri kırp

    # Kaydet ve URL döndür
    output_path = "static/processed_image.jpg"
    img.save(output_path)

    return jsonify({"processedImageUrl": f"http://10.53.200.138:3000/{output_path}"})

if __name__ == "__main__":
    os.makedirs("static", exist_ok=True)
    app.run(host="0.0.0.0", port=3000, debug=True)
