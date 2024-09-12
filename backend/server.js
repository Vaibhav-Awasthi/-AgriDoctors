const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const axios = require('axios');
const Crop = require('./Models/Crop'); // Update with the correct path to your User model
const upload = multer({ dest: 'uploads/' }); // Temporary file storage
app.use(cors());
// Configure AWS S3
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Upload file to S3
const uploadFileToS3 = (file) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: fileStream,
        Key: file.filename,
        ContentType: file.mimetype || 'application/octet-stream' // Default if mime type is missing
    };

    return s3.upload(params).promise()
        .finally(() => fs.unlinkSync(file.path)); // Delete the temporary file
};

// Logging middleware
const logReq = (req, res, next) => {
    console.log('[', new Date().toLocaleString(), '] req node to:', '[', req.originalUrl, ']');
    next();
};

app.use(logReq);

// API route to upload image and save user
app.post('/CropDisease', upload.single('Pic'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
         console.log(file)
        // console.log(typeof file)
        
        // Upload file to S3
        const result = await uploadFileToS3(file);
        const response = await axios.post('http://localhost:8000/predict/', {
            url: result.Location
        });
        console.log(response.data)
        // Update crop record with the image URL

        const crop = new Crop();
        crop.DiseasePic = result.Location; // S3 URL
        crop.DiseaseDiagnosis = response.data.class;
        crop.Confidence=response.data.confidence
        crop.DiseaseDiagnosis=response.data.diagnosis 
        
        const data = await crop.save();
        
        res.status(200).json({ Disease:response.data.class , Score: response.data.confidence , Diagnosis:response.data.diagnosis });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server is live !!'));
