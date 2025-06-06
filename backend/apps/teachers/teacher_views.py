from rest_framework import viewsets
from .models import Teacher
from .teacher_serializers import TeachersSerializer

class TeachersViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only viewset for teachers."""
    queryset = Teacher.objects.all()
    serializer_class = TeachersSerializer
