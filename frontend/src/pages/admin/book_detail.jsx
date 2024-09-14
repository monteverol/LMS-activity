import React, { useState } from 'react';
import background from '../../assets/background_2.png';
import AdminHeader from '../../components/admin_header';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import InputTile from '../../components/input_tile';
import Rating from '../../components/rating';
import ReviewTile from '../../components/review_tile';

const BookDetail = () => {
    const [toggleView, setToggleView] = useState(true);

    const handleToggleView = () => {
        setToggleView(toggleView ? false : true);
    }

    return(
        <>
            <div
                className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
                style={{ backgroundImage: `url(${background})` }}
            >
                
                <AdminHeader />

                {/* CONTENT */}
                <div className="bg-[#AEC6DF] flex-1 w-full rounded-2xl shadow-md">
                    {/* HEADER */}
                    <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md flex flex-row justify-between items-center">
                        <div className="flex flex-row gap-8">
                            <MdOutlineKeyboardArrowLeft color="white" size={40} className="cursor-pointer" />
                            <h1 className="text-white font-bold text-3xl">
                                Book Details
                            </h1>
                        </div>
                        <div className="flex flex-row gap-8">
                            {
                                toggleView ?
                                (
                                    <h1 className="text-white font-bold text-3xl cursor-pointer hover:underline underline-offset-4">
                                        edit
                                    </h1>
                                ) : null
                            }
                            <GoArrowSwitch color="white" size={40} className="cursor-pointer" onClick={handleToggleView}/>
                        </div>
                    </div>
                    {/* END OF HEADER */}
                    
                    {/* CONTEXT */}
                    <div className="flex flex-row gap-8 w-full h-[30rem] p-8">
                        {/* BOOK IMAGE */}
                        <div className="flex flex-col flex-shrink-0 h-full rounded-xl shadow-md w-[27.5rem] overflow-hidden">
                            <div className="bg-[#E2ECF5] flex items-center justify-center h-full relative">

                                {/* IMAGE */}
                                <h1 className="text-[#6D6D6D] font-bold text-4xl text-center">BOOK COVER</h1>
                                {/* END OF IMAGE */}

                                {/* BOOK STATUS */}
                                <div className="bg-[#BFC6CE] absolute bottom-0 left-0 w-full py-4 rounded-xl shadow-md flex items-center justify-center opacity-90">
                                    <h1 className="text-[#1E456D] font-bold text-2xl">Borrowed</h1>
                                </div>
                                {/* END OF BOOK STATUS */}
                            </div>
                        </div>
                        {/* END OF BOOK IMAGE */}

                        {/* RIGHT SIDE */}
                        <div className="flex flex-col gap-8 w-full h-auto overflow-y-auto">

                            {
                                toggleView ?
                                (
                                    <>
                                        <InputTile title="Title" value="Chamber of Secrets" disabled={true} />
                                        <div className="flex flex-row gap-8 w-full">
                                            <InputTile title="Author" value="J.K. Rowling" disabled={true} />
                                            <div className="bg-[#E7E2D2] rounded-xl px-8 py-4 flex items-center justify-center shadow-md">
                                                <Rating value={3.1} />
                                            </div>
                                        </div>
                                        {/* USER REVIEWS */}
                                        <div className="flex flex-col gap-8">
                                            <h1 className="text-[#4E5155] font-bold text-2xl">User Reviews:</h1>
                                            {/* ITERATE REVIEWS */}
                                            <ReviewTile 
                                                name="Cayetano, Shadnilu"
                                                rate={5}
                                                statement="tite"
                                            />
                                            <ReviewTile 
                                                name="Santiago, Shandilu"
                                                rate={3}
                                                statement="./."
                                            />
                                            <ReviewTile 
                                                name="Sarah Dudirty"
                                                rate={1}
                                                statement="Shiminet Shiminet Shiminet, Shalalala~"
                                            />
                                            {/* END OF ITERATE REVIEWS */}
                                        </div>
                                        {/* END OF USER REVIEWS */}
                                    </>
                                ) : (
                                    <>
                                        <div className="bg-[#DEE2E5] w-full h-full rounded-xl shadow-md flex flex-col">
                                            <div className="bg-white w-full px-8 py-4 rounded-xl shadow-md">
                                                <h1 className="text-[#265787] font-bold text-2xl">Sentiment Analysis Results Based on User Review:</h1>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            
                        </div>
                        {/* END OF RIGHT SIDE */}
                    </div>
                    {/* END OF CONTEXT */}

                </div>
                {/* END OF CONTENT */}

            </div>
        </>
    );
}

export default BookDetail;