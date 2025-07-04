from django.db import models
from django.contrib.auth.models import User

class Recipe(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes') 
    title = models.CharField(max_length=100)
    ingredients = models.TextField()
    steps = models.TextField()
    image = models.ImageField(upload_to='recipe_images/', null=True, blank=True)
    category = models.CharField(max_length=10, choices=[
        ('veg', 'Vegetarian'),
        ('nonveg', 'Non-Vegetarian'),
        ('dessert', 'Dessert'),
    ])
    tried = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
