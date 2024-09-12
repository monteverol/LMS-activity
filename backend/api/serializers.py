from rest_framework import serializers
from .models import User, Book, Loan, Review

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "role", "created_at", "student_id"]
        extra_kwargs = {
            "password": {"write_only": True},  # Make password write-only
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Book Serializer
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'publication_year', 'description', 'added_at']

# Loan Serializer
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'book', 'borrower', 'loan_date', 'return_date', 'returned']

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'book', 'reviewer', 'rating', 'comment', 'created_at']
