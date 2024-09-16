import React, { useState, useEffect } from 'react';

const Rating = ({ value, name }) => {
    const [rating, setRating] = useState(Math.floor(value));

    useEffect(() => {
        setRating(Math.floor(value));
    }, [value]);

    return (
        <div className="rating rating-lg flex items-center justify-center">
            <input 
                type="radio" 
                name={name} 
                className="mask mask-star-2 bg-[#CEAB2E]"
                checked={rating === 1}
                onChange={() => setRating(1)}
            />
            <input 
                type="radio" 
                name={name} 
                className="mask mask-star-2 bg-[#CEAB2E]"
                checked={rating === 2}
                onChange={() => setRating(2)}
            />
            <input 
                type="radio" 
                name={name} 
                className="mask mask-star-2 bg-[#CEAB2E]" 
                checked={rating === 3}
                onChange={() => setRating(3)}
            />
            <input 
                type="radio" 
                name={name} 
                className="mask mask-star-2 bg-[#CEAB2E]" 
                checked={rating === 4}
                onChange={() => setRating(4)}
            />
            <input 
                type="radio" 
                name={name} 
                className="mask mask-star-2 bg-[#CEAB2E]" 
                checked={rating === 5}
                onChange={() => setRating(5)}
            />
            <h1 className="text-[#AC8F28] font-bold text-4xl ml-8">{value}</h1>
        </div>
    );
}

export default Rating;