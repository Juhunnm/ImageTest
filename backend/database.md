<!-- 이미지 테이블 -->
CREATE TABLE `images` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `isedit` tinyint DEFAULT NULL,
  PRIMARY KEY (`cid`)
) 

<!-- 변경된 이미지 로그 -->
CREATE TABLE `change_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `cid` int DEFAULT NULL,
  `prev_value` varchar(255) DEFAULT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `edit_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
   FOREIGN KEY (`log_id`) REFERENCES `images` (`cid`)
)