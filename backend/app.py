from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from PIL import Image
import io
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

def resize_image(img, width, height):
    return img.resize((width, height))

def rotate_image(img, angle):
    return img.rotate(angle, expand=True)

def flip_image(img):
    return img.transpose(Image.FLIP_LEFT_RIGHT)

def crop_image(img, width, height):
    return img.crop((10, 10, width - 10, height - 10))

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
    img = resize_image(img, width, height)
    img = rotate_image(img, rotate)

    if flip:
        img = flip_image(img)
    if crop:
        img = crop_image(img, width, height)

    # Kaydet ve URL döndür
    output_path = "static/processed_image.jpg"
    img.save(output_path)

    return jsonify({"processedImageUrl": f"http://10.53.200.138:3000/{output_path}"})

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == "__main__":
    os.makedirs("static", exist_ok=True)
    app.run(host="0.0.0.0", port=3000, debug=True)
