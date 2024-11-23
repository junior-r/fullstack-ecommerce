from django.core.exceptions import ValidationError


def small_file_size_custom_validator(value):
    limit = 1 * 1024 * 1024  # 1MB
    if value.size > limit:
        raise ValidationError('Archivo demasiado grande. El tamaño máximo permitido es de 1MB.')
    return value


def file_size_custom_validator(value):
    limit = 2 * 1024 * 1024  # 2MB
    if value.size > limit:
        raise ValidationError('Archivo demasiado grande. El tamaño máximo permitido es de 2MB.')
    return value


def large_file_size_custom_validator(value):
    limit = 5 * 1024 * 1024  # 5MB
    if value.size > limit:
        raise ValidationError('Archivo demasiado grande. El tamaño máximo permitido es de 5MB.')
    return value
