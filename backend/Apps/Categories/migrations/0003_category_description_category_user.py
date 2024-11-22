# Generated by Django 5.0 on 2024-10-03 04:54

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Categories', '0002_alter_category_code_alter_category_name_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='description',
            field=models.TextField(blank=True, error_messages={'blank': 'This field cannot be blank.', 'max_length': 'This field cannot exceed 100 characters.', 'null': 'This field cannot be null.', 'required': 'This field is required.', 'unique': 'This field must be unique.'}, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='category',
            name='user',
            field=models.ForeignKey(default=None, error_messages={'blank': 'This field cannot be blank.', 'max_length': 'This field cannot exceed 100 characters.', 'null': 'This field cannot be null.', 'required': 'This field is required.', 'unique': 'This field must be unique.'}, on_delete=django.db.models.deletion.CASCADE, related_name='categories', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]