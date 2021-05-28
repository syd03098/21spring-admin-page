## * 유저 /auth

### /auth/validation GET
* 토큰을 보내서 토큰이 유효하면 200, 유효하지않거나 없으면 401을 보내줌
* 200 OK
* 401 Unauthorized

### /auth/logout POST
* 200 OK
* 성공하면 쿠키 삭제

### /auth/login POST
  ```json
  "request": {
    "userId": "dlawnsdud",
    "password": "dlawnsdud1234"
  }
  ```

  * 200 OK
  ```json
  "response": {
    "userId": "dlawnsdud",
    "userName": "임준영",
    "email": "dlawnsdud@gmail.com",
    "isAdmin": true
  }
  ```

  * 400 Bad Request
  ```json
  "response": {
    "아이디는 영문, 숫자, 언더바, 점만 올 수 있습니다."
  }
  ```

  * 401 Not Found
  ```json
  "response": {
    "아이디 또는 패스워드를 다시 확인해주세요." 
  }
  ```

### /auth/signup POST
* 생성하고자 하는 계정의 아이디가 존재하는 아이디이면 거부
* 존재하지 않는 아이디이면 승인후 로그인처리, 쿠키 설정
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

## * 영화 /movies

### /movies GET - 완성X
* 메인페이지 영화 모음, 현재 개봉한 영화, 개봉 예정 영화로 나눠서 보내주면됨
* 예매 불가능한 영화들, 즉 예약할수있는 상영일정이 없는 영화들은 불러오면 안됨.
  ```
  "currentTime": 현재시간, 백엔드에서 response 를 보낸 시간,
  "categoryName": 현재 개봉한 영화,  개봉 예정 영화
  ```

  * 200 OK
  ```json
  {
    "currentTime": "2020-05-13 21:12",
    "categories": [
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

### /movies POST
  * 200 OK
  ```json
  "request": {
    "movieName": "영화제목",
    "movieTime": "2:13:45",
    "movieDescription": "영화설명",
    "movieDistribute": "배급사",
    "movieRelease": "2021-05-01",
    "movieGen": "액션",
    "director": "감독1, 감독2, ...",
    "actors": "배우1, 배우2, 배우3, 배우4, ...",
    "moviePosterUrl": "http://~~~~123.png",
    "movieGrade": "00"
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
    "movieGen": "action, drama",
    "moviePosterUrl": "http://~~~~123.png",
    "movieDescription": "영화설명"
  }
  ```

  * 404 Not Found

## * 상영 /shows

### /shows?movie\_id={movie\_id} GET
* 메인화면에서 <영화 예매> 선택시 예매 가능한 상영 일정 불러오기
* 영화 시작 직전까지 예매가능
  * 200 OK
  ```json
  "response": {
    "movieName": "센과 치히로의 행방불명",
    "movieGrade": "12",
    "showSchedule": [
      {
        "showDate": "2020-05-14",
        "showList": [
          {
            "showId": 1001,
            "theaterName": "1관",
            "showStartTime": "2021-05-14 14:10",
            "seatsInfo": "168/240"
          },
          {
            "showId": 1002,
            "theaterName": "2관",
            "showStartTime": "2021-05-14 15:10",
            "seatsInfo": "209/212"
          },
          {
            "showId": 1003,
            "theaterName": "1관",
            "showStartTime": "2021-05-14 16:40",
            "seatsInfo": "189/240"
          }
        ]
      },
      {
        "showDate": "2020-5-15",
        "showList": [
          {
            "showId": 1004,
            "theaterName": "1관",
            "showStartTime": "2021-05-15 10:20",
            "seatsInfo": "230/240"
          },
          {
            "showId": 1005,
            "theaterName": "2관",
            "showStartTime": "2021-05-15 11:10",
            "seatsInfo": "208/212"
          },
          {
            "showId": 1006,
            "theaterName": "1관",
            "showStartTime": "2021-05-15 13:40",
            "seatsInfo": "239/240"
          }
        ]
      }
    ]
  }
  ```
  * 404 Not Found

### /shows POST
* ```json
  {
    "movieId": 4,
    "theaterId": 1,
    "showStartTime": "2021-05-03 12:34:00"
  }
  ```
* 권한이 없을시 403
* 존재하지 않는 영화, 상영관이거나 상영시간이 겹칠시 400
* 상영일정 추가 성공시 201 Created

### /shows/{show\_id}/seats GET
* seatType: 0: 불가능한 자리, 1: 예매 가능한 자리, 2: 이미 예매된 자리
* theaterType: 1: 일반, 2: 아이맥스
* customerType: 1: 성인, 2: 청소년, 3: 노약자
* seats: row별로 2차원 배열로 반환


* 200 OK
  ```json
    "response": {
      "showInfo": {
        "movieName": "센과 치히로의 행방불명",
        "movieGrade": "12",
        "showId": 1001,
        "showStartTime": "2021-05-01 11:20:00",
        "showEndTime": "2021-05-01 13:40:00",
        "theaterId": 1,
        "theaterName": "1관",
        "theaterCapacity": 184,
        "bookingCount": 95
      },
      "seatFee": [
        {
          "customerTypeId": 1,
          "movieFee": 8000
        },
        {
          "customerTypeId": 2,
          "movieFee": 6000
        },
        {
          "customerTypeId": 3,
          "movieFee": 5000
        }
      ],
      "seats": [
        [
          {
            "seatNo": 0,
            "seatRow": 0,
            "seatColumn": 0,
            "seatType": 0
          },
          {
            "seatNo": 1,
            "seatRow": 0,
            "seatColumn": 1,
            "seatType": 2
          },
        ],
        [
          {
            "seatNo": 2,
            "seatRow": 1,
            "seatColumn": 0,
            "seatType": 1
          },
          {
            "seatNo": 3,
            "seatRow": 1,
            "seatColumn": 1,
            "seatType": 1
          }
        ]
      ]
    }
  ```

### /shows/{show\_id}/seats POST

* ```json
  {
    "email": "user@mail.com (비회원 전용, 회원은 생략 가능)",
    "password": "passwd (비회원 전용, 회원은 생략 가능)",
    "payType": 1,
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

* 요청 성공시 결제 방식에 따라 결제하고 예매
* 요청 실패시 거절
  * 예매할수없는 좌석 타입인데 예매를 시도했거나
  * requestedSeat 의 length 가 0이거나
  * theater 의 좌석 범위 밖의 좌석을 예매 시도
  * 알수없는 오류


## * 유저 정보 /user
### /user/point GET
  * 쿠키를 보내서 쿠키가 valid 하면 사용자의 포인트를 읽어옴
  * 200 OK
  ```json
  "response": {
    "point": 4000
  }
  ```

### /user/profile GET
   * 회원인경우
  ```json
  {
    "userId": "dlawnsdud",
    "userName": "임준영",
    "email": "dlawnsdud@gmail.com",
  }
  ```

### /user/tickets?count GET
  * 회원인경우
  ```json
  "response": {
    "count": 3
  }
  ```

### /user/tickets GET
  * 회원인경우
  ```json
  {
     "tickets": [
        {
           "payId": 353948,
           "payState": "1: 진행중, 2: 성공, 3: 실패 (INTEGER)",
           "theaterName": "8관",
           "movieName": "센과 치히로의 행방불명",
           "showStartTime": "2021-05-21 14:20:00",
           "showCount": 3,
           "seatsList": [
              {
                 "seatRow": 8,
                 "seatCol": 8,
                 "customerType": 1
              },
              {
                 "seatRow": 8,
                 "seatCol": 9,
                 "customerType": 2
              }
           ],
           "payDate": "2021-05-18 12:51:48",
           "payPrice": 14000
        }
     ],
     "canceled": [
        {
           "payId": 353940,
           "payState": "4: 취소, 5: 관리자가 취소 (INTEGER)",
           "theaterName": "5관",
           "movieName": "이웃집 토토로",
           "showStartTime": "2021-05-21 11:50:00",
           "showCount": 2,
           "seatsList": [
              {
                 "seatRow": 8,
                 "seatCol": 8,
                 "customerType": 1
              },
              {
                 "seatRow": 8,
                 "seatCol": 9,
                 "customerType": 2
              }
           ],
           "payDate": "2021-05-18 11:48:21",
           "payPrice": 14000
        }
     ]
  }
  ```

### /user/tickets?email={email} GET
  * 비회원인경우
  ```json  
  {
    "email":"dlawnsdud@gmail.com",
    "tickets":[
      {
         "payId": 353948,
         "payState": "1: 진행중, 2: 성공, 3: 실패 (INTEGER)",
         "theaterName": "8관",
         "movieName": "센과 치히로의 행방불명",
         "showStartTime": "2021-05-21 14:20:00",
         "showCount": 3,
         "seatsList": [
            {
               "seatRow": 8,
               "seatCol": 8,
               "customerType": 1
            },
            {
               "seatRow": 8,
               "seatCol": 9,
               "customerType": 2
            }
         ],
         "payDate": "2021-05-18 12:51:48",
         "payPrice": 14000
      }
    ],
    "canceled":[
      {
         "payId": 353940,
         "payState": "4: 취소, 5: 관리자가 취소 (INTEGER)",
         "theaterName": "5관",
         "movieName": "이웃집 토토로",
         "showStartTime": "2021-05-21 11:50:00",
         "showCount": 2,
         "seatsList": [
            {
               "seatRow": 8,
               "seatCol": 8,
               "customerType": 1
            },
            {
               "seatRow": 8,
               "seatCol": 9,
               "customerType": 2
            }
         ],
         "payDate": "2021-05-18 11:48:21",
         "payPrice": 14000
      }
    ]
  }
  ```

### /user/password POST
  * 비밀번호 업데이트
  ```json
  "request": {
    "password": "현재비밀번호",
    "newPassword": "password"
  }
  ```

### /user/tickets/{ticket\_id} DELETE

* 리퀘스트 성공시 예매 취소
* 리퀘스트 실패시 거절
  * 없는 ticketId 거나
  * 유저가 예매한 티켓이 아니거나
  * 알수없는 오류
