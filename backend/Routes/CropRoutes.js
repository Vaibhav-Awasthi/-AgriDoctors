const express=require('express')
const router=express.Router()
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');
const Crop = require('./../Models/Crop'); // Update with the correct path to your User model
const upload = multer({ dest: 'uploads/' }); // Temporary file storage

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


// API route to upload image and save user
router.post('/', upload.single('Pic'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        // Upload file to S3
        const result = await uploadFileToS3(file);
        
        // Update crop record with the image URL
        const crop = new Crop();
        crop.DiseasePic = result.Location; // S3 URL
        const response = await crop.save();
        
        res.status(200).json({ response: response, url: result.Location });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
});


module.exports=router
