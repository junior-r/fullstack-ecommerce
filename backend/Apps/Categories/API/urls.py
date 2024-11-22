from django.urls import path

from Apps.Categories.API.views import CategoryListAPIView, CategoryCreateAPIView, CategoryDeleteAPIView

app_name = 'categories'

urlpatterns = [
    path('', CategoryListAPIView.as_view(), name='list-category'),
    path('create/', CategoryCreateAPIView.as_view(), name='create-category'),
    path('delete/<uuid:pk>/', CategoryDeleteAPIView.as_view(), name='delete-category'),
]
