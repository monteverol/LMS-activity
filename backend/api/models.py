from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  # To reference the User model

# User model definition
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('librarian', 'Librarian'),
    )
    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='student')
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='users/', blank=True, null=True)  # Image field for user profile picture

    @property
    def student_id(self):
        if self.role == 'student':
            year = self.created_at.strftime("%Y")
            student_number = f'{self.pk:04d}'
            return f'{year}{student_number}'  # Example: 20240001
        return None

# Book model definition
class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=255)
    added_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='books/', blank=True, null=True)
    is_borrowed = models.BooleanField(default=False)  # New field to track if the book is borrowed

    def __str__(self):
        return self.title

# Loan model definition
class Loan(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('returned', 'Returned'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ForeignKey to User (borrower)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)  # ForeignKey to Book
    borrowed_at = models.DateTimeField(auto_now_add=True)  # Date when the book is borrowed
    returned_at = models.DateTimeField(blank=True, null=True)  # Date when the book is returned
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='open')  # Loan status

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.status == 'open':
            self.book.is_borrowed = True  # Mark book as borrowed
        elif self.status == 'returned':
            self.book.is_borrowed = False  # Mark book as available
        self.book.save()  # Save the book's updated status

    def __str__(self):
        return f"Loan {self.id}: {self.user.username} borrowed {self.book.title}"


# Review model definition
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ForeignKey to User
    book = models.ForeignKey(Book, on_delete=models.CASCADE)  # ForeignKey to Book
    rating = models.IntegerField()  # Rating as INT(5) (between 1 and 5)
    review_text = models.TextField(blank=True, null=True)  # review_text for optional review comments
    created_at = models.DateTimeField(auto_now_add=True)  # Date when the review was created

    def __str__(self):
        return f"Review {self.id} by {self.user.username} for {self.book.title}"
