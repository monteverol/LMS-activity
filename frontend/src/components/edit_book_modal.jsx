import React, { useState, useRef } from "react";
import api from "../api"; // Import API for making requests

const EditBookModal = ({ bookDetails, fetchBookDetails }) => {
  if (bookDetails === null) {
    return null; // Prevent rendering if book details are not provided
  }

  const [title, setTitle] = useState(bookDetails.title); // State for title
  const [author, setAuthor] = useState(bookDetails.author); // State for author
  const [image, setImage] = useState(null); // State for book cover image
  const [previewImage, setPreviewImage] = useState(bookDetails.image); // State for image preview
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Handle image change and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      // Create a preview of the image using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input when clicked
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      if (image) {
        formData.append("image", image); // Append the image file if provided
      }

      // Send PATCH request to update book details
      const response = await api.patch(`/api/books/${bookDetails.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Book updated successfully:", response.data);

      // Fetch the updated book details after saving
      fetchBookDetails();

      // Close the modal after saving
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleClose = () => {
    document.getElementById("edit_modal").close();
  };

  return (
    <dialog id="edit_modal" className="modal">
      <div className="modal-box max-w-[95%] p-0 flex flex-col">
        <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md">
          <h1 className="text-white text-4xl font-bold"> Edit Book Details </h1>
        </div>
        <div className="flex flex-row p-8 gap-8">
          {/* BOOK COVER UPLOAD */}
          <div
            className="bg-[#E2ECF5] h-[25rem] w-[25rem] rounded-xl flex items-center justify-center cursor-pointer"
            onClick={handleImageClick} // Trigger file input click
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Book Cover Preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <h1 className="text-[#6D6D6D] font-bold text-4xl">PHOTO</h1>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden" // Hide the file input
            accept="image/*"
            onChange={handleImageChange} // Handle image change
          />
          {/* END OF BOOK COVER UPLOAD */}

          <div className="h-[25rem] flex flex-col items-end justify-between w-full">
            {/* TITLE INPUT */}
            <div className="bg-[#E2ECF5] flex flex-row w-full rounded-2xl shadow-md">
              <div className="bg-[#D2E0ED] flex items-center justify-center w-60 h-24 rounded-2xl shadow-md">
                <h1 className="text-[#1E456D] font-bold text-2xl">Title</h1>
              </div>
              <input
                className="px-8 py-4 text-4xl font-bold w-full outline-none bg-transparent"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* END OF TITLE INPUT */}

            {/* AUTHOR INPUT */}
            <div className="bg-[#E2ECF5] flex flex-row w-full rounded-2xl shadow-md">
              <div className="bg-[#D2E0ED] flex items-center justify-center w-60 h-24 rounded-2xl shadow-md">
                <h1 className="text-[#1E456D] font-bold text-2xl">Author</h1>
              </div>
              <input
                className="px-8 py-4 text-4xl font-bold w-full outline-none bg-transparent"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            {/* END OF AUTHOR INPUT */}

            {/* BUTTONS */}
            <div className="flex w-full justify-between">
              <div
                className="bg-[#B2B2B2] px-16 py-8 w-3/12 h-5/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
                onClick={handleClose}
              >
                <h1 className="text-white font-bold text-4xl">Cancel</h1>
              </div>
              <div
                className="bg-[#467DB6] px-16 py-8 w-3/12 h-5/6 flex items-center justify-center rounded-xl shadow-md cursor-pointer"
                onClick={handleSave} // Handle Save button click
              >
                <h1 className="text-white font-bold text-4xl">Save</h1>
              </div>
            </div>
            {/* END OF BUTTONS */}
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  );
};

export default EditBookModal;
