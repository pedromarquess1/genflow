from django.contrib import admin
from django.urls import path
from core.views import status_project

urlpatterns = [
    path("admin/", admin.site.urls),
    path("status/", status_project, name='status')
]