from django.db import models
from django.db.models.query import ModelIterable
from django.utils import timezone
# from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from datetime import datetime

# from course.models import category


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
    
    is_staff = models.BooleanField(default=True)
    is_superuser=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_student= models.BooleanField(default=True)
    

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['user_name']
    

    def __str__(self):
        return self.email



class Programme(models.Model):
    name = models.CharField(max_length=150, unique=True)
    desc= models.TextField()
    def __str__(self) :
        return self.name



class Student(models.Model):
    user=models.OneToOneField(NewUser,on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    enr_num=models.CharField(max_length=50,unique=True)
    course=models.ManyToManyField('course.course',blank=True,null=True,related_name='courseStudentBridge')
    program=models.ForeignKey(Programme,on_delete=models.SET_NULL,null=True,blank=True)
    def __str__(self) :
        return self.name

class Faculty(models.Model):
    user=models.OneToOneField(NewUser,on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    def __str__(self) :
        return self.name


class CourseStudent(models.Model):
    course=models.ForeignKey('course.course',on_delete=models.CASCADE)
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    completed=models.BooleanField(default=False)
    rating=models.CharField(max_length=300,default=0,blank=True,null=True)
    class Meta:
        unique_together = (("course", "student"),)
    
  

class TodoData(models.Model):
    student=models.ForeignKey(Student,on_delete=models.CASCADE)
    title=models.CharField(max_length=300)
    desc=models.TextField()
    created=models.DateTimeField(auto_now_add=True )
    due_date = models.DateTimeField(default=datetime.now())
    complete = models.BooleanField(default=False)

class CreditModel(models.Model):
    program=models.ForeignKey(Programme,on_delete=models.CASCADE)
    cat=models.ForeignKey('course.category',on_delete=models.CASCADE)
    requiredCredits=models.IntegerField(default=3)
    class Meta:
        unique_together = (("program", "cat"),)