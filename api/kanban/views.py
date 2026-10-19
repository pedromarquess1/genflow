from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Garante que o usuário logado só enxergue as próprias tarefas
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Associa automaticamente a tarefa ao usuário que fez a requisição
        serializer.save(owner=self.request.user)