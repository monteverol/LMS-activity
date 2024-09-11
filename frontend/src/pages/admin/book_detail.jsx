import React from 'react';

const BookDetail = () => {
    const fetchBookDetails = async (bookId) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            const { title, authors, imageLinks, averageRating, ratingsCount, description } = data.volumeInfo;
    
            const bookDetails = {
                title,
                authors: authors ? authors.join(', ') : 'Unknown Author',
                image: imageLinks?.thumbnail || 'No Image Available',
                averageRating: averageRating || 'No Rating',
                ratingsCount: ratingsCount || 0,
                description: description || 'No Description',
            };
    
            console.log(bookDetails);
            
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    return(
        <div>

        </div>
    );
}

export default BookDetail;