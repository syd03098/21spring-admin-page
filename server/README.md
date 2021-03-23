## 가상환경 설정

```sh
$ pip3 install virtualenv
$ virtualenv -p $(which python3.8) venv
$ source venv/bin/activate
  or
  . activate
(venv)$ pip install -r requirements.txt
(venv)$ ./manage.py migrate
```

## 프로젝트 실행

```sh
$ source venv/bin/activate
(venv)$ ./manage.py runserver <port>
```

포트번호 미설정시 기본 포트번호 8000으로 실행
sqlplus 디렉토리 $HOME/bin/instantclient_21_1

## API 명세 확인

[Swagger](http://localhost:8000/swagger/)  
[ReDoc](http://localhost:8000/redoc/)
