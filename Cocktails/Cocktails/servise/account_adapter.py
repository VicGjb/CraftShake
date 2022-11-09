from allauth.account.adapter import DefaultAccountAdapter

class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def is_open_for_signup(self, request):
        return True
        
    # def login(self, request, user):   
    #     print(f'user: {user} request{request}')

    # def get_login_redirect_url(self, request):
    #     return None