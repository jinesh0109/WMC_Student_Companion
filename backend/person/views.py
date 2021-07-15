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
from .models import NewUser,Student
from .serializers import UserSerializer,studentSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets
from course.models import course

# generics.CreateAPIView,ListView,generics.RetrieveAPIView,generics.RetrieveDestroyAPIView

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
    # def get_queryset(self):
    #     return self.queryset.annotate(
    #         course_name='name'
    #     )
    def get_queryset(self):
        print('(-------)')    
        print(self.request.user.id)
        return Student.objects.filter(user=self.request.user)
   





# class studentList(generics.ListCreateAPIView):
#     authentication_classes=[TokenAuthentication,SessionAuthentication,]
#     permission_classes=[IsAuthenticated,]
#     queryset=Student.objects.all()
#     # serializer_class=studentSerializer
#     def get(self, request, *args, **kwargs):
#         serializer_class=studentSerializer
#         if(request.user.is_student):
#             return HttpResponse('Unauthorized', status=401)

#         return self.list(request, *args, **kwargs)
#     def post(self, request, *args, **kwargs):
        
#         user = NewUser.objects.get(email=request.data["email"])
#         # print(user)
#         serializer_class1=studentSerializer(data=request.data)
        
#         print(request.data)
#         if serializer_class1.is_valid():
#             serializer_class1.save()

#         if(request.user.is_student):
#             return HttpResponse('Unauthorized', status=401)
#         return self.create(request, *args, **kwargs)

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
        course1=course.objects.all()
        request.data['user']=user.id
        request.data['course']=course1
        
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
