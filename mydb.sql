/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50716
 Source Host           : localhost:3306
 Source Schema         : mydb

 Target Server Type    : MySQL
 Target Server Version : 50716
 File Encoding         : 65001

 Date: 27/04/2024 14:11:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activities
-- ----------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE `activities`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `tips` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `outcome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `module_id` bigint(20) DEFAULT NULL,
  `module_id_1` bigint(20) DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activities
-- ----------------------------
INSERT INTO `activities` VALUES (1, 'test activititie1', 'test', '1', 1, 1, 'test introduction');
INSERT INTO `activities` VALUES (2, 'test activititie2', 'test', '1', 2, 2, 'test introduction');
INSERT INTO `activities` VALUES (3, 'test activititie2', 'test', '1', 1, 1, 'test introduction');
INSERT INTO `activities` VALUES (4, 'Activity33', '', NULL, 1, 1, NULL);
INSERT INTO `activities` VALUES (5, 'aaa', '', NULL, 1, 1, NULL);
INSERT INTO `activities` VALUES (6, 'ggg', '', NULL, 1, 1, NULL);
INSERT INTO `activities` VALUES (7, 'tttt', '', NULL, 1, 1, NULL);

-- ----------------------------
-- Table structure for attribute
-- ----------------------------
DROP TABLE IF EXISTS `attribute`;
CREATE TABLE `attribute`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `AName` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Value` int(11) DEFAULT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for avatar
-- ----------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `LArm` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `RArm` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `RLeg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `LLeg` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Body` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `FHead` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `BHead` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for learning_outcomes
-- ----------------------------
DROP TABLE IF EXISTS `learning_outcomes`;
CREATE TABLE `learning_outcomes`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `activity_id` bigint(20) DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of learning_outcomes
-- ----------------------------
INSERT INTO `learning_outcomes` VALUES (1, 1, 'test content1');
INSERT INTO `learning_outcomes` VALUES (2, 2, 'test content2');
INSERT INTO `learning_outcomes` VALUES (3, 3, 'test content3');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `menu_id` int(11) NOT NULL,
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `routePath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `routeElement` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 'student', NULL, 'EditOutlined', '/student', '/student');
INSERT INTO `menu` VALUES (3, 'user', NULL, 'BgColorsOutlined', '/user', '/user');
INSERT INTO `menu` VALUES (4, 'session', NULL, 'BorderLeftOutlined', '/session', '/session');
INSERT INTO `menu` VALUES (5, 'report', NULL, 'BarChartOutlined', '/report', '/report');
INSERT INTO `menu` VALUES (6, 'module', NULL, 'CodepenOutlined', '/module', '/module');
INSERT INTO `menu` VALUES (7, 'skill logs', NULL, 'RubyOutlined', '/skill', '/skill');
INSERT INTO `menu` VALUES (8, 'session', NULL, 'BorderLeftOutlined', '/session', '/session');
INSERT INTO `menu` VALUES (15, 'report', NULL, NULL, '/report', '/report');
INSERT INTO `menu` VALUES (16, 'module', NULL, NULL, '/module', '/module');
INSERT INTO `menu` VALUES (17, 'skill logs', NULL, NULL, '/skill', '/skill');
INSERT INTO `menu` VALUES (18, 'session', NULL, NULL, '/session', '/session');
INSERT INTO `menu` VALUES (19, 'menber', NULL, NULL, '/member', '/member');
INSERT INTO `menu` VALUES (20, 'SysLog', NULL, NULL, '/SysLog', '/SysLog');

-- ----------------------------
-- Table structure for modules
-- ----------------------------
DROP TABLE IF EXISTS `modules`;
CREATE TABLE `modules`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of modules
-- ----------------------------
INSERT INTO `modules` VALUES (1, 'test modules1');
INSERT INTO `modules` VALUES (2, 'test modules2');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `order_time` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `total` double(10, 0) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for playing_cards
-- ----------------------------
DROP TABLE IF EXISTS `playing_cards`;
CREATE TABLE `playing_cards`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `attributes1` int(10) DEFAULT NULL,
  `attributes2` int(10) DEFAULT NULL,
  `avatarPath` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `updatedAt` datetime(0) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `menu_id` int(11) NOT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 'user');
INSERT INTO `role_menu` VALUES (3, 'user');
INSERT INTO `role_menu` VALUES (4, 'user');
INSERT INTO `role_menu` VALUES (5, 'caseWorker');
INSERT INTO `role_menu` VALUES (6, 'caseWorker');
INSERT INTO `role_menu` VALUES (7, 'caseWorker');
INSERT INTO `role_menu` VALUES (8, 'caseWorker');
INSERT INTO `role_menu` VALUES (15, 'admin');
INSERT INTO `role_menu` VALUES (16, 'admin');
INSERT INTO `role_menu` VALUES (17, 'admin');
INSERT INTO `role_menu` VALUES (18, 'admin');
INSERT INTO `role_menu` VALUES (19, 'admin');
INSERT INTO `role_menu` VALUES (20, 'admin');

-- ----------------------------
-- Table structure for session_activities
-- ----------------------------
DROP TABLE IF EXISTS `session_activities`;
CREATE TABLE `session_activities`  (
  `session_id` bigint(20) NOT NULL,
  `activity_id` bigint(20) DEFAULT NULL,
  `activity_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_by_caseworker_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of session_activities
