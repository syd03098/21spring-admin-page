import datetime

from django.db import connection


def pay_card(request, money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 1, 2, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
    return pay_id


def pay_point(request, money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 2, 2, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
    # TODO: 포인트 차감, 포인트 부족시 예외 발생
    return pay_id


def pay_cash(request, money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 3, 1, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
    return pay_id


def pay(request, pay_type: int, money: int, userId: str) -> int:
    _pay = {
        1: pay_card,
        2: pay_point,
        3: pay_cash,
    }
    pay = _pay.get(pay_type)
    if not pay:
        raise Exception(f"payType: {pay_type}은 올바르지 않은 결제 유형입니다.")
    return pay(request, money, userId)
