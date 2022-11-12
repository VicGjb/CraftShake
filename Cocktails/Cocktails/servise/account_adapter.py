from allauth.account.adapter import DefaultAccountAdapter

class DefaultAccountAdapterCustom(DefaultAccountAdapter):

    def is_open_for_signup(self, request):
        return True