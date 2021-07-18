from django.db.models import fields
from rest_framework import serializers
from .models import NewUser, Programme,Student
from rest_framework.authtoken.models import Token


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
class studentSerializer(serializers.ModelSerializer):
    course= serializers.StringRelatedField(many=True,read_only=True)
    program= serializers.StringRelatedField(read_only=True)
    # user= serializers.StringRelatedField(read_only=True)
    class Meta:
        model=Student
        fields = '__all__'


class programeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Programme
        fields='__all__'