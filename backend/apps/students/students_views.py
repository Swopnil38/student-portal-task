from rest_framework import viewsets, filters
from .models import Student
from .students_serializers import StudentsCreateSerializer, StudentsListSerializer

class StudentsViewSet(viewsets.ModelViewSet):
    """Viewset for students with filtering, searching, and ordering."""
    queryset = Student.objects.select_related("teacher", "plan").all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    # Search by name and plan__name (not plan FK directly)
    search_fields = ["name", "plan__name"]
    ordering_fields = ["enrolled_date", "status"]

    def get_queryset(self):
        queryset = super().get_queryset().filter(is_deleted=False)
        teacher_id = self.request.query_params.get("teacher_id")
        if teacher_id:
            queryset = queryset.filter(teacher_id=teacher_id)
        return queryset

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return StudentsListSerializer
        return StudentsCreateSerializer
