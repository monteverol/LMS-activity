import React, { useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import api from "../api";
import axios from "axios";

const ReturnBookModal = ({fetchBooks}) => {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const [searchTerm, setSearchTerm] = useState(""); // Track input for searching books
  const [loanDetails, setLoanDetails] = useState(null); // Track loan details after fetching
  const [bookRating, setBookRating] = useState(null); // Track book rating

  // Function to fetch loan details based on book title
  const fetchLoanDetails = async (bookTitle) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/loans/?book_title=${bookTitle}&status=open`);
      console.log(response.data);
      
      if (response.data.length > 0) {
        const loan = response.data[0];
        const bookResponse = await api.get(`api/books/${loan.book}/`);
        const book = bookResponse.data;
        const userResponse = await api.get(`api/users/${loan.user}/`);
        const user = userResponse.data;
        const ratingResponse = await api.get(`api/sentiment/${loan.book}/`);
        setBookRating(ratingResponse.data.average_rating);
        setLoanDetails({ ...loan, book: book, user: user });
      } else {
        alert("No open loans found for this book.");
        setLoanDetails(null);
        setBookRating(null);
      }
    } catch (error) {
      console.error("Error fetching loan details:", error);
      alert("Failed to fetch loan details.");
    }
  };

  // Handle Enter key press to trigger fetching loan details
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchLoanDetails(searchTerm);
      e.preventDefault();
    }
  };

  const handleReturnBook = async () => {
    if (!loanDetails) {
      alert("No loan found to return.");
      return;
    }
  
    // Prepare the updated loan data for PATCH
    const updatedLoanData = {
      status: "returned", // Update the status to returned
      returned_at: new Date().toISOString(), // Set the returned_at timestamp to current time
    };
  
    console.log("Updated Loan Data: ", updatedLoanData); // Log the data to verify
  
    try {
      // Make a PATCH request to update the loan
      const response = await api.patch(`api/loans/${loanDetails.id}/`, updatedLoanData);
  
      alert("Book returned successfully.");
      console.log("Updated Loan:", response.data);

      fetchBooks()
  
      // Optionally close the modal
      document.getElementById("return_modal")?.close();
    } catch (error) {
      console.error("Error returning the book:", error.response.data);
      alert("Failed to return the book. Please try again.");
    }
  };
  
  const handleClose = (action) => {
    if (action === "close") {
      document.getElementById("return_modal")?.close();
    }
  };

  return (
    <dialog id="return_modal" className="modal">
      <div className="modal-box max-w-[48%] h-[60%] px-5 py-4 flex flex-col space-y-5 bg-[#E6E6E6] rounded-lg">
        <div className="flex h-[2.75rem] justify-between">
          <p className="text-3xl font-bold text-[#28588A] italic">Return Book</p>
          <div className="flex space-x-3 pt-1">
            <p className="text-2xl font-bold text-[#5C5C5C] italic underline">
              {`${formattedDate} - ${formattedTime}`}
            </p>
            <IoMdCalendar className="text-4xl text-[#5C5C5C]" />
          </div>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="input w-full h-[3.5rem] text-[1.75rem] font-bold text-[#4F4F4F] drop-shadow-lg"
          placeholder="Enter Book Title"
        />

        <div className="flex justify-between h-[3.75rem] space-x-5 text-[#4F4F4F] text-2xl">
          <div className="bg-[#C4D5E6] h-full w-9/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {loanDetails ? loanDetails.book.author : "Book Author"}
          </div>
          <div className="bg-[#C4D5E6] h-full w-5/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {bookRating !== null ? `${bookRating} User Rating` : "Book Ratings"}
          </div>
        </div>

        <div className="h-1 w-full bg-[#B6B6B6] my-2"></div>

        <div className="bg-[#C4D5E6] w-full h-[3.5rem] text-[1.75rem] font-bold text-[#4F4F4F] drop-shadow-lg flex items-center px-4">
          {loanDetails ? `${loanDetails.user.first_name} ${loanDetails.user.last_name}` : "Student Name"}
        </div>
        <div className="flex justify-between h-[3.75rem] space-x-5 text-[#4F4F4F] text-2xl">
          <div className="bg-[#C4D5E6] h-full w-9/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {loanDetails ? "4th Year - 1st Semester" : "Year Level"} {/* Hardcoded for now */}
          </div>
          <div className="bg-[#C4D5E6] h-full w-5/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {loanDetails ? loanDetails.user.student_id : "Student ID"}
          </div>
        </div>

        <div className="h-[4rem] w-full flex justify-between items-end">
          <button
            onClick={() => handleClose("close")}
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#BDBDBD] h-14 w-3/12 text-2xl text-[#525252]"
          >
            Back
          </button>
          <button
            onClick={handleReturnBook}
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#467DB6] h-14 w-3/12 text-2xl text-white"
          >
            Return
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Return</button>
      </form>
    </dialog>
  );
};

export default ReturnBookModal;
