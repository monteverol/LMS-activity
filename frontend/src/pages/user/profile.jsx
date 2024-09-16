import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background_2.png";
import StudentHeader from "../../components/student_header";
import InputTile from "../../components/input_tile";
import { ACCESS_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode";
import api from "../../api";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const [previewImage, setPreviewImage] = useState(null); // Preview of uploaded image

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/user/home");
  };

  // Fetch current user info
  const fetchUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken); // Decode the token
      const userId = decodedToken.user_id;

      const response = await api.get(`/api/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserInfo(response.data);
      if (response.data.image) {
        setPreviewImage(response.data.image); // Set the preview image if available
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file); // Set the selected image file
    setPreviewImage(URL.createObjectURL(file)); // Set the preview URL for the image
  };

  // Handle image upload
  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage); // Append the selected image file to form data

    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken); // Decode the token
      const userId = decodedToken.user_id;

      // Send PATCH request to update the user image
      const response = await api.patch(`/api/users/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserInfo(response.data);
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* HEADER */}
      <StudentHeader           logoClick={handleLogoClick}
          userName={`${userInfo?.last_name}, ${userInfo?.first_name}`}
          userImage={userInfo?.image}/>
      {/* END OF HEADER */}

      <div className="bg-[#FFFFFF] w-full h-full rounded-2xl shadow-md">
        {/* UPPER */}
        <div className="bg-[#467DB6] w-full p-8 rounded-xl shadow-md">
          <h1 className="text-white font-bold text-4xl">User Details</h1>
        </div>
        {/* END OF UPPER */}

        {/* CONTENT */}
        <div className="w-full h-full flex flex-row gap-8 p-8">
          {/* PHOTO */}
          <div
            className="bg-[#E2ECF5] w-[30rem] h-[25rem] flex items-center justify-center rounded-2xl shadow-md cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()} // Trigger file input click
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile"
                className="object-cover h-full w-full rounded-2xl"
              />  
            ) : (
              <h1 className="text-[#6D6D6D] font-bold text-4xl">PHOTO</h1>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange} // Handle image selection
          />

          <div className="w-full h-[25rem] flex flex-col justify-between">
            <InputTile title="Name" value={userInfo?.name} />
            <InputTile title="Student ID" value={userInfo?.student_id} />
            <div className="flex flex-row gap-16">
              <InputTile title="Year Lvl." value={"1st Year"} />
              <div
                className="bg-[#467DB6] py-8 px-16 rounded-2xl shadow-md cursor-pointer"
                onClick={handleImageUpload} // Trigger image upload on click
              >
                <h1 className="text-[#DBE0E5] font-bold text-2xl">SAVE</h1>
              </div>
            </div>
          </div>
        </div>
        {/* END OF CONTENT */}
      </div>
    </div>
  );
};

export default Profile;
