import os
from base64 import b64encode, b64decode
from Crypto.Cipher import AES
from Crypto.Hash import MD5
from Crypto.Util.Padding import pad, unpad

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'secrets.json Encryption/Decryption'
    origin = os.path.join(settings.BASE_DIR, 'server/secrets.json')
    encrypted = os.path.join(settings.BASE_DIR, 'server/secrets.json.~')

    def add_arguments(self, parser):
        parser.add_argument('-E',
                            '--encrypt',
                            action='store_true',
                            dest='encrypt')
        parser.add_argument('-D',
                            '--decrypt',
                            action='store_true',
                            dest='decrypt')
        return super().add_arguments(parser)

    def handle(self, *args, **options):
        encrypt = options.get('encrypt', None)
        decrypt = options.get('decrypt', None)

        if encrypt and decrypt:
            raise CommandError('암호화, 복호화를 동시에 실행할 수 없습니다.')
        if not (encrypt or decrypt):
            raise CommandError('사용법: ./manage.py makesecrets -E(--encrypt) '\
                    'or -D(--decrypt)')

        if encrypt:
            self._encrypt()
        if decrypt:
            self._decrypt()

    def _encrypt(self):
        try:
            with open(self.origin) as f:
                secrets = f.read()
        except FileNotFoundError:
            raise CommandError("'secrets.json'이 존재하지 않습니다.")
        key = input("비밀번호를 입력해 주세요: ")
        cipher = AES.new(MD5.new(data=key.encode()).digest(),
                         AES.MODE_CBC,
                         IV=b'0123456789abcdef')
        ciphertext = cipher.encrypt(pad(secrets.encode(), AES.block_size))
        try:
            with open(self.encrypted, 'wb') as f:
                f.write(ciphertext)
            print("암호화 완료")
        except Exception as e:
            print(e)

    def _decrypt(self):
        try:
            with open(self.encrypted, 'rb') as f:
                e_secrets = f.read()
        except FileNotFoundError:
            raise CommandError("'secrets.json.~'이 존재하지 않습니다.")
        key = input("비밀번호를 입력해 주세요: ")
        cipher = AES.new(MD5.new(data=key.encode('utf8')).digest(),
                         AES.MODE_CBC,
                         IV=b'0123456789abcdef')
        decrypted = unpad(cipher.decrypt(e_secrets), AES.block_size)
        try:
            with open(self.origin, 'w') as f:
                f.write(decrypted.decode())
            print("복호화 완료")
        except Exception as e:
            print(e)
