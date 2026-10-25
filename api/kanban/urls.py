from django.urls import path
from .views import task_methods

urlpatterns = [
    path('tasks/', task_methods, name='task-methods'),
]