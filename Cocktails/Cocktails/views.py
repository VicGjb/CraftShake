from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView


class GoogleLogin(SocialLoginView): # if you want to use Authorization Code Grant, use this
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://127.0.0.1:3000/get_code'
    client_class = OAuth2Client

    # def process_login(self):
    #     print(f'SELFFF', dir(self.request))
    #     print(f'Self  {self.request.query_params}')
