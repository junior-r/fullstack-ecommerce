import os

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_image_path(instance, filename):
    image_name = 'Users/{0}/Images/Profile/{1}'.format(instance.username.capitalize(), filename)
    full_path = os.path.join(settings.MEDIA_ROOT, image_name)
    if os.path.exists(full_path):
        os.remove(full_path)

    return image_name


class User(AbstractUser):
    image = models.FileField(upload_to=user_directory_image_path, null=True, blank=True)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'password']

    def __str__(self):
        return self.email

    def get_avatar(self):
        if self.image:
            return self.image.url
        return ""
