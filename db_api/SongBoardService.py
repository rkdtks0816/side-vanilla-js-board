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
    connection = pymysql.connect(host='125.191.175.102', port=3306, user='root', password='1234',
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
async def GetReadPost(NickName: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select
                    PostContent
                from PostTable 
                where 
                    NickName = '{NickName}' and 
                    PostCreatDatetime = '{PostCreatDatetime}';
            """

            cursor.execute(query)       
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetReadPost('{NickName}', '{PostCreatDatetime}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetReadPost('{NickName}', '{PostCreatDatetime}')'")

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

# Comment #############################################################################################################################################

# 전체 댓글 조회
async def GetAllComment(NickName: str, PostCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select
                    CommentNickName,
                    CommentContent,
                    CommentCreatDatetime
                from CommentTable 
                where
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}'
                order by CommentCreatDatetime desc;
            """

            cursor.execute(query)       
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, default=datetime_to_json_formatting, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetAllComment('{NickName}', '{PostCreatDatetime}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetAllComment('{NickName}', '{PostCreatDatetime}')'")

# 댓글 저장   
async def GetCreatComment(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentContent: str, CommentCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                INSERT INTO CommentTable VALUES ( '{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentContent}', '{CommentCreatDatetime}' );
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetCreatComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentContent}', '{CommentCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetCreatComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentContent}', '{CommentCreatDatetime}')'")

# 댓글 수정   
async def GetUpdateComment(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentContent: str, CommentCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                UPDATE CommentTable 
                SET  
                    CommentContent = '{CommentContent}'
                WHERE
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}' and
                    CommentNickName = '{CommentNickName}' and
                    CommentCreatDatetime = '{CommentCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetUpdateComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentContent}', '{CommentCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetUpdateComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentContent}', '{CommentCreatDatetime}')'")


# 댓글 삭제  
async def GetDeleteComment(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                delete 
                from CommentTable 
                where
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}' and
                    CommentNickName = '{CommentNickName}' and
                    CommentCreatDatetime = '{CommentCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetDeleteComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetDeleteComment('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}')'")

# Reply #############################################################################################################################################

# 전체 답글 조회
async def GetAllReply(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                select
                    ReplyNickName,
                    ReplyContent,
                    ReplyCreatDatetime
                from ReplyTable 
                where
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}' and
                    CommentNickName = '{CommentNickName}' and
                    CommentCreatDatetime = '{CommentCreatDatetime}'
                order by ReplyCreatDatetime desc;
            """

            cursor.execute(query)       
            
            rv = cursor.fetchall()
            json_data = json.dumps(rv, default=datetime_to_json_formatting, indent=4)
            
            _logger.Info(
                f"succeed to do 'GetAllReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}')'")
            
            return json_data

    except Exception as ex:
        _logger.Info(f"error to do 'GetAllReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}')'")

# 답글 저장   
async def GetCreatReply(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentCreatDatetime: str, ReplyNickName: str, ReplyContent: str, ReplyCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                INSERT INTO ReplyTable VALUES ( '{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyContent}', '{ReplyCreatDatetime}' );
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetCreatReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyContent}', '{ReplyCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetCreatReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyContent}', '{ReplyCreatDatetime}')'")

# 답글 수정   
async def GetUpdateReply(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentCreatDatetime: str, ReplyNickName: str, ReplyContent: str, ReplyCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                UPDATE ReplyTable 
                SET  
                    ReplyContent = '{ReplyContent}'
                WHERE
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}' and
                    CommentNickName = '{CommentNickName}' and
                    CommentCreatDatetime = '{CommentCreatDatetime}' and
                    ReplyNickName = '{ReplyNickName}' and
                    ReplyCreatDatetime = '{ReplyCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetUpdateReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyContent}', '{ReplyCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetUpdateReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyContent}', '{ReplyCreatDatetime}')'")


# 답글 삭제  
async def GetDeleteReply(NickName: str, PostCreatDatetime: str, CommentNickName: str, CommentCreatDatetime: str, ReplyNickName: str, ReplyCreatDatetime: str):
    try:
        connection = GetConnection()

        with connection.cursor() as cursor:
            query = f"""
                delete 
                from ReplyTable 
                where
                    NickName = '{NickName}' and
                    PostCreatDatetime = '{PostCreatDatetime}' and
                    CommentNickName = '{CommentNickName}' and
                    CommentCreatDatetime = '{CommentCreatDatetime}' and
                    ReplyNickName = '{ReplyNickName}' and
                    ReplyCreatDatetime = '{ReplyCreatDatetime}';
            """

            cursor.execute(query)

            connection.commit()

            _logger.Info(
                f"succeed to do 'GetDeleteReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyCreatDatetime}')'")

    except Exception as ex:
        _logger.Info(f"error to do 'GetDeleteReply('{NickName}', '{PostCreatDatetime}', '{CommentNickName}', '{CommentCreatDatetime}', '{ReplyNickName}', '{ReplyCreatDatetime}')'")