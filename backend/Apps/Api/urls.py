from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from Apps.Api.views import GetRoutesView, MyTokenObtainPairView

app_name = 'api'

urlpatterns = [
    path('', GetRoutesView.as_view(), name='api'),
    path("auth/", include('rest_framework.urls', namespace='rest_framework')),
    path('token/', MyTokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('accounts/', include('Apps.Accounts.API.urls', namespace='accounts')),
    path('categories/', include('Apps.Categories.API.urls', namespace='categories')),
    path('products/', include('Apps.Products.API.urls', namespace='products')),
]
