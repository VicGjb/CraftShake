from django.db import router
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    ReferralCodeView,
    ReferralRegistrationView,
    BlacklistTokenUpdateView,
    UserView,
    ConfigView,
    GoogleLogin
)


urlpatterns = format_suffix_patterns(
    [
        path('referral-registration/',ReferralRegistrationView.as_view({'post':'create'}), name='newUser'),
        path('referral-code/create/', ReferralCodeView.as_view({'post':'create'})),
        path('dj-rest-auth/google/',GoogleLogin.as_view(), name='google_login'),
        path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
        path('user/<int:pk>/', UserView.as_view({'get':'retrieve'})),
        path('config/<int:pk>/',ConfigView.as_view())
    ]
)