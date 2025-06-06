from .base import *
from apps.core.utils import get_env_var

DEBUG = True
raw_hosts = get_env_var('ALLOWED_HOSTS', default='*')
ALLOWED_HOSTS = [host.strip() for host in raw_hosts.split(',') if host.strip()]
if not ALLOWED_HOSTS:
    ALLOWED_HOSTS = ['*']
