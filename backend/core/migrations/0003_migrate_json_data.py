from django.db import migrations

def migrate_json_to_fields(apps, schema_editor):
    Persona = apps.get_model('core', 'Persona')
    for persona in Persona.objects.all():
        if persona.data:
            # Update each field from the JSON data
            for field, value in persona.data.items():
                if hasattr(persona, field) and value is not None:
                    setattr(persona, field, value)
            persona.save()

def reverse_migrate_fields_to_json(apps, schema_editor):
    Persona = apps.get_model('core', 'Persona')
    persona_fields = [f.name for f in Persona._meta.get_fields()]
    
    for persona in Persona.objects.all():
        data = {}
        for field in persona_fields:
            if field not in ['id', 'author', 'data', 'is_active', 'created_at', 'updated_at']:
                value = getattr(persona, field)
                if value is not None:
                    data[field] = value
        persona.data = data
        persona.save()

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0002_add_persona_fields'),
    ]

    operations = [
        migrations.RunPython(
            migrate_json_to_fields,
            reverse_code=reverse_migrate_fields_to_json
        ),
    ]
