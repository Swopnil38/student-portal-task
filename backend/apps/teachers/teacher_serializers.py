from rest_framework import serializers

from .models import Teacher


class TeachersSerializer(serializers.ModelSerializer):
    """Serializer for Teacher model."""

    class Meta:
        model = Teacher
        fields = ["id", "name", "specialization"]
