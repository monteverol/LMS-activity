import React from 'react';
import logo from '../assets/school_logo.png';

const StudentHeader = ({ logoClick, nameClick, userName, userImage }) => {
    return (
        <div className="relative z-10 bg-[#EFEFEF] flex flex-row w-full px-8 justify-between items-center h-40 rounded-2xl shadow-xl">
            {/* LOGO */}
            <img 
                src={logo} 
                alt="School Logo" 
                className="h-3/5 cursor-pointer"
                onClick={logoClick}
            />
            {/* END OF LOGO */}

            {/* STUDENT PROFILE */}
            <div className="flex flex-row gap-8 items-center">
                {/* NAME */}
                <h1 
                    className="text-[#646464] font-bold text-4xl cursor-pointer hover:underline underline-offset-4"
                    onClick={nameClick}
                > 
                    {userName}
                </h1>
                {/* END OF NAME */}

                {/* STUDENT IMAGE */}
                <div className="bg-[#D8D8D8] h-28 w-28 rounded-2xl overflow-hidden flex items-center justify-center">
                    {userImage ? (
                        <img
                            src={userImage}
                            alt="User Profile"
                            className="object-cover h-full w-full"
                        />
                    ) : (
                        <div className="text-[#A1A1A1] text-2xl">No Image</div>
                    )}
                </div>
                {/* END OF STUDENT IMAGE */}
            </div>
            {/* END OF STUDENT NAME */}
        </div>
    );
};

export default StudentHeader;
