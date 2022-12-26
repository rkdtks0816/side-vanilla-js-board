#! /usr/bin/python3

import datetime
import json     # json
import pymysql  # mariadb
import Logger

from datetime import datetime, date

_logger = Logger.Logger("SongBoardService")

# json dumps시 dict내용의 datatime클래스를 formatting string타입으로 바꿈
def datetime_to_json_formatting(o):
    if isinstance(o, (date, datetime)):
        return o.strftime('%Y%m%d%H%M%S')
def datetime_to_json_formatting_daily(o):
    if isinstance(o, (date, datetime)):
        return o.strftime('%Y%m%d')
def datetime_to_json_formatting_hour(o):
    if isinstance(o, (date, datetime)):
        return o.strftime('%Y%m%d%H')

#############################################################################################################################################

def GetConnection():
    connection = pymysql.connect(host='10.0.2.15', port=3306, user='root', password='1234',
                                    db='db_song', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    return connection

# 아이디 정보 DB 저장   
async def GetCreatID(UserName: str, NickName: str, UserID: str, UserPassword: str, UserEmail: str, IdCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                INSERT INTO UserTable VALUES ( '{UserName}', '{NickName}', '{UserID}', '{UserPassword}', '{UserEmail}', '{IdCreatDatetime}' );
            """

            cursor.execute(query)
            connection.commit()
            _logger.Info(
                f"succeed to do 'GetCreatIDTable('{UserName}', '{NickName}', '{UserID}', '{UserPassword}', '{UserEmail}', '{IdCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetCreatIDTable('{UserName}', '{NickName}', '{UserID}', '{UserPassword}', '{UserEmail}', '{IdCreatDatetime}')'")

# 아이디 중복확인    
async def GetReadID(UserID: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select UserID from UserTable
                where UserID = '{UserID}';
            """

            cursor.execute(query)            
            
            rv = cursor.fetchall()

            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetReadID('{UserID}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetReadID('{UserID}')'")