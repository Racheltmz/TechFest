import os
import subprocess
from diffusers import StableDiffusionPipeline

def genMusic(audio, filename, genre):
    video_folder = './DeepAFx-ST/examples'
    output_vid_folder = f'../frontend/src/videos'
    os.makedirs(video_folder, exist_ok=True)
    os.makedirs(output_vid_folder, exist_ok=True)
    
    # Input file
    input_file = f'examples/{filename}'
    # Output file
    output_file = f'genres/{genre}.wav'
    # Checkpoint file
    checkpoint_file = 'checkpoints/style/jamendo/tcn1/lightning_logs/version_0/checkpoints/epoch=362-step=1210241-val-jamendo-tcn1.ckpt'

    # Command
    command = [
        'python',
        'DeepAFx-ST/scripts/process.py',
        '-i', 'DeepAFx-ST/' + input_file,
        '-r', 'DeepAFx-ST/' + output_file,
        '-c', 'DeepAFx-ST/' + checkpoint_file
    ]

    try:
        subprocess.run(command, check=True, cwd=os.getcwd())
        print("Command executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print(f"Command failed with return code {e.returncode}.")

    # Move audio to frontend folders
    video_path = os.path.join(output_vid_folder, filename).replace('\\', '/')
    with open(video_path, 'wb') as f:
        f.write(audio.read())
    return filename

def genImage(genre):
    output_img_folder = f'../frontend/src/images'
    os.makedirs(output_img_folder, exist_ok=True)

    model_dir = './model'
    pipe = StableDiffusionPipeline.from_pretrained(model_dir)
    prompt = genre + " album cover"

    # Generate images based on the prompt
    images = pipe(prompt)

    # Access the generated image
    generated_image = images.images[0]

    filename = prompt.replace(' ', '_')
    output_image_path = os.path.join(output_img_folder, filename)

    # Save the generated image to the output folder
    generated_image.save(output_image_path)

    return filename


def generate(audio, filename, genre):
    # # Style transfer    
    # fileMusic = genMusic(audio, filename, genre)
    # # Image generator
    # fileImg = genImage(genre)

    return 'song_electric.wav', 'image.png'