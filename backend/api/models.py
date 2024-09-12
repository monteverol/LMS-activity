from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings  # To reference the User model


# User model definition
class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('librarian', 'Librarian'),
    )

    role = models.CharField(max_length=100, choices=ROLE_CHOICES, default='student')  # role matching VARCHAR2(100)
    created_at = models.DateTimeField(auto_now_add=True)  # created_at matches the diagram

    @property
    def student_id(self):
        # Only generate student_id if the user is a student
        if self.role == 'student':
            # Get the year of creation
            year = self.created_at.strftime("%Y")
            # Get the count of students created before this one in the same year
            student_count = User.objects.filter(role='student', created_at__year=self.created_at.year).count()
            # Generate the student_id in the format YYYY followed by a 3-digit number
            return f'{year}{student_count + 1:03d}'  # Example: 2024001
        return None


# Book model definition
class Book(models.Model):
    title = models.CharField(max_length=100)  # title matches VARCHAR2(100)
    author = models.CharField(max_length=255)  # author matches VARCHAR2(255)
    added_at = models.DateTimeField(auto_now_add=True)  # added_at matches the diagram

    def __str__(self):
        return self.title


# Loan model definition
class Loan(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ForeignKey to User
    book = models.ForeignKey(Book, on_delete=models.CASCADE)  # ForeignKey to Book
    borrowed_at = models.DateTimeField(auto_now_add=True)  # borrowed_at matches diagram
    returned_at = models.DateTimeField(blank=True, null=True)  # returned_at matches diagram
    status = models.CharField(max_length=100)  # status (open, returned) as VARCHAR2(100)

    def __str__(self):
        return f"Loan {self.id}: {self.user.username} borrowed {self.book.title}"


# Review model definition
class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # ForeignKey to User
    book = models.ForeignKey(Book, on_delete=models.CASCADE)  # ForeignKey to Book
    rating = models.IntegerField()  # Rating as INT(5) (between 1 and 5)
    review_text = models.TextField(blank=True, null=True)  # review_text matches diagram
    created_at = models.DateTimeField(auto_now_add=True)  # created_at matches the diagram

    def __str__(self):
        return f"Review {self.id} by {self.user.username} for {self.book.title}"
