# TechFest
NTU TechFest 2024 Team 36

# Description

We built a music style transfer application that modifies the style of the audio file based on the genre you selected. In this application, we focused on two categories of generative AI: image generation and music & audio generation. The image generator (Stable Diffusion) was used to generate a new album cover for personalisation purposes while the music generation model (DeepAFx-ST) was used for the style transfer.

# Set up

1. Change directory into the backend folder and run the flask app.

    cd backend
    flask run

2. Change directory into the frontend folder and run the react app.

    cd frontend
    npm start

3. Upload an audio file onto the application and it will generate a new album cover and modified audio based on the genre you selected.

# Resources

- Genre style transfer: https://github.com/adobe-research/DeepAFx-ST
- Image generator: https://github.com/CompVis/stable-diffusion
- Audio genre files: https://www.kaggle.com/datasets/andradaolteanu/gtzan-dataset-music-genre-classification
