from rest_framework import serializers
from .models import User, Book, Loan, Review


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    image = serializers.ImageField(required=False)  # Image field for user image

    class Meta:
        model = User
        fields = ["id", "username", "password", "role", "created_at", "student_id", "first_name", "last_name", "name", "image"]
        # extra_kwargs = {
        #     "password": {"write_only": True},
        # }

    def get_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Book Serializer
class BookSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)  # Image field for book cover

    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'added_at', 'is_borrowed', 'image']  # Include is_borrowed directly



# Loan Serializer
class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ['id', 'book', 'user', 'borrowed_at', 'returned_at', 'status']

# Review Serializer
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'book', 'user', 'rating', 'review_text', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']  # Make 'user' read-only

    def create(self, validated_data):
        # Automatically set the logged-in user when creating a review
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
