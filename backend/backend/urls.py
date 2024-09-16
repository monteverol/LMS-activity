from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from api.views import (
    SentimentAnalysisView, StudentListView, UserListCreateView, UserRetrieveUpdateDestroyView,
    BookListView, BookDetailView, LoanListView, LoanDetailView, ReviewListView, ReviewDetailView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # User CRUD API
    path("api/users/", UserListCreateView.as_view(), name="user-list-create"),  # List all users and create new user
    path("api/users/<int:pk>/", UserRetrieveUpdateDestroyView.as_view(), name="user-retrieve-update-destroy"),  # Retrieve, update, and delete a user by ID
    path('api/students/', StudentListView.as_view(), name='student-list'),  # Add this line for students
    
    # Books API
    path("api/books/", BookListView.as_view(), name="book-list"),
    path("api/books/<int:pk>/", BookDetailView.as_view(), name="book-detail"),
    
    # Loans API
    path("api/loans/", LoanListView.as_view(), name="loan-list"),
    path("api/loans/<int:pk>/", LoanDetailView.as_view(), name="loan-detail"),
    
    # Reviews API
    path("api/reviews/", ReviewListView.as_view(), name="review-list"),
    path("api/reviews/<int:pk>/", ReviewDetailView.as_view(), name="review-detail"),
    
    # API Authentication
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    
    # Sentiment API
    path('api/sentiment/<int:book_id>/', SentimentAnalysisView.as_view(), name='sentiment-analysis'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)