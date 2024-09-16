import React from 'react';

const BH_Tile = ({ title, author, dateBorrowed, status, dateReturned, onClick }) => {
    
    return (
        <div
            className="w-full px-4 py-4 border-b-[3px] border-solid border-b-[#C8D2DB] flex flex-row justify-between items-center cursor-pointer transition duration-500 ease-in-out hover:bg-[#93abc5] rounded-xl"
            onClick={onClick} // Call the onClick function passed down from the parent
        >
            <h1 className="text-[#1E456D] font-bold text-[1.75rem] w-[28%]"> {title} </h1>
            <h1 className="text-[#1E456D] font-bold text-[1.75rem] w-[20%] text-right"> {author} </h1>
            <h1 className="text-[#1E456D] font-bold text-[1.75rem] w-[24%] text-right"> {dateBorrowed} </h1>
            <h1 className="text-[#1E456D] font-bold text-[1.75rem] w-[16%] text-right"> {status} </h1>
            <h1 className="text-[#1E456D] font-bold text-[1.75rem] w-[24%] text-right"> {dateReturned !== "N/A" ? dateReturned : "- - - - - - - - -"} </h1>
        </div>
    );
}

export default BH_Tile;
