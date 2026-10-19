from rest_framework import serializers
from .models import Finance

class FinanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Finance
        fields = [
            'id',
            'title',
            'amount',
            'type',
            'category',
            'date',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']