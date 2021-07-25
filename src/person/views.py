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
from .models import CourseStudent, CreditModel, Faculty, NewUser, Programme,Student,TodoData


#Serializers 
from .serializers import UserSerializer, creditSerializer, programeSerializer,studentSerializer,TodoSerializer,courseStudentSerializer


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
        # print(stud_obj)
        # completedQueryset=CourseStudent.objects.filter(student=stud_obj)
        course_obj=[]
        # print('----------------')
        # print(completedQueryset)
        for i in range(len(stud_data[0]['course'])):
            # print(stud_data[0]['course'])
            stud_data[0]['course'][i]['completedCourse']=courseStudentSerializer( CourseStudent.objects.filter(student__in=stud_obj,course=stud_data[0]['course'][i]['id'])[0]).data
            totalobjData=courseStudentSerializer( CourseStudent.objects.filter(course=stud_data[0]['course'][i]['id'])[0]).data
            avgrating=0
            minus=0
            n=len(CourseStudent.objects.filter(course=stud_data[0]['course'][i]['id']))
            for j in range(len(CourseStudent.objects.filter(course=stud_data[0]['course'][i]['id']))):
                cor= courseStudentSerializer(CourseStudent.objects.filter(course=stud_data[0]['course'][i]['id'])[j]).data
                avgrating=avgrating+ int(cor['rating'])
                if(int(cor['rating'])==0):
                    minus=minus+1
            if(n-minus>0):
                avgrating=avgrating/(n-minus)
            else:
                avgrating=0
            stud_data[0]['course'][i]['completedCourse']['avgRating']=avgrating
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
        
        user = NewUser.objects.get(email=request.data['email'])
        prog=Programme.objects.get(id=request.data['program'])
        prog_data=programeSerializer(prog).data
        # print(prog_data)
        # request.data['program']=prog_data['id']
        
        request.data['user']=user
        print(request.data)
        s=Student(user=request.data['user'],name=request.data['name'],enr_num=request.data['enr_num'],
           program=prog )
        
        s.save()
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        # return self.create(request, *args, **kwargs)
        return HttpResponse('Donzo', status=202)

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
    # queryset=TodoData.objects.all().order_by('due_date')
    # def get(self, request, *args, **kwargs):
    #     student_obj=Student.objects.get(id=NewUser.objects.get(email=request.user).id)
    #     student_data=studentSerializer(student_obj).data
    #     res=TodoData.objects.filter(student=student_data.id)

    #     return Response(res)
    def get_queryset(self):
        stud_obj=Student.objects.get(user=self.request.user).id
        return (TodoData.objects.filter(student=stud_obj))
    def post(self, request, *args, **kwargs):
        title=request.data['title']
        desc=request.data['desc']
        due_date=request.data['due_date']
        # send_mail('New Task','Ok it is sent','temporary1209tp@gmail.com',[request.user])
        send_mail('Task Alert','This is your task notification email.\n\nThe following is your task detail:\nTitle:  '+title+'\n\n'
        +'This is your description:\n'+desc+'\n\n'+'Due Date: '+due_date+'\n'+
        'Complete your Task before due date.',
        'temporary1209tp@gmail.com',[request.user])
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
    queryset=CourseStudent.objects.all()
    def get(self, request, *args, **kwargs):
        user=request.user
        
        student_obj=Student.objects.get(user=NewUser.objects.get(email=user).id)
        completedCourseStudent=CourseStudent.objects.filter(student=student_obj,completed=True)
        course_obj=[]
        # print(completedCourseStudent)
        
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

class completedCourseUpdate(generics.RetrieveUpdateAPIView):
    authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    serializer_class=courseStudentSerializer
    queryset=CourseStudent.objects.all()
    def put(self, request, *args, **kwargs):
        request.data['student']=Student.objects.get(user=request.user).id
        
        return self.update(request, *args, **kwargs)

class creditDetail(generics.ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    serializer_class=creditSerializer
    queryset=CreditModel.objects.all()
    def get(self, request, *args, **kwargs):
        

        user=request.user
        stud_obj=studentSerializer( Student.objects.get(user=NewUser.objects.get(email=user).id)).data
        stud_data=stud_obj
        # print(stud_data)
        program_obj=Programme.objects.get(name=stud_obj['program'])
        
        program_data=programeSerializer(program_obj).data
        requiredcredit_obj=CreditModel.objects.filter(program=program_data['id'])
        
        
        res={}
        res['program']=program_data['name']
        cat_list=[]
        required_list=[]
        current_credit=[]
        for i in range(len(requiredcredit_obj)):
            
            requiredcredit_data=creditSerializer(requiredcredit_obj[i]).data
            cat_obj=category.objects.get(id=requiredcredit_data['cat'])
            cat_data=CategorySerializer(cat_obj).data
            
            cat_list.append(cat_data)
            
            required_list.append(requiredcredit_data['requiredCredits'])

#       Processing student completed courses            
            temp=0
            for j in range(len(stud_data['course'])):
                
                courseStudent_data=courseStudentSerializer( CourseStudent.objects.filter(student=stud_data['id'],course=stud_data['course'][j]['id'])[0]).data
                
                if(courseStudent_data['completed']==False):
                    continue
                for k in range(len(stud_data['course'][j]['cat'])):
                    
                    categ=CategorySerializer( category.objects.get(id=stud_data['course'][j]['cat'][k])).data
                    # print(categ)
                    if(categ['id']==requiredcredit_data['cat']):
                        temp=temp+stud_data['course'][j]['credit']
            current_credit.append(temp)


                


        res['cat']=cat_list
        res['requiredCredit']=required_list
        res['current_credit']=current_credit

        return Response(res)


class RatingPost(generics.UpdateAPIView):
    authentication_classes=[TokenAuthentication,]
    permission_classes=[IsAuthenticated,]
    serializer_class=courseStudentSerializer
    queryset=CourseStudent.objects.all()
    def put(self, request, *args, **kwargs):
        stud=request.user
        request.data['student']= Student.objects.get( user=NewUser.objects.get(email=stud)).id
        return self.update(request, *args, **kwargs)