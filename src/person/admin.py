from django.contrib import admin

from .models import NewUser,Faculty, Programme,Student
# Register your models here.
@admin.register(NewUser)
class AdminShow(admin.ModelAdmin):
    exclude=['is_active']
 

# admin.site.register(NewUser)
admin.site.register(Faculty)
admin.site.register(Student)
admin.site.register(Programme)