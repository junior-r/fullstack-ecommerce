from rest_framework import serializers
from Apps.Accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
