from allauth.account.adapter import DefaultAccountAdapter

class DefaultAccountAdapterCustom(DefaultAccountAdapter):

     def save_user(self, request, user, form, commit=False):
        print(f'REQUEST DATA from REGISTRATION  {request}')
        print(f'USER {user}')
        print(f'FORM {form.data}')

        return super().save_user(request, user, form, commit)