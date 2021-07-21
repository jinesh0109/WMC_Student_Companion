import builtins
from django.shortcuts import render
from .serializers import BuildingSerializer, CategorySerializer, CourseSerializer, FacultySerializer
from rest_framework.generics import ListAPIView, ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import course,category,Building
from person.models import Faculty
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from person.models import Student;



# Create your views here.
# @csrf_exempt 
class CourseList(ListCreateAPIView):
    
    # authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    queryset=course.objects.all()
    
    serializer_class=CourseSerializer


    def get(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        print(request.data)
        print('its from view')
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        fac_obj1=Faculty.objects.get(id=request.data['faculty'])
        build_obj=Building.objects.get(id=request.data['building'])
        
        category_obj=[]
        for i in request.data['cat']:
            if(request.data['cat'][i]==True):
                category_obj.append(i)
        print(category_obj)
        # l=[category_obj.id]
        
        request.data['faculty']=fac_obj1.id
        request.data['building']=build_obj.id
        request.data['cat']=category_obj
        
        
        return self.create(request, *args, **kwargs)


class CourseRUD(RetrieveUpdateDestroyAPIView):
    # authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    queryset=course.objects.all()
    serializer_class=CourseSerializer

    def get(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        
        # course.objects.create()
        student_obj=[]
        for i in request.data['arr']:
            if(request.data['arr'][i]==True):
                stud=Student.objects.get(id=i)
                cor=course.objects.get(id=request.data['id'])
                cor.courseStudentBridge.add(stud)
        
        # request.data['courseStudentBridge']=student_obj
        # # course.objects.get(id=request.data['id']).courseStudentBridge.create()
        # .Student.add(course.objects.get(id=1))

        print(request.data)
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        # fac_obj1=Faculty.objects.get(id=request.data['faculty'])
        # build_obj=Building.objects.get(id=request.data['building'])
        
        # category_obj=[]
        # for i in request.data['cat']:
        #     if(request.data['cat'][i]==True):
        #         category_obj.append(i)
        # # print(category_obj)
        # # l=[category_obj.id]
        
        # request.data['faculty']=fac_obj1.id
        # request.data['building']=build_obj.id
        # request.data['cat']=category_obj
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.destroy(request, *args, **kwargs)


class FacultyList(ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
    #  permission_classes=[IsAuthenticated,]
    queryset=Faculty.objects.all()
    serializer_class=FacultySerializer

    def get(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)

class BuildingList(ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
     # permission_classes=[IsAuthenticated,]
    queryset=Building.objects.all()
    serializer_class=BuildingSerializer

    def get(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)

class CategoryList(ListCreateAPIView):
    authentication_classes=[TokenAuthentication,]
     # permission_classes=[IsAuthenticated,]
    queryset=category.objects.all()
    serializer_class=CategorySerializer

    def get(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        return self.create(request, *args, **kwargs)
        
        

