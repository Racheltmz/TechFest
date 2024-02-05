import matplotlib.pyplot as plt
import torch
from diffusers import StableDiffusionPipeline

def image_gen(prompt = "Taylor in"):

    pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", torch_dtype=torch.float16)

    images = pipe(prompt)
    generated_image = images.images[0]

    plt.imshow(generated_image)
    plt.axis('off')
    plt.show()