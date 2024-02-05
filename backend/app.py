from flask import Flask, jsonify, request
from flask_cors import CORS
from generateAI import generate

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=['POST'])
def styleTransfer():
    try:
        # for youtube videos, convert first
        audio = request.files.get('audio')
        filename = request.form.get('filename')
        genre = request.form.get('genre')
        styledAudio, styledImage = generate(audio, filename, genre)
        
        res = {
            'styledAudio': styledAudio,
            'styledImage': styledImage,
        }
        return jsonify(res)
    except:
        response = jsonify({'message': 'Error'})
        response.status_code = 400
        return response
