#! /usr/bin/python3

# 참고 -> https://soyoung-new-challenge.tistory.com/81
# http://bigdata.dongguk.ac.kr/lectures/DB/_book/python%EC%97%90%EC%84%9C-mysql%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%9D%98-%EC%A0%91%EA%B7%BC.html
# CORS : https://lucky516.tistory.com/108

# uvicorn main:app --reload --host=0.0.0.0 --port=8000


import uvicorn                                      # Web Server
from fastapi import FastAPI, Response               # Json Response
from fastapi.responses import HTMLResponse          # HTML Response
from fastapi.middleware.cors import CORSMiddleware  # CORS
import Logger

# import json     # json
# import pymysql  # mariadb

# _logger = Logger.Logger("UposService")
import SongBoardService  # implementation


app = FastAPI()

# CORS
origins = [
    "http://172.30.1.19"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WAS


@app.get("/")
async def welcome():
    html_content = """
    <html>
    <br/>
    <br/>
    <head>
    <title>Welcome to SongBoard Service!</title>
    <style>
    html { color-scheme: light dark; }
    body { width: 35em; margin: 0 auto;
    font-family: Tahoma, Verdana, Arial, sans-serif; }
    </style>
    </head>
    <body>
    <h1>Welcome to SongBoard Service!</h1>
    <br/>
    <p>If you see this page, the SongBoardREST web server is successfully working.</p>

    <p>For documentation and support please refer to swagger documents '.../docs'
    </a>.<br/>

    <p><em>Thank you for using SongBoard Service.</em></p>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content, status_code=200)

# SignUp #############################################################################################################################################

# 아이디 중복확인    
@app.get("/GetReadID")
async def GetReadID(UserID: str):
    result = await SongBoardService.GetReadID(UserID)
    return Response(content=result, media_type="application/json")

# 닉네임 중복확인    
@app.get("/GetReadNickName")
async def GetReadNickName(NickName: str):
    result = await SongBoardService.GetReadNickName(NickName)
    return Response(content=result, media_type="application/json")
    
# 아이디 정보 저장  
@app.get("/GetCreatID")
async def GetCreatID(UserName: str, NickName: str, UserID: str, UserPassword: str, UserEmail: str, IdCreatDatetime: str):
    result = await SongBoardService.GetCreatID(UserName, NickName, UserID, UserPassword, UserEmail, IdCreatDatetime)
    return Response(content=result, media_type="application/json")

# 아이디 정보 삭제    
@app.get("/GetDeleteID")
async def GetDeleteID(UserID: str):
    result = await SongBoardService.GetDeleteID(UserID)
    return Response(content=result, media_type="application/json")

# Login #############################################################################################################################################

# 아이디 중복확인    
@app.get("/GetLoginCheck")
async def GetLoginCheck(UserID: str):
    result = await SongBoardService.GetLoginCheck(UserID)
    return Response(content=result, media_type="application/json")

# Post #############################################################################################################################################

# 모든 게시글 조회  
@app.get("/GetAllPost")
async def GetAllPost():
    result = await SongBoardService.GetAllPost()
    return Response(content=result, media_type="application/json")

# 닉네임 조회
@app.get("/GetNickName")
async def GetNickName(UserID: str):
    result = await SongBoardService.GetNickName(UserID)
    return Response(content=result, media_type="application/json")

# 게시글 저장   
@app.get("/GetCreatPost")
async def GetCreatPost(NickName: str, UserID: str, PostTitle: str, PostContent: str, PostCreatDatetime: str):
    result = await SongBoardService.GetCreatPost(NickName, UserID, PostTitle, PostContent, PostCreatDatetime)
    return Response(content=result, media_type="application/json")

# 게시글 조회    
@app.get("/GetReadPost")
async def GetReadPost(NickName: str, PostTitle: str, PostCreatDatetime: str):
    result = await SongBoardService.GetReadPost(NickName, PostTitle, PostCreatDatetime)
    return Response(content=result, media_type="application/json")
    
# 게시글 수정    
@app.get("/GetUpdatePost")
async def GetUpdatePost(NickName: str, PostTitle: str, PostContent: str, PostCreatDatetime: str):
    result = await SongBoardService.GetUpdatePost(NickName, PostTitle, PostContent, PostCreatDatetime)
    return Response(content=result, media_type="application/json")

# 게시글 삭제   
@app.get("/GetDeletePost")
async def GetDeletePost(NickName: str, PostCreatDatetime: str):
    result = await SongBoardService.GetDeletePost(NickName, PostCreatDatetime)
    return Response(content=result, media_type="application/json")
