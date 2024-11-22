from django.contrib.auth.mixins import PermissionRequiredMixin
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny, DjangoModelPermissions

from Apps.Categories.models import Category
from Apps.Categories.serializers import CategoryCreateSerializer, CategorySerializer


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all().order_by('-created_at')
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class CategoryCreateAPIView(CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def perform_create(self, serializer):
        if serializer.is_valid():
            return serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class CategoryDeleteAPIView(DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated, DjangoModelPermissions]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)
