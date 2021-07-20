from django.db import models
from django.db.models import fields
from rest_framework import serializers
from course.models import course,category,Building
from rest_framework.authtoken.models import Token
from person.models import Faculty

class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model=Faculty
        fields='__all__'
class BuildingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Building
        fields='__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=category
        fields='__all__'


class CourseSerializer(serializers.ModelSerializer):
    # faculty= serializers.StringRelatedField(read_only=True)
    # building= serializers.StringRelatedField(read_only=True)
    # cat=serializers.StringRelatedField(read_only=True,many=True)
    faculty = FacultySerializer( read_only=True)
    cat = CategorySerializer(many=True, read_only=True)
    building = BuildingSerializer( read_only=True)
    class Meta:
        model=course
        fields= ('name','description','credit','faculty','cat','building','id')
        # fields = '__all__'


