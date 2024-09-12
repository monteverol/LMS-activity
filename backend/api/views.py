from django.shortcuts import render
from .models import User, Book, Loan, Review  # Import the models
from rest_framework import generics
from .serializers import UserSerializer, BookSerializer, LoanSerializer, ReviewSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated

# User Registration View
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()  # Query the custom User model
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow anyone to create a user

# Book Views
class BookListView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access books

class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can access

# Loan Views
class LoanListView(generics.ListCreateAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can borrow books

class LoanDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    permission_classes = [IsAuthenticated]

# Review Views
class ReviewListView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]  # Only authenticated users can review books

class ReviewDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]
