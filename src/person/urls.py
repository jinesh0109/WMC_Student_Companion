from django.urls import path, include
from .views import CreateUserAPIView,studentList,particular_student
from django.conf.urls.static import static
from django.conf import settings
# from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('auth/', (include('rest_framework.urls', namespace='rest_framework'))),
    path('token',obtain_auth_token),
    path('register',CreateUserAPIView.as_view()),
    path('students/',studentList.as_view()),
    # path('student/<int:pk>/',particular_student.as_view()),
    path('student/profile/',particular_student.as_view()),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)