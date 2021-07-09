from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import NewUser
from .serializers import UserSerializer


#to create a user
class CreateUserAPIView(generics.CreateAPIView):
    authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer
