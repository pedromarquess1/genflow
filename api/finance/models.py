from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Finance(models.Model):
    class TypeChoices(models.TextChoices):
        ENTRADA = 'INCOME', 'Entrada'
        SAIDA = 'EXPENSE', 'Saída'

    class CategoryChoices(models.TextChoices):
        SALARIO = 'SALARY', 'Salário'
        LAZER = 'LEISURE', 'Lazer'
        INVESTIMENTO = 'INVEST', 'Investimento'
        MENSALIDADE = 'MONTHLY', 'Mensalidade'
        OUTROS = 'OTHERS', 'Outros'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="finance")
    title = models.CharField(max_length=150)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=7, choices=TypeChoices.choices, default=TypeChoices.SAIDA)
    category = models.CharField(max_length=15, choices=CategoryChoices.choices, default=CategoryChoices.OUTROS)
    date = models.DateField(default=timezone.now)
    created_at = models.DateTimeField(auto_now_add=True)