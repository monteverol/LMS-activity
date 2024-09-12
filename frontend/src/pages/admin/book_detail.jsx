import React from 'react';
import background from '../../assets/background_2.png';
import AdminHeader from '../../components/admin_header';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const BookDetail = () => {
    const fetchBookDetails = async (bookId) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            const { title, authors, imageLinks, averageRating, ratingsCount, description } = data.volumeInfo;
    
            const bookDetails = {
                title,
                authors: authors ? authors.join(', ') : 'Unknown Author',
                image: imageLinks?.thumbnail || 'No Image Available',
                averageRating: averageRating || 'No Rating',
                ratingsCount: ratingsCount || 0,
                description: description || 'No Description',
            };
    
            console.log(bookDetails);
            
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    return(
        <>
            <div
                className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
                style={{ backgroundImage: `url(${background})` }}
            >
                
                <AdminHeader />

                {/* CONTENT */}
                <div className="bg-[#AEC6DF] h-full w-full rounded-2xl shadow-md">
                    {/* HEADER */}
                    <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-8">
                            <MdOutlineKeyboardArrowLeft color="white" size={40} className="cursor-pointer" />
                            <h1 className="text-white font-bold text-3xl">
                                Book Details
                            </h1>
                        </div>
                        <h1 className="text-white font-bold text-3xl hover:underline underline-offset-4">
                            edit
                        </h1>
                    </div>
                    {/* END OF HEADER */}
                    
                    {/* CONTEXT */}
                    <div className="flex flex-row gap-8 w-full h-full">

                    </div>
                    {/* END OF CONTEXT */}

                </div>
                {/* END OF CONTENT */}

            </div>
        </>
    );
}

export default BookDetail;