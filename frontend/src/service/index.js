import axios from "axios";

export const BASEURL = "http://localhost:3000/CropDisease";

export const uploadCropImageService = async formData => {
  try {
    const res = await axios.post(BASEURL, formData);
    console.log("Response", res);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error", error);
    return error;
  }
};
