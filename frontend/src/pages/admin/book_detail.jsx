import React, { useState, useEffect, useRef } from "react";
import background from "../../assets/background_2.png";
import AdminHeader from "../../components/admin_header";
import StudentHeader from "../../components/student_header";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { GoArrowSwitch } from "react-icons/go";
import InputTile from "../../components/input_tile";
import Rating from "../../components/rating";
import ReviewTile from "../../components/review_tile";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../../api"; 
import { ACCESS_TOKEN } from "../../constants";
import { jwtDecode } from "jwt-decode"; 
import ReviewBookModal from "../../components/review_book_modal";
import EditBookModal from "../../components/edit_book_modal";
import SentimentChart from "../../components/sentiment_chart";

const BookDetail = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [bookDetails, setBookDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [toggleView, setToggleView] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [image, setImage] = useState(null); // State for book cover image
  const [previewImage, setPreviewImage] = useState(null); // State for image preview
  const fileInputRef = useRef(null); // Ref for the hidden file input

  // Determine if the route is for admin or user
  const isAdminRoute = location.pathname.includes("/admin");

  const handleUserClick = () => {
    navigate("/user/profile");
  };

  const handleLogoClick = () => {
    navigate("/user/home");
  };

  // Function to fetch logged-in user ID
  const fetchUserInfo = async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      const decodedToken = jwtDecode(accessToken); 
      setUserId(decodedToken.user_id);

      const response = await api.get(`/api/users/${decodedToken.user_id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Function to fetch book details
  const fetchBookDetails = async () => {
    try {
      const response = await api.get(`/api/books/${bookId}/`);
      setBookDetails(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  // Function to fetch reviews and user information
  const fetchBookReviews = async (bookId) => {
    try {
      const response = await api.get(`/api/reviews/?book=${bookId}`);
      const reviewsWithUser = await Promise.all(
        response.data.map(async (review) => {
          const userResponse = await api.get(`/api/users/${review.user}/`);
          return {
            ...review,
            user: userResponse.data,
          };
        })
      );

      const sortedReviews = reviewsWithUser.sort((a, b) => {
        if (a.user.id === userId) return -1;
        if (b.user.id === userId) return 1;
        return 0;
      });

      setReviews(sortedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Function to fetch sentiment analysis
  const fetchBookSentiment = async (bookId) => {
    try {
      const response = await api.get(`/api/sentiment/${bookId}/`);
      setSentiment(response.data);
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
    }
  };

  

  const handleToggleView = () => {
    setToggleView((prevState) => !prevState);
  };

  // Fetch user info, book details, reviews, and sentiment when component mounts or bookId changes
  useEffect(() => {
    fetchUserInfo();
    fetchBookDetails();
    fetchBookReviews(bookId);
    fetchBookSentiment(bookId);
  }, [bookId]);

  console.log(bookDetails);

  return (
    <>
      <EditBookModal bookDetails={bookDetails} fetchBookDetails={fetchBookDetails} />
      <ReviewBookModal bookDetails={bookDetails} reviews={reviews} fetchBookReviews={fetchBookReviews}  fetchBookSentiment={fetchBookSentiment} />
      <div
        className="relative h-screen w-screen bg-cover bg-center flex flex-col p-16 gap-16"
        style={{ backgroundImage: `url(${background})` }}
      >
        {/* Admin or User Header */}
        {isAdminRoute ? (
          <AdminHeader />
        ) : (
          <StudentHeader
            logoClick={handleLogoClick}
            nameClick={handleUserClick}
            userName={`${userInfo?.last_name}, ${userInfo?.first_name}`}
            userImage={userInfo?.image}
          />
        )}

        {/* CONTENT */}
        <div className="bg-[#AEC6DF] flex-1 w-full rounded-2xl shadow-md">
          {/* HEADER */}
          <div className="bg-[#467DB6] w-full px-8 py-4 rounded-xl shadow-md flex flex-row justify-between items-center">
            <div className="flex flex-row gap-8">
              <MdOutlineKeyboardArrowLeft
                color="white"
                size={40}
                className="cursor-pointer"
                onClick={() => navigate(-1)}
              />
              <h1 className="text-white font-bold text-3xl">
                {isAdminRoute ? "Book Details" : "Book Details"}
              </h1>
            </div>
            <div className="flex flex-row gap-8">
              {isAdminRoute && toggleView && (
                <h1
                  className="text-white font-bold text-3xl cursor-pointer hover:underline underline-offset-4"
                  onClick={() => {
                    document.getElementById("edit_modal").showModal();
                  }}
                >
                  edit
                </h1>
              )}
              {isAdminRoute && (
                <GoArrowSwitch
                  color="white"
                  size={40}
                  className="cursor-pointer"
                  onClick={handleToggleView}
                />
              )}
            </div>
          </div>
          {/* END OF HEADER */}

          {/* CONTEXT */}
          <div className="flex flex-row gap-8 w-full h-[30rem] p-8">
            {/* BOOK IMAGE */}
            <div className="flex flex-col flex-shrink-0 h-full rounded-xl shadow-md w-[27.5rem] overflow-hidden">
              <div
                className="bg-[#E2ECF5] flex items-center justify-center h-full relative cursor-pointer"
              >
                {/* IMAGE */}
                <h1 className="text-[#6D6D6D] font-bold text-4xl text-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : bookDetails?.image ? (
                    <img
                      src={bookDetails.image}
                      alt="Book Cover"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    "BOOK COVER"
                  )}
                </h1>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
              />
              {/* END OF IMAGE */}
            </div>
            {/* END OF BOOK IMAGE */}

            {/* RIGHT SIDE */}
            <div className="flex flex-col gap-8 w-full h-auto overflow-y-auto">
              {toggleView ? (
                <>
                  <InputTile
                    title="Title"
                    value={bookDetails ? bookDetails.title : "Loading..."}
                    disabled={true}
                  />
                  <div className="flex flex-row gap-8 w-full">
                    <InputTile
                      title="Author"
                      value={bookDetails ? bookDetails.author : "Loading..."}
                      disabled={true}
                    />
                    {isAdminRoute ? (
                      <div className="bg-[#E7E2D2] rounded-xl px-8 py-4 flex items-center justify-center shadow-md">
                        <Rating value={sentiment ? sentiment.average_rating : 0} />
                      </div>
                    ) : (
                      <div className="flex-col bg-[#F1F7FC] rounded-xl ">
                        <div className="bg-[#E7E2D2] rounded-xl px-8 py-4 flex items-center justify-center shadow-md">
                          <Rating value={sentiment ? sentiment.average_rating : 0} />
                        </div>
                        <div
                          className="text-[#747269] text-2xl font-bold p-2 text-center bg-transparent w-full cursor-pointer"
                          onClick={() => {
                            document.getElementById("review_modal").showModal();
                          }}
                        >
                          Write a Review
                        </div>
                      </div>
                    )}
                  </div>
                  {/* USER REVIEWS */}
                  <div className="flex flex-col gap-8">
                    <h1 className="text-[#4E5155] font-bold text-2xl">User Reviews:</h1>
                    {reviews.length > 0 ? (
                      reviews.map((review, index) => (
                        <ReviewTile
                          key={index}
                          name={
                            review.user.id === userId
                              ? "Your Review"
                              : `${review.user.first_name} ${review.user.last_name}`
                          }
                          rate={review.rating}
                          statement={review.review_text}
                        />
                      ))
                    ) : (
                      <p className="text-2xl">No reviews available.</p>
                    )}
                  </div>
                  {/* END OF USER REVIEWS */}
                </>
              ) : (
                <>
                    <div className="bg-[#DEE2E5] w-full h-full rounded-xl shadow-md flex flex-col">
                        <div className="bg-white w-full px-8 py-4 rounded-xl shadow-md">
                            <h1 className="text-[#265787] font-bold text-2xl">Sentiment Analysis Results Based on User Review:</h1>
                        </div>
                        <SentimentChart bad={sentiment?.bad.percentage} neutral={sentiment?.neutral.percentage} good={sentiment?.good.percentage} />
                    </div>
                </>
            )}
            </div>
            {/* END OF RIGHT SIDE */}
          </div>
          {/* END OF CONTEXT */}
        </div>
        {/* END OF CONTENT */}
      </div>
    </>
  );
};

export default BookDetail;
