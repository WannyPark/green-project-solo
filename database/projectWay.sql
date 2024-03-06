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
  `board_loc1` varchar(50) NOT NULL,
  `board_loc2` varchar(50) NOT NULL,
  `board_like` bigint(20) NOT NULL DEFAULT 0,
  `board_origin_image_name` varchar(50) DEFAULT NULL,
  `board_save_image_name` varchar(50) DEFAULT NULL,
  `board_save_image_ext` varchar(50) DEFAULT NULL,
  `board_save_image_size` bigint(20) DEFAULT NULL,
  `board_reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `board_upd_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`board_no`),
  KEY `FK1_user_id` (`user_no`) USING BTREE,
  CONSTRAINT `FK1_user_id` FOREIGN KEY (`user_no`) REFERENCES `user` (`NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='맛집추천 게시판\r\n';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 studyjwt.board_images 구조 내보내기
CREATE TABLE IF NOT EXISTS `board_images` (
  `board_no` bigint(20) NOT NULL,
  `board_origin_image_name` varchar(50) NOT NULL,
  `board_save_image_name` varchar(50) NOT NULL,
  `board_save_image_ext` varchar(50) NOT NULL,
  `board_save_image_size` bigint(20) NOT NULL,
  KEY `FK1_board_no` (`board_no`),
  CONSTRAINT `FK1_board_no` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='게시물 이미지 테이블\r\n';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 studyjwt.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `NO` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` varchar(100) NOT NULL,
  `USER_PW` varchar(200) NOT NULL,
  `NAME` varchar(100) NOT NULL,
  `EMAIL` varchar(200) DEFAULT NULL,
  `REG_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `UPD_DATE` timestamp NOT NULL DEFAULT current_timestamp(),
  `ENABLED` int(11) DEFAULT 1,
  PRIMARY KEY (`NO`),
  UNIQUE KEY `USER_ID` (`USER_ID`),
  UNIQUE KEY `NAME` (`NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='회원';

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 studyjwt.user_auth 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_auth` (
  `auth_no` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `auth` varchar(100) NOT NULL,
  PRIMARY KEY (`auth_no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 내보낼 데이터가 선택되어 있지 않습니다.

-- 테이블 studyjwt.user_like_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_like_board` (
  `user_no` bigint(20) NOT NULL,
  `board_no` bigint(20) NOT NULL,
  KEY `user_no` (`user_no`),
  KEY `board_no` (`board_no`),
  CONSTRAINT `board_no` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='좋아요 누른 게시물\r\n';

-- 내보낼 데이터가 선택되어 있지 않습니다.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
