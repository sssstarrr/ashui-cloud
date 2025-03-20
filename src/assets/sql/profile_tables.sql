-- 个人中心功能使用的表结构

-- 个人中心功能主要使用已有的用户表(sys_user)
-- 以下是sys_user表结构的引用，不需要重新创建
/*
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(64) NOT NULL COMMENT '用户名',
  `nickname` varchar(64) DEFAULT NULL COMMENT '用户昵称',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `status` char(1) DEFAULT '0' COMMENT '帐号状态（0正常 1停用）',
  `email` varchar(128) DEFAULT NULL COMMENT '用户邮箱',
  `mobile` varchar(20) DEFAULT NULL COMMENT '手机号码',
  `gender` char(1) DEFAULT '0' COMMENT '用户性别（0男 1女 2未知）',
  `avatar` varchar(255) DEFAULT '' COMMENT '头像地址',
  `login_ip` varchar(128) DEFAULT NULL COMMENT '最后登录IP',
  `login_date` datetime DEFAULT NULL COMMENT '最后登录时间',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标志（0代表存在 1代表删除）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';
*/

-- 以下是个人中心操作日志表，用于记录用户对个人信息的修改操作
CREATE TABLE `sys_profile_log` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `user_id` bigint NOT NULL COMMENT '用户ID',
  `operation` varchar(50) NOT NULL COMMENT '操作类型(update_info-更新信息/update_pwd-修改密码/update_avatar-更新头像)',
  `ip_address` varchar(128) DEFAULT '' COMMENT '操作IP地址',
  `operation_time` datetime NOT NULL COMMENT '操作时间',
  `status` char(1) DEFAULT '0' COMMENT '操作状态（0成功 1失败）',
  `msg` varchar(255) DEFAULT '' COMMENT '操作消息',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='个人中心操作日志'; 