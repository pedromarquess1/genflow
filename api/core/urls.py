from django.urls import path, include
from core.views import status_project

urlpatterns = [
    path("status/", status_project, name='status'),
    path("kanban/", include('kanban.urls')),
    path("finance/", include('finance.urls')),
]