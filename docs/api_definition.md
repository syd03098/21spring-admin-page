### /
* /auth/validate 


### accessToken : 로그인 성공시 해당 json 을 해쉬화해서 쿠키설정
  ```json
  {
    "email": "dlawnsdud@gmail.com",
    "username": "임준영",
    "isAdmin": true
  }
  ```

### /auth/logout
* 성공하면 쿠키 삭제
* 성공
  ```json
  {
    "status": true
  }
  ```


### /auth/login 
  
  * 성공
    ```json
    {
      "request": {
        "email": "dlawnsdud@gmail.com",
        "password": "1234567890"
      }, 
      "response": {
        "result": "true",
        "info": {
          "email": "dlawnsdud@gmail.com",
          "username": "임준영",
          "isAdmin": true
        } 
      }
    }
    ```
    * 실패
    ```json
    {
      "request": {
        "email": "dlawnsdud@gmail.com",
        "password": "34534563456745"
      }, 
      "response": {
        "result": "false",
        "info": null
      }
    }
    ```

  

### /auth/create
* 생성하고자하는 계정의 이메일이 존재하는 이메일이면 거부, 존재하지않는 이메일이면 승인후 로그인처리(쿠키 설정)  
  * 성공
  ```json
  {
    "request": {
      "username": "임준영",
      "email": "dlawnsdud@gmail.com",
      "password": "1234567890"
    }, 
    "response": {
      "result": true,
      "info": {
          "email": "dlawnsdud@gmail.com",
          "username": "임준영",
          "isAdmin": true
      }
    }    
  }
  ```
  * 실패
  ```json
  {
    "request": {
      "username": "임준영",
      "email": "dlawnsdud@gmail.com",
      "password": "1234567890"
    }, 
    "response": {
      "result": "false",
      "info": null
    }
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

### /info/movie/:movieId
* 영화 선택시 영화정보 불러오기
* 성공
  ```json
  {
    "response": {
      "movieId": "0",
      "movieName": "123",
      "movieGrade": "전체이용가",
      "movieDistribute": "21세기폭스",
      "movieRelease": "2021-05-01",
      "Director": ["임준영"],
      "actors": [임준영0, 임준영1, 임준영2, 임준영3, 임준영3],
      "movieGen": "액션",
      "moviePosterUrl": "http://~~~~123.png",
      "movieDescription": "임준영임준영임준영임준영임준영임준영"
    }
  }
  ```

### /admin/getMovie
  * 성공
  ```json
  {
    "response": {
      "movies": [
        {
          "movieId": "0",
          "movieName": "123",
          "movieGrade": "전체이용가",
          "movieDistribute": "21세기폭스",
          "movieRelease": "2021-05-01",
          "Director": ["임준영"],
          "actors": [임준영0, 임준영1, 임준영2, 임준영3, 임준영3],
          "movieGen": "액션",
          "moviePosterUrl": "http://~~~~123.png",
          "movieDescription": "임준영임준영임준영임준영임준영임준영"
        },
        ...영화전체
      ]
    }    
  }
  ```

### /admin/createMovie
  * 성공
  ```json
  {
    "request": {
      "movieName": "123",
      "movieGrade": "00",
      "movieDistribute": "21세기폭스",
      "movieRelease": "2021-05-01",
      "Director": "임준영",
      "actors": "임준영0, 임준영1, 임준영2, 임준영3, 임준영3",
      "movieGen": "액션",
      "moviePosterUrl": "http://~~~~123.png",
      "movieDescription": "임준영임준영임준영임준영임준영임준영"
    }, 
    "response": {
      "status": true
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

### /admin/deleteMovie/:movieID

### /admin/updateMovie/:movieId
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
