from django.urls import path
from .views import task_methods, task_detail

urlpatterns = [
    path('tasks/', task_methods, name='task-methods'),
    path('tasks/<int:task_id>/', task_detail, name='task-detail'),
]