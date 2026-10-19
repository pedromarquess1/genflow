from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Task(models.Model):
    class StatusChoice(models.TextChoices):
        FAZER = 'TODO', 'Pendente'
        FAZENDO = 'PROGRESS', 'Em Andamento'
        FEITO = 'DONE', 'Concluída'

    class PriorityChoice(models.TextChoices):
        BAIXA = 'LOW', 'Baixa'
        MEDIA = 'MEDIUM', 'Média'
        ALTA = 'HIGH', 'Alta'


    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=15, choices=StatusChoice.choices, default=StatusChoice.FAZER)
    priority = models.CharField(max_length=10, choices=PriorityChoice.choices ,default=PriorityChoice.MEDIA)  
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title