import uuid

from django.db import models
from django.template.defaultfilters import slugify

from core.consts import error_messages


class Category(models.Model):
    code = models.UUIDField(unique=True, blank=False, null=False, primary_key=True, default=uuid.uuid4, editable=False,
                            error_messages=error_messages)
    name = models.CharField(max_length=255, blank=False, null=False, unique=True, error_messages=error_messages)
    slug = models.SlugField(max_length=255, blank=False, null=False, unique=True, editable=False,
                            error_messages=error_messages)
    description = models.TextField(blank=True, null=True, error_messages=error_messages, max_length=500)
    user = models.ForeignKey('Accounts.User', on_delete=models.CASCADE, blank=False, null=False,
                             error_messages=error_messages, related_name='categories')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)
