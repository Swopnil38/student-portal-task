import uuid

from django.db import models

from apps.teachers.models import Teacher


class Plan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Student(models.Model):
    """Model representing a student enrolled with a teacher."""

    class Status(models.TextChoices):
        NOT_STARTED = "not_started", "Not started"
        IN_PROGRESS = "in_progress", "In progress"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.NOT_STARTED
    )
    enrolled_date = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(
        Teacher, related_name="students", on_delete=models.CASCADE
    )
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-enrolled_date"]
        indexes = [models.Index(fields=["name", "plan", "status"])]
