import jwt

from django.conf import settings


def get_token(request):
    cookie = request.COOKIES.get('jwt')
    if not cookie:
        return None
    try:
        token = jwt.decode(cookie, settings.SECRET_KEY, settings.ALGORITHM)
    except jwt.PyJWTError:
        return None

    return token


def get_user(request):
    token = get_token(request)
    if not token:
        return None

    return token['userId']


def is_admin(request):
    token = get_token(request)
    if not token:
        return False

    return token['isAdmin']
