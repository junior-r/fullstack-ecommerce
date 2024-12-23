from rest_framework.generics import CreateAPIView, RetrieveAPIView, get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated

from Apps.Accounts.models import User
from Apps.Accounts.serializers import UserSerializer, UserCreateSerializer


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = User.objects.all()
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        print(serializer.validated_data)
        return super().perform_create(serializer)


class UserRetrieveAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return get_object_or_404(User, username=self.request.user.username)

    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)
