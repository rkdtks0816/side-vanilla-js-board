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
    "*",
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

# 아이디 정보 DB 저장   
@app.get("/GetCreatID")
async def GetCreatID(UserName: str, NickName: str, UserID: str, UserPassword: str, UserEmail: str, IdCreatDatetime: str):
    result = await SongBoardService.GetCreatID(UserName, NickName, UserID, UserPassword, UserEmail, IdCreatDatetime)
    return Response(content=result, media_type="application/json")

# 아이디 중복확인    
@app.get("/GetReadID")
async def GetReadID(UserID: str):
    result = await SongBoardService.GetReadID(UserID)
    return Response(content=result, media_type="application/json")