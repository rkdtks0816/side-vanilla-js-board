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
        return o.strftime('%Y-%m-%d %H:%M:%S')

# DB 연동
def GetConnection():
    connection = pymysql.connect(host='10.0.2.15', port=3306, user='root', password='1234',
                                    db='db_song', charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)
    return connection

# SignUp #############################################################################################################################################

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
    return connection
    
# 닉네임 중복확인    
async def GetReadNickName(NickName: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select NickName from UserTable
                where NickName = '{NickName}';
            """

            cursor.execute(query)            
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetReadNickName('{NickName}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetReadNickName('{NickName}')'")

# 아이디 정보 저장   
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
                f"succeed to do 'GetCreatID('{UserName}', '{NickName}', '{UserID}', '{UserPassword}', '{UserEmail}', '{IdCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetCreatID('{UserName}', '{NickName}', '{UserID}', '{UserPassword}', '{UserEmail}', '{IdCreatDatetime}')'")

# 아이디 정보 삭제  
async def GetDeleteID(UserID: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                delete from UserTable where UserID = '{UserID}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetDeleteID('{UserID}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetDeleteID('{UserID}')'")

# Login #############################################################################################################################################

# 아이디 비밀번호 확인    
async def GetLoginCheck(UserID: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select UserID, UserPassword from UserTable
                where UserID = '{UserID}';
            """

            cursor.execute(query)            
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetLoginCheck('{UserID}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetLoginCheck('{UserID}')'")
    return connection

# Post #############################################################################################################################################

# 전체 게시글 조회
async def GetAllPost():
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select
                    PostTitle,
                    NickName,
                    PostCreatDatetime
                from PostTable 
                order by PostCreatDatetime desc;
            """

            cursor.execute(query)       
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, default=datetime_to_json_formatting, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetAllPost()'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetAllPost()'")

# 닉네임 조회
async def GetNickName(UserID: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select NickName from UserTable
                where UserID = '{UserID}';
            """

            cursor.execute(query)            
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetNickName('{UserID}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetNickName('{UserID}')'")

# 게시글 저장   
async def GetCreatPost(NickName: str, UserID: str, PostTitle: str, PostContent: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                INSERT INTO PostTable VALUES ( '{NickName}', '{UserID}', '{PostTitle}', '{PostContent}', '{PostCreatDatetime}' );
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetCreatPost('{NickName}', '{UserID}', '{PostTitle}', '{PostContent}', '{PostCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetCreatPost('{NickName}', '{UserID}', '{PostTitle}', '{PostContent}', '{PostCreatDatetime}')'")

# 게시글 조회
async def GetReadPost(NickName: str, PostTitle: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select
                    PostTitle,
                    NickName,
                    PostCreatDatetime,
                    PostContent
                from PostTable 
                where 
                    NickName = '{NickName}' and 
                    PostTitle = '{PostTitle}' and 
                    PostCreatDatetime = '{PostCreatDatetime}';
            """

            cursor.execute(query)       
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetReadPost('{NickName}', '{PostTitle}', '{PostCreatDatetime}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetReadPost('{NickName}', '{PostTitle}', '{PostCreatDatetime}')'")

# 게시글 수정   
async def GetUpdatePost(NickName: str, PostTitle: str, PostContent: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                UPDATE PostTable 
                SET 
                    PostTitle = '{PostTitle}', 
                    PostContent = '{PostContent}'
                WHERE
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetUpdatePost('{NickName}', '{PostTitle}', '{PostContent}', '{PostCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetUpdatePost('{NickName}', '{PostTitle}', '{PostContent}', '{PostCreatDatetime}')'")


# 게시글 삭제  
async def GetDeletePost(NickName: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                delete 
                from PostTable 
                where
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetDeletePost('{NickName}', '{PostCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetDeletePost('{NickName}', '{PostCreatDatetime}')'")