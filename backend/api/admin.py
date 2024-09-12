from django.contrib import admin
from .models import User, Book, Loan, Review

admin.site.register(User)
admin.site.register(Book)
admin.site.register(Loan)
admin.site.register(Review)
