import builtins
from django.db import connections
from django.shortcuts import render
from .serializers import BuildingSerializer, CategorySerializer, CourseSerializer, FacultySerializer
from rest_framework.generics import ListAPIView, ListCreateAPIView,RetrieveUpdateDestroyAPIView
from .models import course,category,Building
from person.models import CourseStudent, Faculty
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from person.models import Student;
from rest_framework.views import APIView


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
        res=course.objects.all()
        print(res)
        res=CourseSerializer(res,many=True).data
        print(res)

        res1=Building.objects.all()
        print(res1)
        res1=BuildingSerializer(res1,many=True).data
        print(res1)

        res2=Faculty.objects.all()
        print(res2)
        res2=FacultySerializer(res2,many=True).data
        print(res2)
        res=[res,res1,res2]
        return Response(res)
        # return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        # print(request.data)
        # print('its from view')
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        fac_obj1=Faculty.objects.get(id=request.data['faculty'])
        build_obj=Building.objects.get(id=request.data['building'])
        
        category_obj=[]
        for i in request.data['cat']:
            if(request.data['cat'][i]==True):
                # tp=category.objects.get(id=i)
                # category_obj.append(tp)
                category_obj.append(i)
        # print(category_obj)
        # l=[category_obj.id]
        
        request.data['faculty']=fac_obj1.id
        request.data['building']=build_obj.id
        request.data['cat']=category_obj

        # request.data['faculty']=fac_obj1
        # request.data['building']=build_obj
        # request.data['cat']=category_obj
        
        print(request.data)
        return self.create(request, *args, **kwargs)


class CourseRUD(RetrieveUpdateDestroyAPIView):
    # authentication_classes=[TokenAuthentication,]
    # permission_classes=[IsAuthenticated,]
    queryset=course.objects.all()
    serializer_class=CourseSerializer


    def get(self,request,pk):
        temp1=course.objects.get(id=pk).building.id
        temp2=course.objects.get(id=pk).faculty.id
        temp3=course.objects.get(id=pk)

        sertemp3 = CourseSerializer(temp3)
        # print("-------------------------------------------")
        # # print(type(sertemp3.data["cat"]))
        # print(sertemp3.data["cat"])
        
        category_obj=[]
        for i in sertemp3.data["cat"]:
            CatObj=category.objects.filter(id=i)
            CatObj1=CategorySerializer(CatObj,many=True).data
            category_obj.append(CatObj1)

        BuildingObj=Building.objects.filter(id=temp1)
        facultyObj=Faculty.objects.filter(id=temp2)
        # CatObj=category.objects.filter(id=temp3)

        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        BuildingObj=BuildingSerializer(BuildingObj,many=True).data
        facultyObj=FacultySerializer(facultyObj,many=True).data
        # CatObj=CategorySerializer(CatObj,many=True).data


        res=[BuildingObj,facultyObj,category_obj]

        return Response(res)    
        # return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        
        # course.objects.create()
        print(request.data)
        student_obj=[]
        if 'arr' in request.data: 
            cor=course.objects.get(id=request.data['id'])
            for i in request.data['arr']:
                if(request.data['arr'][i]==True):
                    stud=Student.objects.get(id=i)
                    cs=CourseStudent(course=cor,student=stud)
                    cs.save()
                    cor.courseStudentBridge.add(stud)
        else:
            course_obj=course.objects.get(id=request.data['id'])
            fac_obj1=Faculty.objects.get(id=request.data['faculty'])
            build_obj=Building.objects.get(id=request.data['building'])

            # request.data['faculty']=fac_obj1
        
            category_obj=[]
            for i in request.data['cat']:
                if(request.data['cat'][i]==True):
                    category_obj.append(i)
                    # ct_obj=category.objects.get(id=i)
                    # category_obj.append(ct_obj)
            # print(category_obj)
            # l=[category_obj.id]
            # BuildingSerializer, CategorySerializer, CourseSerializer, FacultySerializer
            request.data['faculty']=fac_obj1.id
            request.data['building']=build_obj.id
            request.data['cat']=category_obj

            # course_obj.name = request.data['name']
            # course_obj.description = request.data['description']
            # course_obj.credit = request.data['credit']
            # course_obj.faculty = request.data['faculty']
            # # course_obj.cat = request.data['cat']
            # course_obj.building = request.data['building']
            # course_obj.save()
            # print(request.data)
            # return CourseSerializer(course_obj).data

        return self.update(request, *args, **kwargs) 

    def delete(self, request, *args, **kwargs):
        if(request.user.is_student):
            return HttpResponse('Unauthorized', status=401)
        return self.destroy(request, *args, **kwargs)
                    


        
        
        
            
        

        
#         # if(request.user.is_student):
#         #     return HttpResponse('Unauthorized', status=401)
#         # fac_obj1=Faculty.objects.get(id=request.data['faculty'])
#         # build_obj=Building.objects.get(id=request.data['building'])
        
        
        
    
#     def delete(self, request, *args, **kwargs):
#         if(request.user.is_student):
#             return HttpResponse('Unauthorized', status=401)
#         return self.destroy(request, *args, **kwargs)


# class CourseRUD(APIView):
#     # authentication_classes=[TokenAuthentication,]
#     # permission_classes=[IsAuthenticated,]
#     # queryset=course.objects.all()
#     # serializer_class=CourseSerializer

#     # def get(self, request, *args, **kwargs):
#     #     # if(request.user.is_student):
#     #     #     return HttpResponse('Unauthorized', status=401)
#     #     return self.retrieve(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
        
#         # course.objects.create()
#         print(request.data)
#         student_obj=[]
    
#         fac_obj1=Faculty.objects.get(id=request.data['faculty'])
#         build_obj=Building.objects.get(id=request.data['building'])
        
    
#         category_obj=[]
#         for i in request.data['cat']:
#             if(request.data['cat'][i]==True):
#                 ct_obj=category.objects.get(id=i)
#                 category_obj.append(ct_obj)
#         # print(category_obj)
#         # l=[category_obj.id]
#         # BuildingSerializer, CategorySerializer, CourseSerializer, FacultySerializer
#         request.data['faculty']=fac_obj1
#         request.data['building']=build_obj
#         request.data['cat']=category_obj

#         crs = course.objects.get(id=request.data["id"])

#         crs.name = request.data["name"]
#         crs.description = request.data["description"]
#         crs.credit = request.data["credit"]
#         crs.faculty = fac_obj1
#         crs.building = build_obj
#         crs.cat = category_obj

#         crs.save()

#         print(request.data)
#         return Response({"success":"updated"})
                


        
        
        
            
        

        
        # if(request.user.is_student):
        #     return HttpResponse('Unauthorized', status=401)
        # fac_obj1=Faculty.objects.get(id=request.data['faculty'])
        # build_obj=Building.objects.get(id=request.data['building'])
        
        
        
    
    


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

class FacultyRetieve(RetrieveUpdateDestroyAPIView):
    authentication_classes=[TokenAuthentication,]
    #  permission_classes=[IsAuthenticated,]
    queryset=Faculty.objects.all()
    serializer_class=FacultySerializer

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
        
        

