import React from 'react';

const LS_Tile = ({v1, v2, v3, v4, onClick}) => {
    return (
        <div onClick={onClick} className="w-full px-8 py-4 border-b-[3px] border-solid border-b-[#C8D2DB] flex flex-row justify-between items-center cursor-pointer transition duration-500 ease-in-out hover:bg-[#93abc5] rounded-xl">
            <h1 className="text-[#1E456D] font-bold text-3xl w-2/5"> {v1} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-1/5 text-center"> {v2} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-1/5 text-center"> {v3} </h1>
            <h1 className="text-[#1E456D] font-bold text-3xl w-1/5 text-center"> {v4} </h1>
        </div>
    );
}

export default LS_Tile;