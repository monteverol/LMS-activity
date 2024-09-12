import React from 'react';
import logo from '../assets/school_logo.png';

const AdminHeader = ({ logoClick, nameClick }) => {
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

            <h1 className="text-[#646464] font-bold text-4xl">
                ADMIN
            </h1>

        </div>
    );
}

export default AdminHeader;