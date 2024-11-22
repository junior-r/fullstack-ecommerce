from rest_framework.pagination import PageNumberPagination


class DefaultResultsSetPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 100


class SmallResultsSetPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 24
    page_size_query_param = 'page_size'
    max_page_size = 100


class HugeResultsSetPagination(PageNumberPagination):
    page_size = 32
    page_size_query_param = 'page_size'
    max_page_size = 100

