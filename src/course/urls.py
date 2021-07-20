from django.urls import path, include
from .views import CourseList,FacultyList,BuildingList,CategoryList,CourseRUD
from django.conf.urls.static import static
from django.conf import settings
# from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    # path('auth/', (include('rest_framework.urls', namespace='rest_framework'))),
    # path('token',obtain_auth_token),
    
    # path('course_register/',CreateUserAPIView.as_view()),
    path('course_list/',CourseList.as_view()),
    path('course_list/<int:pk>/',CourseRUD.as_view()),
    # path('course_list/<int:pk>/',CourseRUD),
    path('building_list/',BuildingList.as_view()),
    path('faculty_list/',FacultyList.as_view()),
    path('category_list/',CategoryList.as_view()),
    
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)