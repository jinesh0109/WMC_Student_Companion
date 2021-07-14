from django.db import models
from person.models import Faculty
# Create your models here.
class Building(models.Model):
    name=models.CharField(max_length=100)
    def __str__(self):
        return self.name

class category(models.Model):
    abbreviation=models.CharField(max_length=20)
    name=models.CharField(max_length=100)
    description=models.TextField()
    def __str__(self):
        return self.abbreviation


class course(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField()
    credit=models.IntegerField()
    faculty=models.ForeignKey(Faculty,on_delete=models.SET_NULL,null=True,blank=True)
    cat=models.ManyToManyField(category)
    building=models.ForeignKey(Building,on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    
    def get_cat(self):
        return " , ".join([p.abbreviation for p in self.cat.all()])

    

