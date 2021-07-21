from django.http import request
from django.shortcuts import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.generic.list import ListView
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication,SessionAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets

# Models
from course.models import course
from .models import NewUser, Programme,Student,TodoData


#Serializers 
from .serializers import UserSerializer, programeSerializer,studentSerializer,TodoSerializer


#to create a user
class CreateUserAPIView(generics.CreateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    queryset = NewUser.objects.all()
    serializer_class = UserSerializer
    def post(self, request, *args, **kwargs):
        # print(request.headers)

        if( request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)




class particular_student(generics.ListAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=studentSerializer
    
    def get_queryset(self):
        print(self.request.user.id)
        return (Student.objects.filter(user=self.request.user))
   
class showStudent(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=studentSerializer
    queryset=Student.objects.all()

    def get(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.destroy(request, *args, **kwargs)





class studentList(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,SessionAuthentication,]
    permission_classes=[IsAuthenticated,]
    queryset=Student.objects.all()
    serializer_class=studentSerializer
    def get(self, request, *args, **kwargs):
        
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)

        return self.list(request, *args, **kwargs)
    def post(self, request, *args, **kwargs):
        
        user = NewUser.objects.get(email=request.data["email"])
        # prog=Programme.objects.get(id=request.data["program"])
        
        
        request.data['user']=user.id
        
        
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)

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


class programmeListCreateClass(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=programeSerializer
    queryset=Programme.objects.all()
    def get(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)


#---TO DO---
class ToDoCreateList(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=TodoSerializer
    queryset=TodoData.objects.all()

class ToDoRetUpdDest(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=TodoSerializer
    queryset=TodoData.objects.all()