from .base import *
from apps.core.utils import get_env_var

DEBUG = False
raw_hosts = get_env_var('ALLOWED_HOSTS', default='your-production-domain.com')
ALLOWED_HOSTS = [host.strip() for host in raw_hosts.split(',') if host.strip()]
if not ALLOWED_HOSTS:
    ALLOWED_HOSTS = ['your-production-domain.com']
