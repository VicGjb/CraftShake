import os
if os.environ.get('ENVIRONMENT') == 'local':
    print('local')
    from .settings_development import *
elif os.environ.get('ENVIRONMENT') == 'production':
    print('Prod')
    from .settings_production import *
else:
    print('LOCAL FORCE')
    from .settings_development import *