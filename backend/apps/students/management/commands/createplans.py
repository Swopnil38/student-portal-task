from django.core.management.base import BaseCommand
from apps.students.models import Plan

class Command(BaseCommand):
    help = 'Create 4 default study plans.'

    def handle(self, *args, **options):
        plans = [
            {"name": "Mathematics Foundation", "description": "Basic math concepts and problem solving."},
            {"name": "Science Explorer", "description": "Introduction to physics, chemistry, and biology."},
            {"name": "Literature & Arts", "description": "Study of classic and modern literature and arts."},
            {"name": "Technology Basics", "description": "Fundamentals of computers and technology."},
        ]
        created = 0
        for plan in plans:
            obj, was_created = Plan.objects.get_or_create(name=plan["name"], defaults={"description": plan["description"]})
            if was_created:
                created += 1
                self.stdout.write(self.style.SUCCESS(f'Created plan: {obj.name}'))
            else:
                self.stdout.write(self.style.WARNING(f'Plan already exists: {obj.name}'))
        self.stdout.write(self.style.SUCCESS(f'Total new plans created: {created}'))
