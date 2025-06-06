from rest_framework import serializers
from apps.teachers.models import Teacher
from apps.teachers.teacher_serializers import TeachersSerializer
from .models import Student, Plan
from .plan_serializers import PlanSerializer

class StudentsListSerializer(serializers.ModelSerializer):
    teacher = TeachersSerializer(read_only=True)
    plan = PlanSerializer(read_only=True)

    class Meta:
        model = Student
        fields = ["id", "name", "plan", "status", "enrolled_date", "teacher"]

class StudentsCreateSerializer(serializers.ModelSerializer):
    teacher_id = serializers.PrimaryKeyRelatedField(
        queryset=Teacher.objects.all(), source="teacher", write_only=True
    )
    plan_id = serializers.PrimaryKeyRelatedField(
        queryset=Plan.objects.all(), source="plan", write_only=True
    )

    class Meta:
        model = Student
        fields = ["id", "name", "plan_id", "status", "enrolled_date", "teacher_id"]

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Name is required.")
        return value
