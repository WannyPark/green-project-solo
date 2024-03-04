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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='맛집추천 게시판\r\n';

-- 테이블 데이터 studyjwt.board:~33 rows (대략적) 내보내기
DELETE FROM `board`;
INSERT INTO `board` (`board_no`, `user_no`, `board_title`, `board_desc`, `board_loc1`, `board_loc2`, `board_like`, `board_origin_image_name`, `board_save_image_name`, `board_save_image_ext`, `board_save_image_size`, `board_reg_date`, `board_upd_date`) VALUES
	(1, 1, '맛집1', '이곳은 맛집1 입니다.', '경상남도', '김해시', 1, '', '', '', 0, '2024-02-29 03:52:12', '2024-02-29 03:52:12'),
	(2, 1, '맛집2', '이곳은 맛집2 입니다.', '서울특별시', '강남구', 2, '', '', '', 0, '2024-02-29 04:32:05', '2024-02-29 04:32:05'),
	(3, 1, '맛집3', '이곳은 맛집3 입니다.', '서울특별시', '강남구', 4, '', '', '', 0, '2024-02-29 04:32:41', '2024-02-29 04:32:41'),
	(4, 1, '맛집4', '이곳은 맛집4 입니다.', '서울특별시', '강남구', 4, '', '', '', 0, '2024-02-29 04:33:25', '2024-02-29 04:33:25'),
	(5, 1, '맛집5', '이곳은 맛집5 입니다.', '서울특별시', '강남구', 7, '', '', '', 0, '2024-02-29 04:34:43', '2024-02-29 04:34:43'),
	(6, 1, '맛집6', '이곳은 맛집6 입니다.', '부산광역시', '강서구', 6, '', '', '', 0, '2024-02-29 04:36:17', '2024-02-29 04:36:17'),
	(7, 1, '맛집7', '이곳은 맛집7 입니다.', '부산광역시', '강서구', 8, '', '', '', 0, '2024-02-29 04:37:40', '2024-02-29 04:37:40'),
	(8, 1, '맛집8', '이곳은 맛집8 입니다.', '인천광역시', '계양구', 0, '', '', '', 0, '2024-02-29 04:38:34', '2024-02-29 04:38:34'),
	(9, 1, '맛집9', '이곳은 맛집9 입니다.', '울산광역시', '남구', 0, '', '', '', 0, '2024-02-29 05:10:18', '2024-02-29 05:10:18'),
	(10, 1, '맛집10', '이곳은 맛집10 입니다.', '전라남도', '광양시', 0, '', '', '', 0, '2024-02-29 07:40:50', '2024-02-29 07:40:50'),
	(11, 1, '맛집11', '이곳은 맛집11 입니다.', '인천광역시', '계양구', 0, '', '', '', 0, '2024-02-29 08:05:45', '2024-02-29 08:05:45'),
	(12, 1, '맛집11', '이곳은 맛집11 입니다.', '서울특별시', '강남구', 0, '', '', '', 0, '2024-02-29 08:07:24', '2024-02-29 08:07:24'),
	(13, 1, '맛집12', '이곳은 맛집12 입니다.', '경상북도', '경산시', 0, '', '', '', 0, '2024-02-29 08:11:00', '2024-02-29 08:11:00'),
	(14, 1, '맛집13', '이곳은 맛집13 입니다.', '경상남도', '거제시', 0, '', '', '', 0, '2024-02-29 08:13:56', '2024-02-29 08:13:56'),
	(15, 1, '맛집14', '이곳은 맛집14 입니다.', '전라남도', '광양시', 0, '', '', '', 0, '2024-02-29 08:15:31', '2024-02-29 08:15:31'),
	(16, 1, '맛집15', '이곳은 맛집15 입니다.', '제주특별자치도', '서귀포시', 0, '', '', '', 0, '2024-02-29 08:18:14', '2024-02-29 08:18:14'),
	(17, 1, '맛집16', '이곳은 맛집16 입니다.', '경상남도', '마산시', 0, '', '', '', 0, '2024-02-29 08:19:55', '2024-02-29 08:19:55'),
	(18, 1, '맛집17', '이곳은 맛집17 입니다.', '경상남도', '김해시', 0, '', '', '', 0, '2024-03-02 14:52:21', '2024-03-02 14:52:21'),
	(19, 1, '맛집18', '이곳은 맛집18 입니다.', '경상남도', '김해시', 0, '', '', '', 0, '2024-03-02 14:56:45', '2024-03-02 14:56:45'),
	(20, 1, '맛집19', '이곳은 맛집19 입니다.', '인천광역시', '계양구', 0, '', '', '', 0, '2024-03-02 14:59:21', '2024-03-02 14:59:21'),
	(21, 1, '맛집20', '이곳은 맛집20 입니다.', '경상남도', '김해시', 0, '', '', '', 0, '2024-03-02 15:08:06', '2024-03-02 15:08:06'),
	(22, 1, '맛집21', '이곳은 맛집21 입니다.', '강원도', '강릉시', 0, '', '', '', 0, '2024-03-02 15:09:59', '2024-03-02 15:09:59'),
	(23, 1, '맛집22', '이곳은 맛집22 입니다.', '대전광역시', '대덕구', 0, '', '', '', 0, '2024-03-02 15:12:20', '2024-03-02 15:12:20'),
	(24, 1, '맛집22', '이곳은 맛집22 입니다.', '광주광역시', '광산구', 0, '', '', '', 0, '2024-03-02 15:13:50', '2024-03-02 15:13:50'),
	(25, 1, '맛집23', '이곳은 맛집23 입니다.', '경기도', '고양시', 0, '', '', '', 0, '2024-03-02 15:15:48', '2024-03-02 15:15:48'),
	(26, 1, '맛집24', '이곳은 맛집24 입니다.', '대전광역시', '대덕구', 0, '', '', '', 0, '2024-03-02 15:25:39', '2024-03-02 15:25:39'),
	(27, 1, '맛집25', '이곳은 맛집25 입니다.', '경상북도', '경산시', 0, '', '', '', 0, '2024-03-02 15:27:58', '2024-03-02 15:27:58'),
	(28, 1, '맛집26', '이곳은 맛집26 입니다.', '경기도', '고양시', 0, '', '', '', 0, '2024-03-02 15:40:13', '2024-03-02 15:40:13'),
	(29, 1, '맛집27', '이곳은 맛집27 입니다.', '강원도', '강릉시', 0, '', '', '', 0, '2024-03-02 15:55:29', '2024-03-02 15:55:29'),
	(30, 1, '맛집28', '이곳은 맛집28 입니다.', '서울특별시', '강남구', 9, '', '', '', 0, '2024-03-02 17:19:28', '2024-03-02 17:19:28'),
	(31, 1, '맛집50', '이곳은 맛집50 입니다.', '서울특별시', '강남구', 0, '', '', '', 0, '2024-03-03 18:29:43', '2024-03-03 18:29:43'),
	(32, 1, '맛집40', '이곳은 맛집40 입니다.', '서울특별시', '강남구', 0, '', '', '', 0, '2024-03-03 18:32:07', '2024-03-03 18:32:07'),
	(38, 1, '이미지 테스트1', '이미지 테스트1 입니다.', '서울특별시', '강남구', 0, 'model-s', '17095359767881999', 'jpg', 6604, '2024-03-04 07:06:16', '2024-03-04 07:06:16');

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

