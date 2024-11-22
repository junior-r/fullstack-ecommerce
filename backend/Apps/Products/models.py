import uuid

from django.db import models
from django.template.defaultfilters import slugify


class Product(models.Model):
    code = models.UUIDField(unique=True, blank=False, null=False, primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=False, null=False, unique=True, editable=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=1000)
    category = models.ForeignKey('Categories.Category', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)
