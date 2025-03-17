-- 创建权限/菜单表（如果不存在）
CREATE TABLE IF NOT EXISTS `sys_menu` (
  `menu_id` bigint NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(50) NOT NULL COMMENT '菜单名称',
  `parent_id` bigint DEFAULT '0' COMMENT '父菜单ID',
  `order_num` int DEFAULT '0' COMMENT '显示顺序',
  `path` varchar(200) DEFAULT '' COMMENT '路由地址',
  `component` varchar(255) DEFAULT NULL COMMENT '组件路径',
  `query` varchar(255) DEFAULT NULL COMMENT '路由参数',
  `is_frame` int DEFAULT '1' COMMENT '是否为外链（0是 1否）',
  `is_cache` int DEFAULT '0' COMMENT '是否缓存（0缓存 1不缓存）',
  `menu_type` char(1) DEFAULT '' COMMENT '菜单类型（M目录 C菜单 F按钮）',
  `visible` char(1) DEFAULT '0' COMMENT '菜单状态（0显示 1隐藏）',
  `status` char(1) DEFAULT '0' COMMENT '菜单状态（0正常 1停用）',
  `perms` varchar(100) DEFAULT NULL COMMENT '权限标识',
  `icon` varchar(100) DEFAULT '#' COMMENT '菜单图标',
  `create_by` varchar(64) DEFAULT '' COMMENT '创建者',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) DEFAULT '' COMMENT '更新者',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8mb4 COMMENT='菜单权限表';

-- 创建角色-菜单关联表（如果不存在）
CREATE TABLE IF NOT EXISTS `sys_role_menu` (
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `menu_id` bigint NOT NULL COMMENT '菜单ID',
  PRIMARY KEY (`role_id`,`menu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色和菜单关联表';

-- 添加日志管理目录（如果不存在）
INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `menu_type`, `visible`, `perms`, `icon`, `status`, `create_time`, `remark`)
SELECT 500, '日志管理', 0, 5, 'log', '', 'M', '0', '', 'log', '0', NOW(), '日志管理目录'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE `menu_id` = 500);

-- 添加登录日志菜单（如果不存在）
INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `menu_type`, `visible`, `perms`, `icon`, `status`, `create_time`, `remark`)
SELECT 501, '登录日志', 500, 1, 'loginlog', 'system/loginlog/index', 'C', '0', 'system:loginlog:list', 'logininfor', '0', NOW(), '登录日志菜单'
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE `menu_id` = 501);

-- 添加登录日志查询按钮（如果不存在）
INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `menu_type`, `visible`, `perms`, `icon`, `status`, `create_time`, `remark`)
SELECT 502, '登录日志查询', 501, 1, '', '', 'F', '0', 'system:loginlog:query', '#', '0', NOW(), ''
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE `menu_id` = 502);

-- 添加登录日志删除按钮（如果不存在）
INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `menu_type`, `visible`, `perms`, `icon`, `status`, `create_time`, `remark`)
SELECT 503, '登录日志删除', 501, 2, '', '', 'F', '0', 'system:loginlog:remove', '#', '0', NOW(), ''
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE `menu_id` = 503);

-- 添加登录日志导出按钮（如果不存在）
INSERT INTO `sys_menu` (`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `menu_type`, `visible`, `perms`, `icon`, `status`, `create_time`, `remark`)
SELECT 504, '登录日志导出', 501, 3, '', '', 'F', '0', 'system:loginlog:export', '#', '0', NOW(), ''
FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_menu` WHERE `menu_id` = 504);

-- 为超级管理员角色(ID=1)授权登录日志相关权限（如果不存在）
INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, 500 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_role_menu` WHERE `role_id` = 1 AND `menu_id` = 500);

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, 501 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_role_menu` WHERE `role_id` = 1 AND `menu_id` = 501);

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, 502 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_role_menu` WHERE `role_id` = 1 AND `menu_id` = 502);

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, 503 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_role_menu` WHERE `role_id` = 1 AND `menu_id` = 503);

INSERT INTO `sys_role_menu` (`role_id`, `menu_id`)
SELECT 1, 504 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM `sys_role_menu` WHERE `role_id` = 1 AND `menu_id` = 504); 