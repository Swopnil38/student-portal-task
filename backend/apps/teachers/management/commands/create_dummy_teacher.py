from django.core.management.base import BaseCommand
from apps.teachers.models import Teacher

class Command(BaseCommand):
    help = 'Create a dummy teacher for testing.'

    def handle(self, *args, **options):
        teacher, created = Teacher.objects.get_or_create(
            name='Dummy Teacher'
        )
        if created:
            self.stdout.write(self.style.SUCCESS(f'Dummy teacher created: {teacher.id} - {teacher.name}'))
        else:
            self.stdout.write(self.style.WARNING(f'Dummy teacher already exists: {teacher.id} - {teacher.name}'))
