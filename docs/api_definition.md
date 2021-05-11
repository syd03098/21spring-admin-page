### /

### /auth/info GET
  ```json
  200 OK
  "response": {
    "userid": "idid",
    "username": "임준영",
    "email": "dlawnsdud@gmail.com",
    "point": 1000,
    "isAdmin": true
  }

    or

  401 Unauthorized
  ```

### /auth/logout POST
* 성공하면 쿠키 삭제
* 성공
  ```json
  200 OK
  ```

### /auth/login POST
* 성공
  ```json
  "request": {
    "userid": "idid",
    "password": "pass"
  }

  200 OK
  "response": {
    "userid": "idid",
    "username": "임준영",
    "email": "dlawnsdud@gmail.com",
    "point": 1000,
    "isAdmin": true
  }
  ```
* 실패
  ```json
  400 Bad Request
  "response": {
    "아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다."
  }

  401 Unauthorized
  "response": {
    "비밀번호가 틀렸습니다."
  }

  404 Not Found
  "response": {
    "존재하지 않는 아이디입니다."
  }
  ```

### /auth/signup POST
* 생성하고자하는 계정의 이메일이 존재하는 이메일이면 거부, 존재하지않는 이메일이면 승인후 로그인처리(쿠키 설정)
  * 성공
  ```json
  "request": {
    "userid": "idid",
    "username": "임준영",
    "email": "dlawnsdud@gmail.com",
    "password": "1234567890"
  }

  201 Created
  "response": {
      "userid": "idid",
      "username": "임준영",
      "email": "dlawnsdud@gmail.com",
      "point": 0,
      "isAdmin": false
  }
  ```
  * 실패
  ```json
  400 Bad Request
  "response": {
    "아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다."
  }

  409 Conflict
  "response": {
    "이미 존재하는 아이디입니다."
  }
  ```

### /info/movies
* 메인페이지 영화 모음
  
  * ```
    {
      "currentTime": 현재시간, 백엔드에서 response 보낸 시간,
      "currenMovies": 현재상영중인 영화
      "preMovies": 상영예정인 영화
      ... 이후 현재 상영중, 상영예정 관계없는 장르별 영화 목록(액션, 드라마...)
    }
    ```
  
  * 성공
  ```json
  {
    "response": {
      "currentTime": "Date or Int",
      "currentMovies": [
        {
          "movieId": "0",
          "movieName": "123",
          "movieGrade": "전체이용가",
          "moviePosterUrl": "http://~~~~123.png"
        },
        {
          "movieId": "1",
          "movieName": "234",
          "movieGrade": "7세이용가",
          "moviePosterUrl": "http://~~~~234.png"
        },
        {
          "movieId": "3",
          "movieName": "345",
          "movieGrade": "12세이용가",
          "moviePosterUrl": "http://~~~~345.png"
        }
      ],
      "preMovies": [
        {
          "movieId": "5",
          "movieName": "567",
          "movieGrade": "18세이용가",
          "movieRelease": "2021-05-30",
          "moviePosterUrl": "http://~~~~567.png"
        }        
      ],
      "action": [
        {
          "movieId": "0",
          "movieName": "123",
          "movieGrade": "전체이용가",
          "moviePosterUrl": "http://~~~~123.png"
        }
      ],
      "drama": [
        {
          "movieId": "3",
          "movieName": "345",
          "movieGrade": "12세이용가",
          "moviePosterUrl": "http://~~~~345.png"
        },
        {
          "movieId": "5",
          "movieName": "567",
          "movieGrade": "18세이용가",
          "movieRelease": "2021-05-30",
          "moviePosterUrl": "http://~~~~567.png"
        }  
      ],
      ... 이후 현재 상영중, 상영예정 관계없는 장르별 영화 목록(액션, 드라마...)    
    }
  }
  ```

### /movies POST
* 성공
  ```json
  "request": {
    "movieName": "영화제목",
    "movieTime": "2:13:45",
    "movieDescription": "영화설명",
    "movieDistribute": "배급사",
    "movieRelease": "2021-05-01",
    "movieGen": 1,
    "director": "감독1, 감독2, ...",
    "actors": "배우1, 배우2, 배우3, 배우4, ...",
    "moviePosterUrl": "http://~~~~123.png",
    "movieGrade": "00",
  }

  "response":  
    201 Created
  ```
  * 실패
  ```json
  400 Bad Request
    or
  401 Unauthorized
  ```

### /movies/{movie\_id} GET
* 영화 선택시 영화정보 불러오기
  ```json
  200 OK
  "response": {
    "movieId": 42,
    "movieName": "영화영화",
    "movieTime": "2:13:45",
    "movieGrade": "12",
    "movieDistribute": "21세기폭스",
    "movieRelease": "2021-05-01",
    "showTotalCount": 3,
    "director": ["감독1", "감독2"],
    "actors": ["배우1", "배우2", "배우3"],
    "movieGen": 1,
    "moviePosterUrl": "http://~~~~123.png",
    "movieDescription": "영화설명"
  }
    or
  404 Not Found
  ```

### /movies/{movie\_id} DELETE
  ```
  204 No Content
    or
  401 Unauthorized
  ```

### /moview/{movie\_id} PATCH
* 성공
  ```json
  {
    "request": {
      "movieName": "123",
      "movieGrade": "00",
      "movieDistribute": "21세기폭스",
      "movieRelease": "2021-05-01",
      "director": "임준영",
      "actors": "임준영0, 임준영1, 임준영2, 임준영3, 임준영4, 임준영7",
      "movieGen": "액션",
      "moviePosterUrl": "http://~~~~123.png",
      "movieDescription": "임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영"
    }, 
    "response": {
      "status": true,
      "info": {
        "movieName": "123",
        "movieGrade": "00",
        "movieDistribute": "21세기폭스",
        "movieRelease": "2021-05-01",
        "director": "임준영",
        "actors": "임준영0, 임준영1, 임준영2, 임준영3, 임준영4, 임준영7",
        "movieGen": "액션",
        "moviePosterUrl": "http://~~~~123.png",
        "movieDescription": "임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영임준영"
      }
    }    
  }
  ```
* 실패
  ```json
  {
    "response": {
      "status": false
     }
  }
  ```
