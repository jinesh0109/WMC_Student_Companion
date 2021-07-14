from django.http import request
from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic.list import ListView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import NewUser,Student
from .serializers import UserSerializer,studentSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response



# generics.CreateAPIView,ListView,generics.RetrieveAPIView,generics.RetrieveDestroyAPIView

#to create a user
class CreateUserAPIView(generics.CreateAPIView):
    authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer
class particular_student(generics.ListAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=studentSerializer
    # def get_queryset(self):
    #     return self.queryset.annotate(
    #         course_name='name'
    #     )
    def get_queryset(self):
        print('(-------)')    
        print(self.request.user.id)
        return Student.objects.filter(user=self.request.user)
   





class studentList(generics.ListAPIView):
    authentication_classes=[TokenAuthentication,]
    queryset=Student.objects.all()
    serializer_class=studentSerializer


class getUserDetailFromAuth(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
            'token': token.key,
            'email':user.email,
            'is_student':user.is_student
            
        })
