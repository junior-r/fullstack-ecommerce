# Generated by Django 5.0 on 2024-09-25 00:12

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Categories', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='code',
            field=models.UUIDField(default=uuid.uuid4, editable=False, error_messages={'blank': 'This field cannot be blank.', 'max_length': 'This field cannot exceed 100 characters.', 'null': 'This field cannot be null.', 'required': 'This field is required.', 'unique': 'This field must be unique.'}, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(error_messages={'blank': 'This field cannot be blank.', 'max_length': 'This field cannot exceed 100 characters.', 'null': 'This field cannot be null.', 'required': 'This field is required.', 'unique': 'This field must be unique.'}, max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(editable=False, error_messages={'blank': 'This field cannot be blank.', 'max_length': 'This field cannot exceed 100 characters.', 'null': 'This field cannot be null.', 'required': 'This field is required.', 'unique': 'This field must be unique.'}, max_length=255, unique=True),
        ),
    ]
