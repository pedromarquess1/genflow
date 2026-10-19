from rest_framework import viewsets, permissions
from .models import Finance
from .serializers import FinanceSerializer

class FinanceViewSet(viewsets.ModelViewSet):
    serializer_class = FinanceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filtra para retornar apenas as transações do utilizador autenticado
        return Finance.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Associa automaticamente a transação ao utilizador da requisição
        serializer.save(user=self.request.user)