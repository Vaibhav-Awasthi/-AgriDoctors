import React, { useState } from "react";
import Header from "../component/header/Header";
import ImageUploadForm from "../component/form/ImageUploadForm";
import DiseaseResult from "../component/disease-result/DiseaseResult";
import { uploadCropImageService } from "../service";
import toast from "react-hot-toast";
import Footer from "../component/footer/Footer";
const Home = () => {
  const [DESCRIPTION, SETDESCRIPTION] = useState(null);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [accu, setaccu] = useState("");
  // //! Post image data to backend
  // const handleCropImageUpload = async formData => {
  //   setIsLoading(!isLoading);
  //   try {
  //     const data = await uploadCropImageService(formData);
  //     setDiseaseResult(data);
  //     setIsLoading(!isLoading);
  //   } catch (error) {
  //     const errMsg = error.message || "something wents wrong.";
  //     setError(errMsg);
  //     toast.error(errMsg);
  //     console.error("Error uploading image:", error);
  //     setIsLoading(!isLoading);
  //   }
  // };

  const uploadAgainHandler = () => {
    setDiseaseResult(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-[80vh]">
        {isLoading && !error && !diseaseResult && (
          <div className="py-4 text-xl font-semibold text-center">
            Loading...
          </div>
        )}
        {diseaseResult && (
          <DiseaseResult
            error={error}
            uploadAgainHanlder={uploadAgainHandler}
            DiseaseDiagnosis={diseaseResult}
            SetDescription={DESCRIPTION}
            setaccuracy={accu}
          />
        )}
        {error && (
          <div className="py-4 text-xl font-semibold text-center text-red-600">
            {error}
          </div>
        )}
        {!diseaseResult && !isLoading && !error && (
          <ImageUploadForm
            setLoading={setIsLoading}
            setDiseaseResult={setDiseaseResult}
            setError={setError}
            SetDescription={SETDESCRIPTION}
            setaccuracy={setaccu}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
