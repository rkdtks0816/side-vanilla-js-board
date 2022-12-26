-- 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `db_song`;
USE `db_song`;

CREATE TABLE IF NOT EXISTS `UserTable` (
`UserName` varchar(50) DEFAULT NULL,
`NickName` varchar(50) DEFAULT NULL,
`UserID` varchar(50) DEFAULT NULL,
`UserPassword` varchar(50) DEFAULT NULL,
`UserEmail` varchar(50) DEFAULT NULL,
`IdCreatDatetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS `PostTable` (
`NickName` varchar(50) DEFAULT NULL,
`UserID` varchar(50) DEFAULT NULL,
`PostTitle` varchar(50) DEFAULT NULL,
`PostContent` varchar(500) DEFAULT NULL,
`PostCreatDatetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;