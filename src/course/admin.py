from django.contrib import admin
from .models import Building,category,course
# Register your models here.
admin.site.register(Building)
@admin.register(category)
class AuthAdminCat(admin.ModelAdmin):
    list_display=('abbreviation','name')
    
@admin.register(course)
class AuthAdminCourse(admin.ModelAdmin):
    list_display=('name','get_cat','faculty','credit','building')

# admin.site.register(category)
# admin.site.register(course)