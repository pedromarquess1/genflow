from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

@api_view(['GET', 'POST'])
def task_methods(request):
    if request.method == 'GET':
        # Como não há login, traz todas as tarefas cadastradas na base de dados
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        # Cria a tarefa sem precisar associar a um owner específico por enquanto
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save() # Salva direto, já que o owner não é obrigatório nesta fase
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)