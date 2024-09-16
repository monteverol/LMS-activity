import React, { useState, useEffect } from "react";
import { IoMdCalendar } from "react-icons/io";
import axios from "axios"; // Import axios for API requests

const IssueBookModal = ({ setBooks, books, students }) => {
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
  const [selectedBook, setSelectedBook] = useState(null); // Track selected book
  const [bookRating, setBookRating] = useState(null); // Track rating for the selected book

  const [studentSearchTerm, setStudentSearchTerm] = useState(""); // Track input for searching students
  const [selectedStudent, setSelectedStudent] = useState(null); // Track selected student

  // Function to fetch sentiment analysis (ratings) for the selected book
  const fetchBookRating = async (bookId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/sentiment/${bookId}/`);
      setBookRating(response.data.average_rating); // Update rating
    } catch (error) {
      console.error("Error fetching book rating:", error);
    }
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book); // Update selected book
    setSearchTerm(book.title); // Update input with selected book title
    fetchBookRating(book.id); // Fetch sentiment analysis (rating) for the book
  };

  const handleSelectStudent = (student) => {
    console.log(student);
    
    setSelectedStudent(student); // Update selected student
    setStudentSearchTerm(student.name); // Update input with selected student's name
  };

  // Filter books based on the search term
  const filteredBooks = searchTerm
    ? books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];  // If no search term is provided, return an empty array

  // Filter students based on the search term
  const filteredStudents = studentSearchTerm
    ? students.filter((student) =>
        student.name.toLowerCase().includes(studentSearchTerm.toLowerCase())
      )
    : [];  // If no student search term is provided, return an empty array

  const handleBookKeyPress = (e) => {
    if (e.key === "Enter") {
      const matchedBook = filteredBooks[0]; // Automatically select the first matched book
      if (matchedBook) {
        handleSelectBook(matchedBook);
      }
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  const handleStudentKeyPress = (e) => {
    if (e.key === "Enter") {
      kig
      const matchedStudent = filteredStudents[0]; // Automatically select the first matched student
      if (matchedStudent) {
      console.log("match");

        handleSelectStudent(matchedStudent);
      }
      e.preventDefault(); // Prevent form submission on Enter
    }
  };

  const handleIssueBook = async () => {
    if (!selectedBook || !selectedStudent) {
      alert("Please select both a book and a student");
      return;
    }

    const loanData = {
      book: selectedBook.id,
      user: selectedStudent.id, // Use 'user' to match the backend model
      status: "open", // Set the status of the loan to open
    };

    try {
      // Send POST request to create a new loan
      const response = await axios.post("http://127.0.0.1:8000/api/loans/", loanData);

      // After loan is created, update the book's status to "borrowed"
      const updatedBooks = books.map((book) => 
        book.id === selectedBook.id ? { ...book, status: 'Borrowed' } : book
      );
      setBooks(updatedBooks);  // Update the book list

      alert("Book issued successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error issuing book:", error);
      alert("Failed to issue book. Please try again.");
    }

    // Close the modal
    document.getElementById('issue_modal')?.close();
  };


  const handleClose = (action) => {
    if (action === "close") {
      document.getElementById('issue_modal')?.close();
    }
  };

  return (
    <dialog id="issue_modal" className="modal">
      <div className="modal-box max-w-[48%] h-[60%] px-5 py-4 flex flex-col space-y-5 bg-[#E6E6E6] rounded-lg">
        {/* 1st Col */}
        <div className="flex h-[2.75rem] justify-between">
          <p className="text-3xl font-bold text-[#28588A] italic">Issue Book</p>
          <div className="flex space-x-3 pt-1">
            <p className="text-2xl font-bold text-[#5C5C5C] italic underline">
              {`${formattedDate} - ${formattedTime}`}
            </p>
            <IoMdCalendar className="text-4xl text-[#5C5C5C]" />
          </div>
        </div>

        {/* Book Search Input */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleBookKeyPress} // Handle Enter key press for book search
          className="input w-full h-[3.5rem] text-[1.75rem] font-bold text-[#4F4F4F] drop-shadow-lg"
          placeholder="Search Book Title"
        />

        {/* Display author and rating information if a book is selected */}
        <div className="flex justify-between h-[3.75rem] space-x-5 text-[#4F4F4F] text-2xl">
          <div className="bg-[#C4D5E6] h-full w-9/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {selectedBook ? selectedBook.authors : "Book Author"}
          </div>
          <div className="bg-[#C4D5E6] h-full w-5/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {bookRating !== null ? `${bookRating} User Rating` : "Book Ratings"}
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 w-full bg-[#B6B6B6] my-2"></div>

        {/* Student Search Input */}
        <input
          type="text"
          value={studentSearchTerm}
          onChange={(e) => setStudentSearchTerm(e.target.value)}
          onKeyDown={handleStudentKeyPress} // Handle Enter key press for student search
          className="input w-full h-[3.5rem] text-[1.75rem] font-bold text-[#4F4F4F] drop-shadow-lg"
          placeholder="Search Student Name"
        />

        {/* Display selected student information */}
        <div className="flex justify-between h-[3.75rem] space-x-5 text-[#4F4F4F] text-2xl">
          <div className="bg-[#C4D5E6] h-full w-9/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {selectedStudent ? "1st Year" : "Year Level"}
          </div>
          <div className="bg-[#C4D5E6] h-full w-5/12 drop-shadow-lg rounded-lg font-bold flex items-center px-4">
            {selectedStudent ? selectedStudent.studentId : "Student ID"}
          </div>
        </div>

        {/* Buttons */}
        <div className="h-[4rem] w-full flex justify-between items-end">
          <button
            onClick={() => handleClose("close")}
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#BDBDBD] h-14 w-3/12 text-2xl text-[#525252]"
          >
            Back
          </button>
          <button
            onClick={handleIssueBook} // Create loan when clicking "Issue"
            className="btn rounded-lg drop-shadow-lg border-transparent bg-[#467DB6] h-14 w-3/12 text-2xl text-white"
          >
            Issue
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>Return</button>
      </form>
    </dialog>
  );
};

export default IssueBookModal;
