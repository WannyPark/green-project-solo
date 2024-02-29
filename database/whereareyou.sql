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
  `board_reg_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `board_upd_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`board_no`),
  KEY `FK1_user_id` (`user_no`) USING BTREE,
  CONSTRAINT `FK1_user_id` FOREIGN KEY (`user_no`) REFERENCES `user` (`NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='맛집추천 게시판\r\n';

-- 테이블 데이터 studyjwt.board:~16 rows (대략적) 내보내기
DELETE FROM `board`;
INSERT INTO `board` (`board_no`, `user_no`, `board_title`, `board_desc`, `board_loc1`, `board_loc2`, `board_like`, `board_reg_date`, `board_upd_date`) VALUES
	(1, 1, '맛집1', '이곳은 맛집1 입니다.', '경상남도', '김해시', 0, '2024-02-29 03:52:12', '2024-02-29 03:52:12'),
	(2, 1, '맛집2', '이곳은 맛집2 입니다.', '서울특별시', '강남구', 0, '2024-02-29 04:32:05', '2024-02-29 04:32:05'),
	(3, 1, '맛집3', '이곳은 맛집3 입니다.', '서울특별시', '강남구', 0, '2024-02-29 04:32:41', '2024-02-29 04:32:41'),
	(4, 1, '맛집4', '이곳은 맛집4 입니다.', '서울특별시', '강남구', 0, '2024-02-29 04:33:25', '2024-02-29 04:33:25'),
	(5, 1, '맛집5', '이곳은 맛집5 입니다.', '서울특별시', '강남구', 0, '2024-02-29 04:34:43', '2024-02-29 04:34:43'),
	(6, 1, '맛집6', '이곳은 맛집6 입니다.', '부산광역시', '강서구', 0, '2024-02-29 04:36:17', '2024-02-29 04:36:17'),
	(7, 1, '맛집7', '이곳은 맛집7 입니다.', '부산광역시', '강서구', 0, '2024-02-29 04:37:40', '2024-02-29 04:37:40'),
	(8, 1, '맛집8', '이곳은 맛집8 입니다.', '인천광역시', '계양구', 0, '2024-02-29 04:38:34', '2024-02-29 04:38:34'),
	(9, 1, '맛집9', '이곳은 맛집9 입니다.', '울산광역시', '남구', 0, '2024-02-29 05:10:18', '2024-02-29 05:10:18'),
	(10, 1, '맛집10', '이곳은 맛집10 입니다.', '전라남도', '광양시', 0, '2024-02-29 07:40:50', '2024-02-29 07:40:50'),
	(11, 1, '맛집11', '이곳은 맛집11 입니다.', '인천광역시', '계양구', 0, '2024-02-29 08:05:45', '2024-02-29 08:05:45'),
	(12, 1, '맛집11', '이곳은 맛집11 입니다.', '서울특별시', '강남구', 0, '2024-02-29 08:07:24', '2024-02-29 08:07:24'),
	(13, 1, '맛집12', '이곳은 맛집12 입니다.', '경상북도', '경산시', 0, '2024-02-29 08:11:00', '2024-02-29 08:11:00'),
	(14, 1, '맛집13', '이곳은 맛집13 입니다.', '경상남도', '거제시', 0, '2024-02-29 08:13:56', '2024-02-29 08:13:56'),
	(15, 1, '맛집14', '이곳은 맛집14 입니다.', '전라남도', '광양시', 0, '2024-02-29 08:15:31', '2024-02-29 08:15:31'),
	(16, 1, '맛집15', '이곳은 맛집15 입니다.', '제주특별자치도', '서귀포시', 0, '2024-02-29 08:18:14', '2024-02-29 08:18:14'),
	(17, 1, '맛집16', '이곳은 맛집16 입니다.', '경상남도', '마산시', 0, '2024-02-29 08:19:55', '2024-02-29 08:19:55');

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
