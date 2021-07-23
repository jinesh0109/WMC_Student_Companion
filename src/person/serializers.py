from django.db.models import fields
from rest_framework import serializers
from .models import Faculty, NewUser, Programme,Student,TodoData,CourseStudent
from rest_framework.authtoken.models import Token
from course.serializers import CourseSerializer

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = NewUser
        fields = ( 'email','password')
    def create(self, validated_data):
        User = super(UserSerializer, self).create(validated_data)
        User.set_password(validated_data['password'])
        User.save()
        Token.objects.create(user=User)
        return User

class programeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Programme
        fields='__all__'
class studentSerializer(serializers.ModelSerializer):
    course=CourseSerializer(many=True,read_only=True)
    program= serializers.StringRelatedField(read_only=True)
    # program= programeSerializer(read_only=True)
    # user= serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Student
        fields = '__all__'

class TodoSerializer(serializers.ModelSerializer):
    # due_date = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model=TodoData
        fields = '__all__'

class courseStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseStudent
        fields = '__all__'