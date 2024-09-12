from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import requests
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
from keras.models import model_from_json
import uvicorn

app = FastAPI()

# Load the pre-trained model from joblib
loaded_model = tf.keras.models.load_model('C:/Users/rajya/Documents/Agri/6.keras')





# Define class names as per your model
CLASS_NAMES = ["Early Blight(Alternaria solani)", "Late Blight(Phytophthora infestans)", "Healthy"]
Treatment=["Fungicide Application: Apply fungicides such as chlorothalonil or mancozeb at the first sign of disease. Repeat applications as per the product instructions.Remove Infected Leaves: Regularly inspect plants and remove any infected leaves to reduce the spread of the disease.", "Remove Infected Plants: Remove and destroy infected plants and tubers immediately to prevent the spread.Fungicide Application: Use fungicides like metalaxyl, copper-based fungicides. .Mulching: Use straw or plastic mulch to prevent soil from splashing onto the leaves, which can spread spores. ", "Dont worry your plant is fine."]

class ImageRequest(BaseModel):
    url: str

@app.post("/predict/")
async def predict(request: ImageRequest):
    try:
        # Fetch the image from the provided URL
        response = requests.get(request.url)
        response.raise_for_status()
        
        # Load the image
        image = Image.open(BytesIO(response.content))
        image = image.convert('RGB')  # Ensure image is in RGB format
        
        # Preprocess the image
        image = image.resize((256, 256))  # Resize image to match model input dimensions
        
        image_array = np.expand_dims(image, axis=0)  # Add batch dimension

        # Predict
        predictions = loaded_model.predict(image_array)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        diagnosis=Treatment[np.argmax(predictions[0])]

        return {
            "class": predicted_class,
            "confidence": float(confidence),
            "diagnosis":diagnosis
        }

    except requests.HTTPError as e:
        raise HTTPException(status_code=400, detail=f"Error fetching image: {e}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
