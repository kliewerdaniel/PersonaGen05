from django.db import migrations

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0003_migrate_json_data'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='persona',
            name='data',
        ),
    ]
