from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

import subprocess

def run_command(input_file, output_file, checkpoint_file):
    command = [
        'python',
        'DeepAFx-ST/scripts/process.py',
        '-i', input_file,
        '-r', output_file,
        '-c', checkpoint_file
    ]

    try:
        subprocess.run(command, check=True)
        print("Command executed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
        print(f"Command failed with return code {e.returncode}.")

# Example usage:
input_file = 'examples/voice_raw.wav'
output_file = 'examples/voice_produced.wav'
checkpoint_file = 'checkpoints/style/jamendo/tcn1/lightning_logs/version_0/checkpoints/epoch=362-step=1210241-val-jamendo-tcn1.ckpt'

run_command(input_file, output_file, checkpoint_file)

@app.route("/")
def hello():
    return "Hello, World!"