import uuid

from django.db import models


class Teacher(models.Model):
    """Model representing a teacher."""

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    specialization = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name
