import datetime

from django.db import connection

from api.model.models import (
    Usr,)


# {{{ pay
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
                f"{money}, NULL, " \
                f"TO_DATE('{now}', 'YYYY-MM-DD HH24:MI:SS') );")
        cursor.execute("SELECT PAY_SEQ.CURRVAL FROM DUAL;")
        pay_id = cursor.fetchone()[0]
        cursor.execute(
            f"UPDATE USR SET USR_POINT={point-money} WHERE USR_ID='{userId}';")

    return pay_id


def pay_cash(money, userId) -> int:
    with connection.cursor() as cursor:
        cursor.execute("INSERT INTO PAY VALUES (PAY_SEQ.NEXTVAL, 3, 1, " \
                f"{money}, NULL, NULL);")
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


# }}} pay


# {{{ cancel
def cancel_card(pay_id: int, money, userId) -> int:
    user = Usr.objects.raw(f"SELECT * FROM USR WHERE USR_ID='{userId}'")[0]
    point = user.usr_point
    # if money//10 > point:
    #     raise Exception(f"잔여 포인트가 부족하여 취소할 수 없습니다.")
    with connection.cursor() as cursor:
        point = point - money // 10
        cursor.execute(
            f"UPDATE USR SET USR_POINT={point} WHERE USR_ID='{userId}';")
    return 1


def cancel_point(pay_id: int, money, userId) -> int:
    user = Usr.objects.raw(f"SELECT * FROM USR WHERE USR_ID='{userId}'")[0]
    point = user.usr_point
    with connection.cursor() as cursor:
        cursor.execute(
            f"UPDATE USR SET USR_POINT={point+money} WHERE USR_ID='{userId}';")
    return 1


def cancel_cash(pay_id: int, money, userId) -> int:
    return 1


def cancel(pay_id: int, pay_type: int, money: int, userId: str) -> int:
    _cancel = {
        1: cancel_card,
        2: cancel_point,
        3: cancel_cash,
    }
    with connection.cursor() as cursor:
        cursor.execute(f"UPDATE PAY SET PAY_STATE=4 WHERE PAY_ID={pay_id};")
    cancel = _cancel.get(pay_type)
    return cancel(pay_id, money, userId)


# }}}
