# Generated by Django 5.0.7 on 2024-07-22 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetings', '0002_meeting_access_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='meeting',
            name='call_link',
            field=models.URLField(blank=True, null=True),
        ),
    ]
