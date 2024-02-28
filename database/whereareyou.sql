-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        11.4.0-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- studyjwt 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `studyjwt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `studyjwt`;

-- 테이블 studyjwt.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `board_no` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_no` bigint(20) NOT NULL,
  `board_title` varchar(50) NOT NULL,
  `board_desc` varchar(500) NOT NULL,
  `board_like` bigint(20) NOT NULL DEFAULT 0,
  `board_reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `board_upd_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`board_no`),
  KEY `FK1_user_id` (`user_no`) USING BTREE,
  CONSTRAINT `FK1_user_id` FOREIGN KEY (`user_no`) REFERENCES `user` (`NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='맛집추천 게시판\r\n';

-- 테이블 데이터 studyjwt.board:~0 rows (대략적) 내보내기
DELETE FROM `board`;

-- 테이블 studyjwt.board_images 구조 내보내기
CREATE TABLE IF NOT EXISTS `board_images` (
  `board_no` bigint(20) NOT NULL,
  `board_origin_image_name` varchar(50) NOT NULL,
  `board_save_image_name` varchar(50) NOT NULL,
  `board_save_image_size` bigint(20) NOT NULL,
  KEY `FK1_board_no` (`board_no`),
  CONSTRAINT `FK1_board_no` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시물 이미지 테이블\r\n';

-- 테이블 데이터 studyjwt.board_images:~0 rows (대략적) 내보내기
DELETE FROM `board_images`;

-- 테이블 studyjwt.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `NO` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(100) NOT NULL,
  `USER_PW` varchar(200) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `EMAIL` varchar(200) NOT NULL,
  `REG_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPD_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `ENABLED` bigint(20) NOT NULL DEFAULT 1,
  PRIMARY KEY (`NO`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원';

-- 테이블 데이터 studyjwt.user:~2 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`NO`, `USER_ID`, `USER_PW`, `NAME`, `EMAIL`, `REG_DATE`, `UPD_DATE`, `ENABLED`) VALUES
	(1, 'user', '$2a$10$3wSx25hIDcyfRPpDI/O4veUHL4OOqdP1qoqzTo5fBGLl6unCFkfz6', 'user', 'user@naver.com', '2024-02-21 02:40:34', '2024-02-21 02:40:34', 1),
	(2, 'admin', '$2a$10$OnxnnnmF7IEHllVVDKnQqenOYXFZHmnxWNXv3hU2lSrJgoLvDLyPi', '관리자', 'admin@gmail.com', '2024-02-21 02:40:39', '2024-02-21 02:40:39', 1);

-- 테이블 studyjwt.user_auth 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_auth` (
  `auth_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `auth` varchar(100) NOT NULL,
  PRIMARY KEY (`auth_no`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 studyjwt.user_auth:~7 rows (대략적) 내보내기
DELETE FROM `user_auth`;
INSERT INTO `user_auth` (`auth_no`, `user_id`, `auth`) VALUES
	(1, 'user', 'ROLE_USER'),
	(2, 'admin', 'ROLE_USER'),
	(3, 'admin', 'ROLE_ADMIN'),
	(6, 'test1', 'ROLE_USER'),
	(7, 'test2', 'ROLE_USER'),
	(8, 'test3', 'ROLE_USER'),
	(9, 'test4', 'ROLE_USER');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
