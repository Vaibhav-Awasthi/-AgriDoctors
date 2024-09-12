export const uploadToCloudinary = async file => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "techtribe");
  data.append("cloud_name", "dlykup1dh");
  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlykup1dh/auto/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const resData = await res.json();

    return resData?.url;
  } catch (error) {
    console.log(error);
  }
};
