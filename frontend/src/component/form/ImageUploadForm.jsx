import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { MdCancel } from 'react-icons/md';
import toast from "react-hot-toast";

const ImageUploadForm = ({ setLoading, setDiseaseResult, setError, SetDescription,setaccuracy }) => {
  const { t } = useTranslation();
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); // Initialize as null
  const [imageURL, setImageURL] = useState(null);
  const BASEURL = "http://localhost:3000/CropDisease";
  const handleFileChange = event => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (file && file.size > maxSize) {
      toast.error("Max File Size should be 2 MB. Please upload a smaller image.");
      setSelectedFile(null);
      setImageURL(null);
      return;
    }
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setImageURL(url);
    }
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    if (!selectedFile) {
      toast.error("Please select an image file.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("Pic", selectedFile);
    formData.append("description", description);

    try {
      const response = await axios.post(BASEURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle the response
      const data = response.data;
      console.log(data);
      setDiseaseResult(data.Disease);
      toast.success("Image uploaded successfully.");
      setImageURL(null);
      SetDescription(data.Diagnosis);
      const s=data.Score;
      const numberAsString = s.toString();
      setaccuracy(numberAsString);
      setSelectedFile(null);
      setError(null);
    } catch (error) {
      const errMsg = error.response?.data?.message || "Something went wrong.";
      setError(errMsg);
      toast.error(errMsg);
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row justify-center p-1 items-center min-h-[80vh]">
      <div className="flex flex-col items-center justify-center p-2 border rounded-lg shadow-lg border-slate-300 w-fit md:py-6 md:px-4">
        <h2 className="p-2 text-2xl font-bold text-center md:p-4">
          {t('Submit Your Crop Image')}
        </h2>
        <form
          onSubmit={handleOnSubmit}
          className="flex flex-col justify-center gap-4"
        >
          {imageURL && (
            <div className="relative border border-slate-200 w-52 h-52">
              <button
                type="button"
                className="absolute -top-2 -right-3 text-3xl rounded-full cursor-pointer bg-[var(--ternery-color)]"
                onClick={() => {
                  setImageURL(null);
                  setSelectedFile(null);
                }}
              >
                <MdCancel className="text-white" />
              </button>
              <img
                src={imageURL}
                alt="Preview"
                loading="lazy"
                className="object-contain w-full h-full mx-auto"
              />
            </div>
          )}
          <div className="flex flex-col">
            <label className="font-semibold">{t('Upload Image (one leaf at a time)')}</label>
            <input
              className="p-1 border rounded-md border-slate-400"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={handleFileChange}
              name="image"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">{t('Describe Symptoms')}</label>
            <textarea
              rows="5"
              className="p-1 border rounded-md border-slate-400"
              placeholder="Describe the symptoms here..."
              onChange={e => setDescription(e.target.value)}
              value={description}
              name="description"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-[var(--ternery-color)] px-4 py-1 font-semibold text-white rounded-md w-full"
            >
             {t('Submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadForm;
