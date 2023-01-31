import os
# from dotenv import load_dotenv
# load_dotenv()
if os.environ.get('ENVIRONMENT') == 'local':
    print('local')
    from .settings_development import *
elif os.environ.get('ENVIRONMENT') == 'production':
    print('Prod')
    from .settings_production import *
