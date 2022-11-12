from django.db import router
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    BlacklistTokenUpdateView,
    UserView,
)


urlpatterns = format_suffix_patterns(
    [
        path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
        path('user/<int:pk>/', UserView.as_view({'get':'retrieve'})),
    ]
)