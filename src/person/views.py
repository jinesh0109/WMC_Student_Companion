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

from django.db.models import DateTimeField
from django.db.models.functions import Trunc
from django.core.mail import send_mail


# Models
from course.models import Building, category, course
from course.serializers import BuildingSerializer, CategorySerializer, CourseSerializer, FacultySerializer
from .models import CourseStudent, Faculty, NewUser, Programme,Student,TodoData


#Serializers 
from .serializers import UserSerializer, programeSerializer,studentSerializer,TodoSerializer,courseStudentSerializer


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
        return (Student.objects.filter(user=self.request.user))
        
    def get(self, request, *args, **kwargs):
        stud_obj=Student.objects.filter(user=self.request.user)
        stud_data=studentSerializer(stud_obj,many=True).data
        course_obj=[]
        for i in range(len(stud_data[0]['course'])):
            stud_data[0]['course'][i]['faculty']=FacultySerializer( Faculty.objects.get(id=stud_data[0]['course'][i]['faculty'])).data
            stud_data[0]['course'][i]['building']=BuildingSerializer( Building.objects.get(id=stud_data[0]['course'][i]['building'])).data
            cat=[]
            for j in range(len(stud_data[0]['course'][i]['cat'])):
                cat.append(CategorySerializer( category.objects.get(id=stud_data[0]['course'][i]['cat'][j])).data)
            stud_data[0]['course'][i]['cat']=cat
        return Response(stud_data)
   
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
    queryset=TodoData.objects.all().order_by('due_date')
    
    
    def post(self, request, *args, **kwargs):
        
        send_mail('New Task','Ok it is sent','temporary1209tp@gmail.com',[request.user])
        request.data['student']=Student.objects.get(user=NewUser.objects.get(email= request.user)).id
        print(request.data)
        return self.create(request, *args, **kwargs)

class ToDoRetUpdDest(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=TodoSerializer
    queryset=TodoData.objects.all()
    def put(self, request, *args, **kwargs):
        request.data['student']=Student.objects.get(user=NewUser.objects.get(email= request.user)).id
        print(request.data)
        return self.update(request, *args, **kwargs)


class completedCourse(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=courseStudentSerializer
    queryset=TodoData.objects.all()
    def get(self, request, *args, **kwargs):
        user=request.user
        
        student_obj=Student.objects.get(user=NewUser.objects.get(email=user).id)
        completedCourseStudent=CourseStudent.objects.filter(student=student_obj,completed=True)
        course_obj=[]
        print(completedCourseStudent)
        
        for i in range(len(completedCourseStudent)):
            dicMain={'course':''}
            dic={'course':''}
            courseSingleObj=completedCourseStudent[i].course
            tp=CourseSerializer(courseSingleObj).data
            dic=tp
            dic['faculty']=FacultySerializer( Faculty.objects.get(id=tp['faculty'])).data
            dic['building']=BuildingSerializer( Building.objects.get(id=tp['building'])).data
            # dicMain['course']=dic
            course_obj.append(dic)
            
        dicMain={'course':course_obj}
        return Response(dicMain)
        

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)