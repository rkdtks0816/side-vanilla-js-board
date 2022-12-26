import os
import datetime
import logging
from logging.handlers import RotatingFileHandler

_appName = None

# 참조 -->https://ourcstory.tistory.com/97


class Logger(object):
    def __init__(self, *args):
        self.logger = None
        self.BuildLogger(args)

    def BuildLogger(self, args):
        global _appName
        # 로그 생성
        appName = args[0]
        _appName = appName
        logger_dir = "./logs"

        # Monitoring용 log file
        logger_run_file_name = f"{appName}.run.log"

        now = datetime.datetime.now().strftime('%Y-%m-%d')
        # Logging용 Log 파일
        logger_file_name = f'{appName}.{now}.log'
        if not os.path.exists(logger_dir):
            os.mkdir(logger_dir)

        self.logger = logging.getLogger(name=appName)

        # 로그의 출력 기준 설정
        self.logger.setLevel(logging.DEBUG)

        # log 출력 형식
        formatter = logging.Formatter(
            '%(asctime)s | %(name)s | %(levelname)s | %(message)s')
        # formatter.datefmt = '%Y-%m-%d, %H:%M:%S'
        # fomatter = logging.Formatter('[%(levelname)s|%(filename)s:%(lineno)s] %(asctime)s > %(message)s')

        # log 출력
        stream_handler = logging.StreamHandler()
        stream_handler.setFormatter(formatter)

        # log를 파일에 출력
        file_max_bytes = 10 * 1024 * 1024  # file max size를 10MB로 설정
        file_backup_count = 10  # Backup 갯수 10개까지
        file_handler = RotatingFileHandler(os.path.join(logger_dir, logger_file_name), mode='a', maxBytes=file_max_bytes,
                                           backupCount=file_backup_count)
        file_handler.setFormatter(formatter)

        # log를 모니터링파일에 출력
        file_run_handler = RotatingFileHandler(os.path.join(logger_dir, logger_run_file_name), mode='a', maxBytes=1024*1024,  # file max size를 1MB로 설정
                                               backupCount=1  # Backup 갯수 1개까지
                                               )
        file_run_handler.setFormatter(formatter)

        self.logger.addHandler(stream_handler)
        self.logger.addHandler(file_run_handler)
        self.logger.addHandler(file_handler)

    def GetLogger(self):
        return self.logger

    def Debug(self, message):
        self.logger.debug(message)

    def Info(self, message):
        self.logger.info(message)

    def Warning(self, message):
        self.logger.warning(message)

    def Error(self, message):
        self.logger.error(message)

    def Critical(self, message):
        self.logger.critical(message)

    def Print(self, message):
        global _appName
        curDateTime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S,%f")[:-3]
        print(f"{curDateTime} | {_appName} | PRINT | {message}")

        pass

    def __del__(self):
        pass
