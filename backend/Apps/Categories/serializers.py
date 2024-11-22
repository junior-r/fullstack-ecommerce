from rest_framework import serializers

from Apps.Categories.models import Category


class CategorySerializer(serializers.ModelSerializer):
    pk = serializers.UUIDField(source='code', read_only=True)
    name = serializers.CharField(max_length=100, read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Category
        fields = ['pk', 'name', "description", 'created_at', 'updated_at', 'user']
        extra_kwargs = {
            'user': {'read_only': True}
        }


class CategoryCreateSerializer(serializers.ModelSerializer):
    pk = serializers.UUIDField(source='code', read_only=True, required=False)
    name = serializers.CharField(max_length=100, read_only=False, required=True)
    description = serializers.CharField(max_length=500, read_only=False, required=False)
    created_at = serializers.DateTimeField(read_only=True, required=False)
    updated_at = serializers.DateTimeField(read_only=True, required=False)

    class Meta:
        fields = ['pk', 'name', "description", 'created_at', 'updated_at']
        model = Category
