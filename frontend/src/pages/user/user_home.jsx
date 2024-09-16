import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background_2.png";
import StudentHeader from "../../components/student_header";
import BH_Tile from "../../components/bh_tile";
import api from "../../api";
import { ACCESS_TOKEN } from "../../constants";
import {jwtDecode} from "jwt-decode";

const UserHome = () => {
  const [loanHistory, setLoanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/user/profile");
  };

  const handleLogoClick = () => {
    navigate("/user/home");
  };

  // Fetch current user info
  const fetchUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken); // Decode the token
      const userId = decodedToken.user_id;

      const response = await api.get(`/api/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Fetch loan history of the current user
  const fetchLoanHistory = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);

      // Fetch all loan history for the current user
      const response = await api.get("/api/loans/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const loans = response.data;

      // Loop through each loan and fetch the associated book details
      const loanHistoryWithBookData = await Promise.all(
        loans.map(async (loan) => {
          const bookResponse = await api.get(`/api/books/${loan.book}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          return {
            ...loan,
            book: bookResponse.data, // Attach the full book details to the loan
          };
        })
      );

      setLoanHistory(loanHistoryWithBookData);
    } catch (error) {
      console.error("Error fetching loan history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    fetchLoanHistory();
  }, []);

  const handleBookClick = (bookId) => {
    navigate(`/user/book-detail/${bookId}`); // Navigate to the book detail page with the book ID
  };

  console.log(userInfo);
  

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* HEADER */}
      {userInfo && (
        <StudentHeader
          logoClick={handleLogoClick}
          nameClick={handleUserClick}
          userName={`${userInfo.last_name}, ${userInfo.first_name}`}
          userImage={userInfo.image}
        />
      )}
      {/* END OF HEADER */}

      {/* CONTENT */}
      <div className="bg-[#1C528A] w-full h-full rounded-2xl shadow-md">
        {/* LIBRARY HEADER */}
        <div className="bg-[#467DB6] relative w-full h-1/6 flex flex-row items-center justify-between rounded-2xl shadow-md px-24">
          <h1 className="text-white font-bold text-3xl w-[22%]">Book Title</h1>
          <h1 className="text-white font-bold text-3xl w-[22%] text-right">
            Author Name
          </h1>
          <h1 className="text-white font-bold text-3xl w-[20%] text-right">
            Date Borrowed
          </h1>
          <h1 className="text-white font-bold text-3xl w-[14%] text-right">
            Status
          </h1>
          <h1 className="text-white font-bold text-3xl w-[24%] text-right">
            Date Returned
          </h1>
        </div>
        {/* END OF LIBRARY HEADER */}

        {/* LIBRARY CONTENT */}
        <div className="relative w-full h-5/6 flex items-center justify-center p-8">
          <div className="bg-[#E2ECF5] w-full h-full rounded-2xl py-4 px-8 overflow-y-scroll">
            {loading ? (
              <p>Loading...</p>
            ) : loanHistory.length > 0 ? (
              loanHistory.map((loan, index) => (
                <BH_Tile
                  key={index}
                  title={loan.book.title}
                  author={loan.book.author}
                  dateBorrowed={new Date(loan.borrowed_at).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                  status={loan.status === "returned" ? "Returned" : "Borrowed"}
                  dateReturned={
                    loan.returned_at
                      ? new Date(loan.returned_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"
                  }
                  onClick={() => handleBookClick(loan.book.id)} // Pass the book ID for navigation
                />
              ))
            ) : (
              <p className="text-3xl font-bold">No loan history found.</p>
            )}
          </div>
        </div>
        {/* END OF LIBRARY CONTENT */}
      </div>
      {/* END OF CONTENT */}
    </div>
  );
};

export default UserHome;
