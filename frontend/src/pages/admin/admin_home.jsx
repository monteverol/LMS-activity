import React, { useState, useRef } from 'react';
import logo from '../../assets/school_logo.png';
import background from '../../assets/background_2.png';
import { IoSearch } from "react-icons/io5";
import LS_Tile from '../../components/ls_tile';
import Loading from '../../components/loading';
import AddBookModal from '../../components/add_book_modal';

const AdminHome = () => {
    const [books, setBooks] = useState([]);
    const [tab, setTab] = useState(1);
    const [loading, setLoading] = useState(false); 
    const searchRef = useRef();

    const fetchBooks = async (search) => {
        setLoading(true);
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            const filteredBooks = data.items.map((item) => {
                const { id, volumeInfo: { title, authors, publishedDate } } = item;
    
                let formattedDate = 'Unknown Date';
                if (publishedDate) {
                    const date = new Date(publishedDate);
                    if (!isNaN(date)) {
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        formattedDate = date.toLocaleDateString('en-US', options);
                    }
                }
    
                return {
                    id, // Keep the book ID for fetching more details later
                    title,
                    authors: authors ? authors.join(', ') : 'Unknown Author',
                    publishedDate: formattedDate,
                };
            });
    
            setBooks(filteredBooks);
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

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
            <AddBookModal />
            <div
                className="relative h-screen w-screen bg-cover bg-center flex flex-col"
                style={{ backgroundImage: `url(${background})` }}
            >


                {/* HEADER */}
                <div className="bg-[#F5F5F5] rounded-b-xl">
                    {/* UPPER HEADER */}
                    <div className="relative z-10 bg-[#EFEFEF] flex flex-row w-full px-8 justify-between items-center h-40 rounded-b-xl shadow-xl">
                        <img src={logo} alt="School Logo" className="h-3/5"/>
                        <div className="flex flex-row justify-between gap-8">
                            <div className="bg-[#467DB6] px-8 py-4 rounded-xl cursor-pointer shadow-xl">
                                <h1 className="text-[#EFEFEF] text-2xl font-bold">Return Book</h1>
                            </div>
                            <div className="bg-[#467DB6] px-8 py-4 rounded-xl cursor-pointer shadow-xl">
                                <h1 className="text-[#EFEFEF] text-2xl font-bold">Issue Book</h1>
                            </div>
                        </div>
                    </div>
                    
                    {/* NAVIGATIONS */}
                    <div className="flex flex-row justify-between items-center px-16 py-4">
                        {/* TABS */}
                        <div className="flex flex-row gap-16">
                            <h1 
                                onClick={() => setTab(1)}
                                className={tab === 1 ? "text-[#4D7CAD] underline underline-offset-4 font-bold text-2xl cursor-pointer" : "text-[#636363] font-bold text-2xl cursor-pointer"}
                            > Library</h1>
                            <h1 
                                onClick={() => setTab(2)}
                                className={tab === 2 ? "text-[#4D7CAD] underline underline-offset-4 font-bold text-2xl cursor-pointer" : "text-[#636363] font-bold text-2xl cursor-pointer"}
                            > Students</h1>
                        </div>

                        {/* SEARCH */}
                        <div className="bg-[#FFFFFF] w-1/3 px-4 shadow-md flex flex-row justify-between items-center rounded-2xl">
                            <input 
                                type="text" 
                                className="bg-transparent w-full text-2xl outline-none py-2 font-bold text-[#606060]" 
                                placeholder="Search smth..."
                                ref={searchRef}
                                onKeyDown={(e) => {
                                    if (e.keyCode === 13) fetchBooks(searchRef.current.value);
                                }}
                            />
                            <IoSearch size={30} />
                        </div>
                    </div>
                </div>

                <div className="h-full w-full relative">
                    {
                        tab === 1 ? (
                            // LIBRARY CONTAINER
                            <div className="bg-[#1C528A] w-[95%] h-[90%] rounded-2xl shadow-md absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                {/* LIBRARY HEADER */}
                                <div className="bg-[#467DB6] relative w-full h-1/6 flex flex-row items-center justify-between rounded-2xl shadow-md px-24">
                                    <h1 className="text-white font-bold text-3xl w-2/5">Book Title</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Author Name</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Date Released</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Status</h1>
                                </div>
                                {/* END OF LIBRARY HEADER */}

                                {/* LIBRARY CONTENT */}
                                <div className="relative w-full h-5/6 flex items-center justify-center p-8">
                                    {
                                        loading ? (
                                            <Loading />
                                        ) : (
                                            <div className="bg-[#E2ECF5] w-full h-full rounded-2xl py-4 px-8 overflow-y-scroll">
                                                {
                                                    books.map((book, index) => (
                                                        <LS_Tile
                                                            key={index}
                                                            v1={book.title}
                                                            v2={book.authors}
                                                            v3={book.publishedDate}
                                                            v4="Returned"
                                                            onClick={() => fetchBookDetails(book.id)} // Fetch detailed book info when clicked
                                                        />
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                {/* END OF LIBRARY CONTENT */}
                                
                                {/* FLOATING BUTTON */}
                                <div 
                                    className="z-50 absolute bottom-16 right-16 bg-[#467DB6] rounded-xl flex items-center justify-center px-16 py-4 cursor-pointer"
                                    onClick={()=>document.getElementById('my_modal_2').showModal()}
                                >
                                    <h1 className="text-white font-bold text-2xl">Add Book</h1>
                                </div>
                                {/* END OF FLOATING BUTTON */}

                            </div>
                        ) : (
                            // STUDENT CONTAINER
                            <div className="bg-[#1C528A] w-[95%] h-[90%] rounded-2xl shadow-md absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                                {/* STUDENT HEADER */}
                                <div className="bg-[#467DB6] relative w-full h-1/6 flex flex-row items-center justify-between rounded-2xl shadow-md px-24">
                                    <h1 className="text-white font-bold text-3xl w-2/5">Student Name</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Student ID</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Year level</h1>
                                    <h1 className="text-white font-bold text-3xl w-1/5 text-center">Status</h1>
                                </div>
                                {/* END OF STUDENT HEADER */}

                                {/* STUDENT CONTENT */}
                                <div className="relative w-full h-5/6 flex items-center justify-center p-8">
                                    <div className="bg-[#E2ECF5] w-full h-full rounded-2xl py-4 px-8 overflow-y-scroll">
                                        <LS_Tile
                                            v1="Cayetano, Shandelo B."
                                            v2="21132321"
                                            v3="4th Year - 2nd Sem"
                                            v4="Enrolled"
                                        />
                                    </div>
                                </div>
                                {/* END OF STUDENT CONTENT */}

                            </div>
                            // END OF STUDENT CONTAINER
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default AdminHome;