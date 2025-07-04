from django.db import models

CATEGORY_CHOICES = [
    ('veg', 'Vegetarian'),
    ('nonveg', 'Non-Vegetarian'),
    ('dessert', 'Dessert'),
]

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    ingredients = models.TextField()
    steps = models.TextField()
    image = models.ImageField(upload_to='recipe_images/', null=True, blank=True)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES)
    tried = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title