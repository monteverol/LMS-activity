import React from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../assets/background_2.png';
import StudentHeader from '../../components/student_header';
import InputTile from '../../components/input_tile';

const Profile = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/user/home')
    }

    return(
        <div
            className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
            style={{ backgroundImage: `url(${background})` }}
        >
            
            {/* HEADER */}
            <StudentHeader logoClick={handleLogoClick} />
            {/* END OF HEADER */}

            <div className="bg-[#FFFFFF] w-full h-full rounded-2xl shadow-md">
                
                {/* UPPER */}
                <div className="bg-[#467DB6] w-full p-8 rounded-xl shadow-md">
                    <h1 className="text-white font-bold text-4xl">
                        User Details
                    </h1>
                </div>
                {/* END OF UPPER */}

                {/* CONTENT */}
                <div className="w-full h-full flex flex-row gap-8 p-8">

                    <div className="bg-[#E2ECF5] w-[25rem] h-[25rem] flex items-center justify-center rounded-2xl shadow-md">
                        <h1 className="text-[#6D6D6D] font-bold text-4xl">
                            PHOTO
                        </h1>
                    </div>

                    <div className="w-full h-[25rem] flex flex-col justify-between">
                        <InputTile title="Name" />
                        <InputTile title="Student ID" />
                        <div className="flex flex-row gap-16">
                            <InputTile title="Year Lvl." />
                            <div className="bg-[#467DB6] py-8 px-16 rounded-2xl shadow-md">
                                <h1 className="text-[#DBE0E5] font-bold text-2xl"> EXIT </h1>
                            </div>
                        </div>
                    </div>

                </div>
                {/* END OF CONTENT */}


            </div>

        </div>
    );
}

export default Profile;