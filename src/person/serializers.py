from rest_framework import serializers
from .models import NewUser
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
