from django.urls import path
from . import views
from .views import get_csrf_token

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('get-csrf-token/', get_csrf_token, name='get-csrf-token'),

    path('recipes/', views.recipe_list, name='recipe_list'),
    path('recipes/create/', views.recipe_create, name='recipe_create'),
    path('recipes/<int:pk>/', views.recipe_retrieve, name='recipe_retrieve'),
    path('recipes/<int:pk>/update/', views.recipe_update, name='recipe_update'),
    path('recipes/<int:pk>/delete/', views.recipe_delete, name='recipe_delete'),
]
