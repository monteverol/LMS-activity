import React from 'react';
import logo from '../assets/school_logo.png';
import background from '../assets/background.png';
import library_img from '../assets/library.png';

const LogIn = () => {
    return (
        <div 
            className="relative h-screen w-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >

            {/* HEADER */}
            <div className="relative z-10 bg-[#EFEFEF] flex flex-row w-full px-8 justify-between items-center h-40 rounded-b-xl shadow-xl">
                <img src={logo} alt="School Logo" className="h-3/5"/>
                <h1 className="text-[#1C528A] text-4xl font-bold">
                    Library Management System Login
                </h1>
            </div>
            {/* END OF HEADER */}

            {/* LOGIN PANEL */}
            <div 
                className="flex w-full justify-center items-center z-50"
                style={{ height: 'calc(100% - 10rem)' }}
            >
                {/* CENTER FORM */}
                <div className="bg-[#D8DEE4] flex flex-row justify-between w-7/10 h-7/10 rounded-2xl">
                    
                    {/* LEFT IMAGE */}
                    <div className="p-8">
                        <img src={library_img} alt="Library Image" className="h-full" />
                    </div>
                    {/* END OF LEFT IMAGE */}

                    {/* FORM */}
                    <div className="bg-[#1C528A] rounded-2xl h-9/10 px-12 py-8 flex flex-col justify-evenly items-center">
                        <h1 className="text-[#EFEFEF] text-4xl font-bold">Enter Account Details</h1>

                        {/* USERID */}
                        <div className="flex flex-col gap-4 w-full">
                            <h1 className="text-[#EFEFEF] text-2xl">User ID</h1>
                            <input className="text-2xl font-bold rounded-xl outline-none px-2 py-4" type="text" />
                        </div>
                        {/* END OF USERID */}

                        {/* PASSWORD */}
                        <div className="flex flex-col gap-4 w-full">
                            <h1 className="text-[#EFEFEF] text-2xl">Password</h1>
                            <input className="text-2xl font-bold rounded-xl outline-none px-2 py-4" type="password" />
                        </div>
                        {/* END OF PASSWORD */}

                        {/* LOGIN BUTTON */}
                        <div className="bg-[#488ACF] rounded-xl px-16 py-4">
                            <h1 className="text-[#EFEFEF] text-2xl font-bold">Login</h1>
                        </div>
                        {/* END OF LOGIN BUTTON */}
                    </div>
                    {/* END OF FORM */}

                </div>
                {/* END OF CENTER FORM */}

            </div>
            {/* END OF LOGIN PANEL */}

        </div>
    );
}

export default LogIn;