-- ----------------------------
INSERT INTO `session_activities` VALUES (1, 1, 'testname1', NULL);
INSERT INTO `session_activities` VALUES (2, 1, 'testname2', NULL);
INSERT INTO `session_activities` VALUES (8, 1, 'test activititie1', NULL);

-- ----------------------------
-- Table structure for session_learning_outcomes
-- ----------------------------
DROP TABLE IF EXISTS `session_learning_outcomes`;
CREATE TABLE `session_learning_outcomes`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `session_id` bigint(20) DEFAULT NULL,
  `learning_outcome_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of session_learning_outcomes
-- ----------------------------
INSERT INTO `session_learning_outcomes` VALUES (1, 'testConent1', 1, NULL);
INSERT INTO `session_learning_outcomes` VALUES (2, 'testConent2aadadad', 2, NULL);
INSERT INTO `session_learning_outcomes` VALUES (3, 'test content1', 8, 1);

-- ----------------------------
-- Table structure for session_modules
-- ----------------------------
DROP TABLE IF EXISTS `session_modules`;
CREATE TABLE `session_modules`  (
  `session_id` bigint(20) NOT NULL,
  `module_id` bigint(20) DEFAULT NULL,
  `module_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`session_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of session_modules
-- ----------------------------
INSERT INTO `session_modules` VALUES (8, 1, 'test modules1');

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `session_date` date DEFAULT NULL,
  `start_time` time(0) DEFAULT NULL,
  `end_time` time(0) DEFAULT NULL,
  `service_user` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `learning_outcome` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `session_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_by_caseworker_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES (1, 'aaa', '2024-03-15', '10:43:27', '10:43:31', 'gzp', 'gzp', '111', 'unfinished', 'gzp', NULL);
INSERT INTO `sessions` VALUES (2, 'bbb', '2024-03-15', '11:13:00', '11:13:04', 'tom', 'tom', '111', 'unfinished', 'tom', 3);
INSERT INTO `sessions` VALUES (8, 'session name1', '2024-03-06', NULL, NULL, '12', '12', NULL, 'finished', 'session name1', 3);

