from django.urls import path

from Apps.Accounts.API.views import UserCreateAPIView, UserRetrieveAPIView

app_name = "accounts"

urlpatterns = [
    path("register/", UserCreateAPIView.as_view(), name="register"),
    path("profile/", UserRetrieveAPIView.as_view(), name="profile"),
]
