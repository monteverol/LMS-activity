import React, { useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode"; 

const ReviewBookModal = ({ bookDetails, reviews, fetchBookReviews, fetchBookSentiment }) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [existingReview, setExistingReview] = useState(null); // To track if user has an existing review
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch logged-in user ID from JWT
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const decodedToken = jwtDecode(accessToken);
    setUserId(decodedToken.user_id);

    

    // Check if the user has already reviewed this book
    const userReview = reviews.find(review => {
      console.log(review.user.id, typeof(review.user.id), "rev");

      console.log(decodedToken.user_id, typeof(decodedToken.user_id), "dec");
      
      
      return (review.user.id === decodedToken.user_id)
    });
    if (userReview) {
      console.log("match");
      
      setRating(userReview.rating);
      setReviewText(userReview.review_text);
      setExistingReview(userReview); // Track existing review
    }
  }, [reviews, bookDetails]);

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const reviewData = { rating, review_text: reviewText, book: bookDetails.id };

      if (existingReview) {
        
        // If the review exists, PATCH it
        await api.patch(`/api/reviews/${existingReview.id}/`, reviewData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      } else {
        // If no review exists, POST a new one
        await api.post(`/api/reviews/`, reviewData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      }

      // Refresh reviews after submission
      fetchBookReviews(bookDetails.id);

      fetchBookSentiment(bookDetails.id)

      // Close the modal after submission
      document.getElementById("review_modal").close();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleClose = () => {
    document.getElementById("review_modal")?.close();
  };

  return (
    <dialog id="review_modal" className="modal">
      <div className="modal-box max-w-[48%] h-[56%] p-5 flex flex-col space-y-6 bg-[#E6E6E6] rounded-lg">
        <div className="flex justify-between items-center">
          <div className="text-[#265788] font-bold text-5xl pl-4">
            {bookDetails?.title}
          </div>
          <div>
            <div className="rating rating-lg flex items-center justify-center bg-[#D7D7D7] p-4 rounded-lg drop-shadow-lg">
              {[1, 2, 3, 4, 5].map(value => (
                <input
                  key={value}
                  type="radio"
                  className="mask mask-star-2 bg-[#CEAB2E]"
                  checked={rating === value}
                  onChange={() => setRating(value)}
                />
              ))}
            </div>
          </div>
        </div>
        <textarea
          className="textarea text-[#767E86] text-3xl font-bold h-full p-4"
          placeholder="Enter review here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <div className="flex justify-between items-center">
          <button
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#C9C9C9] h-14 w-[28%] text-2xl text-[#265788]"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#265788] h-14 w-[28%] text-2xl text-white"
            onClick={handleSubmit}
          >
            Submit Review
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Return</button>
      </form>
    </dialog>
  );
};

export default ReviewBookModal;
