from django.contrib import admin
from django.urls import include, path
from api.views import CreateUserView, BookListView, BookDetailView, LoanListView, LoanDetailView, ReviewListView, ReviewDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),
    
    # User registration and authentication
    path("api/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    
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
    path("api-auth/", include("rest_framework.urls")),
]
