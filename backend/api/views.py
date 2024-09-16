from django.shortcuts import render
from django.db.models import Q
from .models import User, Book, Loan, Review  # Import the models
from .serializers import UserSerializer, BookSerializer, LoanSerializer, ReviewSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

# Download the VADER lexicon (if not done already)
nltk.download('vader_lexicon')

# Initialize the Sentiment Intensity Analyzer (SIA)
sia = SentimentIntensityAnalyzer()

# User List and Create View (CRUD for users)
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()  # Query all users
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow authenticated users to create users, and anyone to list users

# List all students only
class StudentListView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Adjust permission as needed

    def get_queryset(self):
        return User.objects.filter(role='student')

# Retrieve, Update, and Delete User View
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed
    parser_classes = [MultiPartParser, FormParser]  # To handle image uploads

    def perform_update(self, serializer):
        serializer.save()

# Book List View with search functionality
class BookListView(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Optionally restricts the returned books to a search query,
        by filtering against the 'search' parameter in the URL.
        """
        queryset = Book.objects.all()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            queryset = queryset.filter(title__icontains=search_query)
        return queryset

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [AllowAny]  # Only authenticated users can access

# Loan Views
class LoanListView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        """
        Optionally filters the loans by the current user, book title, and status.
        """
        queryset = Loan.objects.all()
        user_id = self.request.user.id  # Get the ID of the logged-in user
        book_title = self.request.query_params.get('book_title', None)
        status = self.request.query_params.get('status', None)
        
        # Filter loans by the logged-in user
        if user_id:
            queryset = queryset.filter(user__id=user_id)

        if book_title:
            # Filter loans where the book title matches (case insensitive)
            queryset = queryset.filter(book__title__icontains=book_title)

        if status:
            # Filter loans by status if provided
            queryset = queryset.filter(status=status)
            
        return queryset


class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [AllowAny]

# Review Views
class ReviewListView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Review.objects.all()
        book_id = self.request.query_params.get('book', None)  # Get the book ID from query params
        if book_id:
            queryset = queryset.filter(book_id=book_id)  # Filter reviews by the book ID
        return queryset

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class SentimentAnalysisView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, book_id):
        # Retrieve all reviews for the book
        reviews = Review.objects.filter(book__id=book_id)
        total_reviews = reviews.count()

        # Initialize counters for sentiment categories
        bad_count = 0
        neutral_count = 0
        good_count = 0
        total_rating = 0

        # Sum up the ratings and analyze sentiments
        for review in reviews:
            total_rating += review.rating  # Add the rating to the total

            sentiment_score = sia.polarity_scores(review.review_text)
            if sentiment_score['compound'] >= 0.05:
                good_count += 1
            elif sentiment_score['compound'] <= -0.05:
                bad_count += 1
            else:
                neutral_count += 1

        # Calculate percentages for sentiment categories
        if total_reviews > 0:
            bad_percentage = (bad_count / total_reviews) * 100
            neutral_percentage = (neutral_count / total_reviews) * 100
            good_percentage = (good_count / total_reviews) * 100
        else:
            bad_percentage = neutral_percentage = good_percentage = 0

        # Calculate the average rating based on review ratings
        if total_reviews > 0:
            average_rating = total_rating / total_reviews  # Average based on actual ratings
        else:
            average_rating = 0

        # Prepare the response data
        response_data = {
            "total_reviews": total_reviews,
            "bad": {"count": bad_count, "percentage": round(bad_percentage, 2)},
            "neutral": {"count": neutral_count, "percentage": round(neutral_percentage, 2)},
            "good": {"count": good_count, "percentage": round(good_percentage, 2)},
            "average_rating": round(average_rating, 2),  # Average rating from review data
        }

        return Response(response_data)
