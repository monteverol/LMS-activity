import React from 'react';

const InputTile = ({ title, value, onChange, inputRef, disabled = true }) => {
    return(
        <div className="bg-[#E2ECF5] flex flex-row w-full rounded-2xl shadow-md">
            <div className="bg-[#D2E0ED] flex items-center justify-center w-60 min-h-24 h-full rounded-2xl shadow-md">
                <h1 className="text-[#1E456D] font-bold text-2xl"> {title} </h1>
            </div>
            <input 
                className="px-8 py-4 text-4xl font-bold w-full outline-none bg-transparent" 
                type="text" 
                value={value} 
                disabled={disabled} 
                onChange={onChange} 
                ref={inputRef} 
            />
        </div>
    );
}

export default InputTile;