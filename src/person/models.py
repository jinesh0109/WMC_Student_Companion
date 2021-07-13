from django.db import models
from django.db.models.query import ModelIterable
from django.utils import timezone
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from course.models import course

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email , password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email,  password, **other_fields):

        if not email:
            raise ValueError(('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user


class NewUser(AbstractBaseUser, PermissionsMixin):
    
    email = models.EmailField(('email address'), unique=True)
    # user_name = models.CharField(max_length=150, unique=True)
    # first_name = models.CharField(max_length=150, blank=True)
    # start_date = models.DateTimeField(default=timezone.now)
    # about = models.TextField((
    #     'about'), max_length=500, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    # is_student= models.BooleanField(default=False)
    # is_faculty= models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['user_name']
    

    def __str__(self):
        return self.email

class Student(models.Model):
    user=models.OneToOneField(NewUser,on_delete=models.CASCADE)
    name = models.CharField(max_length=150, unique=True)
    enr_num=models.CharField(max_length=50,unique=True)
    course=models.ManyToManyField('course.course')
    def __str__(self) :
        return self.name

class Faculty(models.Model):
    user=models.OneToOneField(NewUser,on_delete=models.CASCADE)
    name = models.CharField(max_length=150, unique=True)
    def __str__(self) :
        return self.name
    