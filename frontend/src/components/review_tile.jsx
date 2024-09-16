import React from 'react';
import Rating from './rating';

const ReviewTile = ({ name, rate, statement }) => {
    return(
        <div className="bg-[#E2ECF5] flex flex-col gap-8 w-full h-auto rounded-2xl shadow-md p-8">
            
            {/* UPPER */}
            <div className="w-full flex flex-row justify-between items-center">

                {/* USER NAME */}
                <h1 className="text-[#1E456D] font-bold text-4xl"> {name} </h1>
                {/* END OF USER NAME */}

                <Rating name={name + "-review"} value={rate} />
                
            </div>
            {/* END OF UPPER */}

            {/* REVIEW STATEMENT */}
            <p className="text-[#1E456D] text-2xl"> {statement} </p>
            {/* END OF REVIEW STATEMENT */}

        </div>
    );
}

export default ReviewTile;