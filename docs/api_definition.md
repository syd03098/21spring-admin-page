## * 유저 /auth

### /auth/info GET
* 200 OK
  ```json
  "response": {
    "userId": "dlawnsdud",
    "userName": "임준영",
    "email": "dlawnsdud@gmail.com",
    "tickets": 1,
    "isAdmin": true
  }
  ```
* 401 Unauthorized

* (2021.05.13)
  * point 는 화면에 안 띄울거라 필요없을거같고 지금 로그인한 유저가 예매한 티켓 개수를 보여줄거임

  * 로그인 안한 경우에는 티켓 개수를 안보여줄거고 로그인 한 경우에만 티켓개수를 보여줄 계획

    > (2021.05.13) 애내들 카멜케이스로 바꿔주삼 userid -> userId, username -> userName

### /auth/logout POST
* 성공하면 쿠키 삭제



### /auth/login POST
  ```json
  "request": {
    "userId": "dlawnsdud",
    "password": "dlawnsdud1234"
  }
  
  * 200 OK
  "response": {
    "userId": "dlawnsdud",
    "userName": "임준영",
    "email": "dlawnsdud@gmail.com",
    "tickets": 1,
    "isAdmin": true
  }
  ```

* 400 Bad Request
  ```json
  "response": {
    "아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다."
  }
  ```

* 404 Not Found
  ```json
  "response": {
    "아이디 또는 패스워드를 다시 확인해주세요." 
  }
  ```

* (2021.05.13)
  * 아이디를 틀렸는지 비밀번호를 틀렸는지 아예 힌트를 안주는게 좋을거같음

### /auth/signup POST
* 생성하고자하는 계정의 이메일이 존재하는 이메일이면 거부
* 존재하지않는 이메일이면 승인후 로그인처리, 쿠키 설정
  ```json
  "request": {
    "userId": "idid",
    "userName": "임준영",
    "email": "dlawnsdud@gmail.com",
    "password": "1234567890"
  }
  ```

  * 201 Created
  ```json
  "response": {
      "userId": "idid",
      "userName": "임준영",
      "email": "dlawnsdud@gmail.com",
      "tickets": 1,
      "isAdmin": false
  }
  ```

  * 400 Bad Request
  ```json
  "response": {
    "아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다."
  }
  ```

  * 409 Conflict
  ```json
  "response": {
    "이미 존재하는 아이디입니다."
  }
  ```

  >  (2021.05.13) 애내들 카멜케이스로 바꿔주삼 userid -> userId, username -> userName




## * 영화 /movies

### /movies GET
* 메인페이지 영화 모음, 현재 개봉한 영화, 개봉 예정 영화로 나눠서 보내주면됨
* 예매 불가능한 영화들, 즉 예약할수있는 상영일정이 없는 영화들은 불러오면 안됨.
  ```
  "currentTime": 현재시간, 백엔드에서 response 를 보낸 시간,
  "categoryName": 현재 개봉한 영화,  개봉 예정 영화
  ```

  * 200 OK
  ```json
  {
    "currentTime": 2020-05-13 21:12,
    "categorys": [
      {
        "categoryName": "현재 개봉한 영화",
        "movies": [
          {
            "movieId": 0,
            "movieName": "스파이럴",
            "movieGrade": "18",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17297_103_1.jpg"
          },
          {
            "movieId": 1,
            "movieName": "미스",
            "movieGrade": "15",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17382_103_1.jpg"
          },
          {
            "movieId": 2,
            "movieName": "아들의 이름으로",
            "movieGrade": "00",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17328_103_1.jpg"
          }
        ]
      },
      {
        "categoryName": "개봉 예정 영화",
        "movies": [
          {
            "movieId": 10,
            "movieName": "2021 스웨그 에이지: 외쳐, 조선!",
            "movieGrade": "12",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17405_103_1.jpg"
          },
          {
            "movieId": 11,
            "movieName": "스쿨 오브 락(樂)",
            "movieGrade": "12",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/202105/17397_103_1.jpg"
          },
          {
            "movieId": 12,
            "movieName": "죽여주는 여자",
            "movieGrade": "18",
            "moviePosterUrl": "https://caching.lottecinema.co.kr//Media/MovieFile/MovieImg/201610/10725_103_1.jpg"
          }
        ]
      }
    ]
  }
  ```

### /movies/{movie\_id} GET
* 메인화면에서 <영화 정보> 선택시 영화정보 불러오기
  * 200 OK
  ```json
  "response": {
    "movieId": 42,
    "movieName": "영화영화",
    "movieTime": "2:13:45",
    "movieGrade": "12",
    "movieDistribute": "21세기폭스",
    "movieRelease": "2021-05-01",
    "director": "감독1, 감독2",
    "actors": "배우1, 배우2, 배우3",
    "movieGen": 'action, drama',
    "moviePosterUrl": "http://~~~~123.png",
    "movieDescription": "영화설명"
  }
  ```

  * 404 Not Found
  * (2021-05-13)
    * showTotalCount 는 여기서는 필요없음


## * 상영 /show

