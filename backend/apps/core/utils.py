import os
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

# Always load .env from the backend root
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(os.path.join(BACKEND_DIR, '.env'))


def get_env_var(var_name, default=None):
    value = os.environ.get(var_name, default)
    if value is None:
        error_msg = f"Set the {var_name} environment variable"
        raise ImproperlyConfigured(error_msg)
    return value
