import React, { useState, useRef } from 'react';
import api from '../api';

const AddBookModal = ({ fetchBooks }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null); // State for the image file
    const [previewImage, setPreviewImage] = useState(null); // State for image preview
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null); // Reference for the hidden file input

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file); // Update the image state when a file is selected

            // Create a preview of the image using FileReader
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); // Set the preview image
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click(); // Trigger file input click when the placeholder is clicked
    };

    const handleAddBook = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        if (image) {
            formData.append('image', image); // Append the image file if provided
        }

        try {
            const response = await api.post('/api/books/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set the content type to multipart
                },
            });
            console.log('Book added successfully:', response.data);
            fetchBooks();  // Refresh the book list after adding the book
            setTitle('');
            setAuthor('');
            setImage(null); // Reset the image state
            setPreviewImage(null); // Reset the preview image
            document.getElementById('my_modal_2').close(); // Close the modal after adding
        } catch (error) {
            console.error('Error adding book:', error);
            setError('Failed to add the book');
        }
    };

    return (
        <dialog id="my_modal_2" className="modal">
            <div className="modal-box max-w-[95%] p-0 flex flex-col">
                <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md">
                    <h1 className="text-white text-4xl font-bold">Book Details</h1>
                </div>
                <div className="flex flex-row p-8 gap-8">
                    {/* BOOK COVER UPLOAD */}
                    <div
                        className="bg-[#E2ECF5] h-[25rem] w-[25rem] rounded-xl flex items-center justify-center cursor-pointer"
                        onClick={handleImageClick} // Trigger file input click when clicked
                    >
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Preview"
                                className="h-full w-full object-cover rounded-xl"
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
                        onChange={handleImageChange}
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
                                onChange={(e) => setTitle(e.target.value)}  // Update title state
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
                                onChange={(e) => setAuthor(e.target.value)}  // Update author state
                            />
                        </div>
                        {/* END OF AUTHOR INPUT */}

                        {/* ERROR MESSAGE */}
                        {error && <p className="text-red-600">{error}</p>}

                        {/* ADD BUTTON */}
                        <div
                            className="bg-[#467DB6] px-16 py-8 flex items-center justify-center rounded-2xl shadow-md cursor-pointer"
                            onClick={handleAddBook}
                        >
                            <h1 className="text-white font-bold text-4xl">Add Book</h1>
                        </div>
                        {/* END OF ADD BUTTON */}
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default AddBookModal;
