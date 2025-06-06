from django.core.management.base import BaseCommand
from apps.teachers.models import Teacher

class Command(BaseCommand):
    help = 'Update the dummy teacher name and add specialization.'

    def add_arguments(self, parser):
        parser.add_argument('--name', type=str, required=True, help='New name for the teacher')
        parser.add_argument('--specialization', type=str, required=True, help='Specialization for the teacher')

    def handle(self, *args, **options):
        name = options['name']
        specialization = options['specialization']
        teacher = Teacher.objects.filter(name='Dummy Teacher').first()
        if teacher:
            teacher.name = name
            teacher.specialization = specialization
            teacher.save()
            self.stdout.write(self.style.SUCCESS(f'Teacher updated: {teacher.id} - {teacher.name} ({teacher.specialization})'))
        else:
            self.stdout.write(self.style.ERROR('Dummy Teacher not found.'))