### /shows?movie\_id={movie_id} GET
* 메인화면에서 <영화 예매> 선택시 예매 가능한 상영 일정 불러오기
* 영화 시작 직전까지 예매가능
  * 200 OK
  ```json
  "response": {
    "movieName": "센과 치히로의 행방불명"
    "showSchedule": [
      {
        "showDate": "5.14"
        "showList": [
          {
            "showId": 1001,
            "theaterName": "1관",
            "showStartTime": "14:10"
            "seatsInfo": "168/240"
          },
          {
            "showId": 1002,
            "theaterName": "2관",
            "showStartTime": "15:10"
            "seatsInfo": "209/212"
          },
          {
            "showId": 1003,
            "theaterName": "1관",
            "showStartTime": "16:40"
            "seatsInfo": "189/240"
          }
        ]
      },
      {
        "showDate": "5.15"
        "showList": [
          {
            "showId": 1004,
            "theaterName": "1관",
            "showStartTime": "10:20"
            "seatsInfo": "230/240"
          },
          {
            "showId": 1005,
            "theaterName": "2관",
            "showStartTime": "11:10"
            "seatsInfo": "208/212"
          },
          {
            "showId": 1006,
            "theaterName": "1관",
            "showStartTime": "13:40"
            "seatsInfo": "239/240"
          }
        ]
      }  
    ]
  
  }
  ```
  * 404 Not Found

  ```
  ```

  * (2021.05.13) THEATER 테이블에 theaterName 컬럼을 추가하던가 백엔드에서 변환해서 보내줘야할듯 (theaterName)
  * seatsInfo는  ( theater전체 좌석수 - Ticket 테이블에서 해당 showId를 갖고있는 ticket 개수 ) / (theater전체 좌석수)


### /shows/{show_id}/seats GET
* seatType: 0: 불가능한 자리, 1: 예매 가능한 자리
* theaterType: 0: 일반, 1: 아이맥스
* customerType: 1: 성인, 2: 청소년, 3: 노약자


* 200 OK
  ```json
    "response": {
      "showInfo": {
        "movieName": "센과 치히로의 행방불명",
        "movieGrade": '12',
        "showId": "1001",
        "showStartTime": "11:20",
        "showEndTime": "13:40" (showStartTime + movieTime),
        "theaterId": 1,
        "theaterName": "1관",
        "theaterCapacity": 184 (전체좌석수 - 예매불가좌석),
        "bookingCount": 95,
      },
      "seatFee": [
        {
          "customerTypeId": 10,
          "movieFee": 8000,
        },
        {
          "customerTypeId": 20,
          "movieFee": 6000,
        },
        {
          "customerTypeId": 30,
          "movieFee": 5000,
        }
      ]          
      "seats": [
        {
          "seatNo": 0
          "seatRow": 0,
          "seatColumn": 0,
          "seatType": 0,
        },
        {
          "seatNo": 1
          "seatRow": 0,
          "seatColumn": 1,
          "seatType": 2,
        }, 
        {
          "seatNo": 2
          "seatRow": 0,
          "seatColumn": 2,
          "seatType": 0,
        },
        {
          "seatNo": 3
          "seatRow": 0,
          "seatColumn": 3,
          "seatType": 0,
        },
        {
          "seatNo": 4
          "seatRow": 0,
          "seatColumn": 4,
          "seatType": 1,
        },
        {
          "seatNo": 5
          "seatRow": 0,
          "seatColumn": 5,
          "seatType": 1,
        }
      ]
    }
  ```


## * 유저 액션 /action

### /action/request_ticket POST
* 200 OK
* ```json
  {
    "showId": 1001,
    "userId": "1string",
    "email": "1string@gmail.com",
    "requestedSeat": [
      {
        "seatNo": 332,
        "customerType": 1
      },
      {
        "seatNo": 333,
        "customerType": 2
      }
    ]
  }
  ```

* 리퀘스트 성공시 포인트 차감, 예매
* 리퀘스트 실패시 거절
  * 예매할수없는 좌석 타입인데 예매를 시도했거나
  * requestedSeat 의 length 가 0이거나
  * theater 의 좌석 범위 밖의 좌석을 예매 시도
  * 알수없는 오류

### /action/cancel_ticket POST
* request
* ```json
  { 
    "userId": "1string",
    "ticketId": "2002"
  }
  ```
* 리퀘스트 성공시 포인트 되돌리기, 예매 취소
* 리퀘스트 실패시 거절
  * 없는 ticketId 거나
  * 알수없는 오류


### /action/password UPDATE
* request
* ```json
  { 
    "userId": "1string",
    "newPassword": "password"
  }
  ```


## * 유저 정보 /user

### /user/myTickets GET
* 200 OK

  *  ```json
       "response": {
          "userId": "임준영123",
          "userName": "임준영",
          "email": "임준영123@gmail.com",
          "point": 5000,
          "tickets": [
          	{
          		
          	}
          ]
       }
       ```
### /user/canceled GET
* 200 OK
  *  ```json
       "response": {
          "userId": "임준영123",
          "userName": "임준영",
          "email": "임준영123@gmail.com",
          "point": 5000, 
          "canceled": [
          	{
          		
          	}
          ]
       }
       ```