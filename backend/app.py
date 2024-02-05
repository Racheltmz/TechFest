from flask import Flask, jsonify, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

def generate(audio, filename, genre):
    # Style transfer
    # Image generator
    # store images and videos in frontend
    # output_vid_folder = f'../frontend/src/videos'
    # output_img_folder = f'../frontend/src/images'
    # os.makedirs(output_vid_folder, exist_ok=True)
    # os.makedirs(output_img_folder, exist_ok=True)
    
    # # Add videos and images to frontend folders
    # video_path = os.path.join(output_vid_folder, filename).replace('\\', '/')
    # with open(video_path, 'wb') as f:
    #     f.write(genAudio)

    # img_path = os.path.join(output_img_folder, filename).replace('\\', '/')
    # with open(img_path, 'wb') as f:
    #     f.write(genImage)
    return 'audio.wav', 'image.jpg'

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
