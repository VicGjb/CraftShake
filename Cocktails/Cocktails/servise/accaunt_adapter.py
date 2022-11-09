# from allauth.account.adapter import DefaultAccountAdapter

# class DefaultAccountAdapterCustom(DefaultAccountAdapter):

#     def is_open_for_signup(self, request):
#         print(f'SESSION: {request.session}')
#         return True
        
#     def login(self, request, user):       
#         print(f'REQUEST {request.session}')
        # try:
        #     del request.sessions
        # except:
        #     print(f'REQUEST EXEPT {request.session}')

    # def get_login_redirect_url(self, request):
    #     return None