-- ----------------------------
-- Table structure for sys_log
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log`  (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `userid` int(10) DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createtime` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sys_log
-- ----------------------------
INSERT INTO `sys_log` VALUES (6, 4, 'added the role of caseWorker, this name is dsg at 2024-04-27 13:51:29', '2024-04-27 13:51:29');
INSERT INTO `sys_log` VALUES (7, 4, 'modified the user whose 16, at 2024-04-27 13:51:39', '2024-04-27 13:51:39');
INSERT INTO `sys_log` VALUES (8, 4, 'deletes user 17, at 2024-04-27 13:54:45', '2024-04-27 13:54:45');
INSERT INTO `sys_log` VALUES (9, 4, 'added the role of caseWorker, this name is ga at 2024-04-27 14:05:50', '2024-04-27 14:05:50');
INSERT INTO `sys_log` VALUES (10, 4, 'added the role of caseWorker, this name is ga22 at 2024-04-27 14:05:55', '2024-04-27 14:05:55');
INSERT INTO `sys_log` VALUES (11, 4, 'added the role of admin, this name is sdgh at 2024-04-27 14:05:59', '2024-04-27 14:05:59');
INSERT INTO `sys_log` VALUES (12, 4, 'added the role of caseWorker, this name is sadasf at 2024-04-27 14:06:03', '2024-04-27 14:06:03');
INSERT INTO `sys_log` VALUES (13, 4, 'added the role of admin, this name is asdddd at 2024-04-27 14:06:08', '2024-04-27 14:06:08');
INSERT INTO `sys_log` VALUES (14, 4, 'added the role of user, this name is 2asd2a at 2024-04-27 14:06:13', '2024-04-27 14:06:13');
INSERT INTO `sys_log` VALUES (15, 4, 'modified the user whose 31, at 2024-04-27 14:06:19', '2024-04-27 14:06:19');
INSERT INTO `sys_log` VALUES (16, 4, 'modified the user whose 31, at 2024-04-27 14:06:23', '2024-04-27 14:06:23');
INSERT INTO `sys_log` VALUES (17, 4, 'modified the user whose 31, at 2024-04-27 14:06:25', '2024-04-27 14:06:25');
INSERT INTO `sys_log` VALUES (18, 4, 'modified the user whose 31, at 2024-04-27 14:06:28', '2024-04-27 14:06:28');
INSERT INTO `sys_log` VALUES (19, 4, 'modified the user whose 29, at 2024-04-27 14:06:30', '2024-04-27 14:06:30');
INSERT INTO `sys_log` VALUES (20, 4, 'added the role of admin, this name is asd3233 at 2024-04-27 14:06:37', '2024-04-27 14:06:37');
INSERT INTO `sys_log` VALUES (21, 4, 'deletes user 32, at 2024-04-27 14:06:40', '2024-04-27 14:06:40');
INSERT INTO `sys_log` VALUES (22, 30, 'added the role of user, this name is sss at 2024-04-27 14:08:19', '2024-04-27 14:08:19');
INSERT INTO `sys_log` VALUES (23, 30, 'added the role of user, this name is ffa at 2024-04-27 14:08:26', '2024-04-27 14:08:26');
INSERT INTO `sys_log` VALUES (24, 30, 'modified the user whose 33, at 2024-04-27 14:08:33', '2024-04-27 14:08:33');
INSERT INTO `sys_log` VALUES (25, 30, 'modified the user whose 33, at 2024-04-27 14:08:38', '2024-04-27 14:08:38');
INSERT INTO `sys_log` VALUES (26, 30, 'modified the user whose 33, at 2024-04-27 14:08:48', '2024-04-27 14:08:48');
INSERT INTO `sys_log` VALUES (27, 30, 'deletes user 33, at 2024-04-27 14:08:57', '2024-04-27 14:08:57');

-- ----------------------------
-- Table structure for tips
-- ----------------------------
DROP TABLE IF EXISTS `tips`;
CREATE TABLE `tips`  (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `activity_id` bigint(20) DEFAULT NULL,
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `avatar_i_d` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `avatarID` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'gzp', 'gzp', 'user', NULL, NULL);
INSERT INTO `users` VALUES (2, '12', '1', 'user', NULL, NULL);
INSERT INTO `users` VALUES (3, 'tom', 'tom', 'caseWorker', NULL, NULL);
INSERT INTO `users` VALUES (4, 'admin', 'admin', 'admin', NULL, NULL);
INSERT INTO `users` VALUES (5, 'ads', 'asd', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (6, 'a1ds', 'a1sd', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (11, 'b2', 'b', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (12, 'as', 'asd', 'user', NULL, '0');
INSERT INTO `users` VALUES (13, 'asd', 'asd', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (18, 'gas', 'ad', 'admin', NULL, '0');
INSERT INTO `users` VALUES (19, 'gas2', 'ad', 'admin', NULL, '0');
INSERT INTO `users` VALUES (20, 'af', 'fdf', 'admin', NULL, '0');
INSERT INTO `users` VALUES (21, 'ad', 'ff', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (22, 'ww', 'ww', 'user', NULL, '0');
INSERT INTO `users` VALUES (23, 'asfasfg', 'asgas', 'admin', NULL, '0');
INSERT INTO `users` VALUES (24, 'asfgg', 'fgg', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (25, 'dsg', 'hg', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (26, 'ga', 'aas', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (27, 'ga22', 'sagas', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (28, 'sdgh', 'sdsg', 'admin', NULL, '0');
INSERT INTO `users` VALUES (29, 'sadasf', 'sagasd', 'caseWorker', NULL, '0');
INSERT INTO `users` VALUES (30, 'asdddd', 'asd', 'admin', NULL, '0');
INSERT INTO `users` VALUES (31, '2asd2a2', 'asfaat3', 'user', NULL, '0');
INSERT INTO `users` VALUES (34, 'ffa', 'ff', 'user', NULL, '0');

SET FOREIGN_KEY_CHECKS = 1;
