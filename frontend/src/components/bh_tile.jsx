import React from 'react';

const BH_Tile = ({ title, author, dateBorrowed, status, dateReturned }) => {
    return(
        <div className="w-full px-8 py-4 border-b-[3px] border-solid border-b-[#C8D2DB] flex flex-row justify-between items-center cursor-pointer transition duration-500 ease-in-out hover:bg-[#93abc5] rounded-xl">
            <h1 className="text-[#1E456D] font-bold text-3xl w-[30%]"> {title} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-[15%] text-right"> {author} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-[20%] text-right"> {dateBorrowed} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-[15%] text-right"> {status} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-[20%] text-right"> {dateReturned} </h1>
        </div>
    );
}

export default BH_Tile;