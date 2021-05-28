import datetime

from django.db import connection

from api.model.models import (
    Usr,)


def pay_card(money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 1, 2, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
        cursor.execute(f"SELECT USR_POINT FROM USR WHERE USR_ID='{userId}';")
        point = cursor.fetchone()[0] + money // 10
        cursor.execute(
            f"UPDATE USR SET USR_POINT={point} " \
                    f"WHERE USR_ID='{userId}';")
    return pay_id


def pay_point(money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    user = Usr.objects.raw(f"SELECT * FROM USR WHERE USR_ID='{userId}'")[0]
    point = user.usr_point
    if point < money:
        raise Exception(f"포인트가 부족합니다. 잔여 포인트: {point}, 금액: {money}")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 2, 2, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
        cursor.execute(
            f"UPDATE USR SET USR_POINT={point-money} WHERE USR_ID='{userId}';")

    return pay_id


def pay_cash(money, userId) -> int:
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 3, 1, " \
                f"{money}, APRV_SEQ.NEXTVAL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
    return pay_id


def pay(pay_type: int, money: int, userId: str) -> int:
    _pay = {
        1: pay_card,
        2: pay_point,
        3: pay_cash,
    }
    pay = _pay.get(pay_type)
    if not pay:
        raise Exception(f"payType: {pay_type}은 올바르지 않은 결제 유형입니다.")
    return pay(money, userId)
