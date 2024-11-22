from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from Apps.Api.serializers import MyTokenObtainPairSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GetRoutesView(APIView):
    def get(self, request):
        routes = [
            '/api/token',
            '/api/token/refresh',
        ]
        return Response(routes)
