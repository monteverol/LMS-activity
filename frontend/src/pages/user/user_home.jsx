import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/background_2.png';
import StudentHeader from '../../components/student_header';
import BH_Tile from '../../components/bh_tile';

const UserHome = () => {
    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/user/profile');
    }

    const handleLogoClick = () => {
        navigate('/user/home');
    }

    return(
        <div
            className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
            style={{ backgroundImage: `url(${background})` }}
        >
            {/* HEADER */}
            <StudentHeader logoClick={handleLogoClick} nameClick={handleUserClick} />
            {/* END OF HEADER */}

            {/* CONTENT */}
            <div className="bg-[#1C528A] w-full h-full rounded-2xl shadow-md">
                {/* LIBRARY HEADER */}
                <div className="bg-[#467DB6] relative w-full h-1/6 flex flex-row items-center justify-between rounded-2xl shadow-md px-24">
                    <h1 className="text-white font-bold text-3xl w-[30%]">Book Title</h1>
                    <h1 className="text-white font-bold text-3xl w-[15%] text-right">Author Name</h1>
                    <h1 className="text-white font-bold text-3xl w-[20%] text-right">Date Borrowed</h1>
                    <h1 className="text-white font-bold text-3xl w-[15%] text-right">Status</h1>
                    <h1 className="text-white font-bold text-3xl w-[20%] text-right">Date Returned</h1>

                </div>
                {/* END OF LIBRARY HEADER */}

                {/* LIBRARY CONTENT */}
                <div className="relative w-full h-5/6 flex items-center justify-center p-8">
                
                    <div className="bg-[#E2ECF5] w-full h-full rounded-2xl py-4 px-8 overflow-y-scroll">
                        {/* ITERATE USER BOOK HISTORY */}
                        <BH_Tile 
                            title="Chamber of Secrets"
                            author="Rowling, J.K."
                            dateBorrowed="April 7, 2023"
                            status="Returned"
                            dateReturned="Aprin 29, 2023"
                        />
                        {/* END OF ITERATE USER BOOK HISTORY */}
                    </div>
                    
                </div>
                {/* END OF LIBRARY CONTENT */}

            </div>
            {/* END OF CONTENT */}

        </div>
    );
}

export default UserHome;