-- 테이블 데이터 studyjwt.board_images:~15 rows (대략적) 내보내기
DELETE FROM `board_images`;
INSERT INTO `board_images` (`board_no`, `board_origin_image_name`, `board_save_image_name`, `board_save_image_ext`, `board_save_image_size`) VALUES
	(28, '스크린샷 2024-01-24 213034', '17093940140379901', 'png', 5276),
	(28, '스크린샷 2024-01-24 213338', '17093940140592011', 'png', 55376),
	(28, '스크린샷 2024-01-24 213940', '17093940140618928', 'png', 20135),
	(29, '스크린샷 2024-01-24 212054', '17093949297308205', 'png', 430),
	(29, '스크린샷 2024-01-27 013907', '17093949297387203', 'png', 23886),
	(29, '스크린샷 2024-01-31 141442', '17093949297409011', 'png', 4112),
	(30, '스크린샷 2024-01-24 212127', '17093999684293025', 'png', 6886),
	(30, '스크린샷 2024-01-24 212611', '17093999684334173', 'png', 45777),
	(30, '스크린샷 2024-01-24 212736', '17093999684365940', 'png', 10262),
	(31, '스크린샷 2024-01-24 213940', '17094905841905992', 'png', 20135),
	(31, '스크린샷 2024-01-27 013907', '17094905841961545', 'png', 23886),
	(31, '스크린샷 2024-01-31 141442', '17094905841983890', 'png', 4112),
	(32, '스크린샷 2024-01-24 213338', '17094907275753426', 'png', 55376),
	(32, '스크린샷 2024-01-27 013907', '17094907275805866', 'png', 23886),
	(32, '스크린샷 2024-01-31 141442', '17094907275821661', 'png', 4112),
	(33, 'model-y', '17095336698744480', 'jpg', 5997),
	(33, 'model-x', '17095336698845050', 'jpg', 5670),
	(33, 'model-s', '17095336698869406', 'jpg', 6604),
	(34, 'model-y', '17095338262133756', 'jpg', 5997),
	(34, 'model-x', '17095338262211828', 'jpg', 5670),
	(34, 'model-s', '17095338262233478', 'jpg', 6604),
	(35, 'model-y', '17095339784228992', 'jpg', 5997),
	(35, 'model-x', '17095339784269737', 'jpg', 5670),
	(35, 'model-s', '17095339784297810', 'jpg', 6604),
	(36, 'model-y', '17095340986633290', 'jpg', 5997),
	(36, 'model-x', '17095340986699997', 'jpg', 5670),
	(36, 'model-s', '17095340986723572', 'jpg', 6604),
	(37, 'model-y', '17095346631703684', 'jpg', 5997),
	(37, 'model-x', '17095346631739339', 'jpg', 5670),
	(37, 'model-s', '17095346631763522', 'jpg', 6604),
	(38, 'model-y', '17095359767832860', 'jpg', 5997),
	(38, 'model-x', '17095359767861217', 'jpg', 5670),
	(38, 'model-s', '17095359767881999', 'jpg', 6604);

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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- 테이블 studyjwt.user_like_board 구조 내보내기
CREATE TABLE IF NOT EXISTS `user_like_board` (
  `user_no` bigint(20) NOT NULL,
  `board_no` bigint(20) NOT NULL,
  KEY `user_no` (`user_no`),
  KEY `board_no` (`board_no`),
  CONSTRAINT `board_no` FOREIGN KEY (`board_no`) REFERENCES `board` (`board_no`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_no` FOREIGN KEY (`user_no`) REFERENCES `user` (`NO`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='좋아요 누른 게시물\r\n';

-- 테이블 데이터 studyjwt.user_like_board:~0 rows (대략적) 내보내기
DELETE FROM `user_like_board`;
INSERT INTO `user_like_board` (`user_no`, `board_no`) VALUES
	(1, 30);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
