import React from 'react';
import logo from '../assets/school_logo.png';

const StudentHeader = ({ logoClick, nameClick }) => {
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
                    Neutron, Jimmy
                </h1>
                {/* END OF NAME */}

                {/* STUDENT IMAGE */}
                <div className="bg-[#D8D8D8] h-28 w-28 rounded-2xl">
                    
                </div>    
                {/* END OF STUDENT IMAGE */}
            </div>
            {/* END OF STUDENT NAME */}

        </div>
    );
}

export default StudentHeader;