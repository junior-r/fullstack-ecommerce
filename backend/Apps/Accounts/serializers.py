from django.core.validators import FileExtensionValidator
from rest_framework import serializers
from Apps.Accounts.models import User
from core.validators import small_file_size_custom_validator


class UserSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source="get_avatar", read_only=True, validators=[
        small_file_size_custom_validator, FileExtensionValidator(['png', 'jpg', 'jpeg', 'webp'])
    ])

    class Meta:
        model = User
        exclude = ['password']


class UserCreateSerializer(serializers.ModelSerializer):
    image = serializers.FileField(validators=[
        small_file_size_custom_validator, FileExtensionValidator(['png', 'jpg', 'jpeg', 'webp'])
    ], required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'image']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
