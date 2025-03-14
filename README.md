<p align="center">
  <img src="https://pic4.zhimg.com/v2-702a23ebb518199355099df77a3cfe07_b.webp" width="200" height="200" />
</p>

<h1 align="center">ashui Cloud🌻</h1>

<p align="center">基于<b>开箱即用</b>的 Vue3 后台管理系统框架KOI-UI</p>

<p align="center">
  <span>&nbsp;[&nbsp;</span>
  纯前端演示[开源]
  <a href="http://39.107.143.109/login" target="_blank">点击这里</a>
  <span>&nbsp;]&nbsp;</span>
<p>

## 1、简介

本项目基于KOI-UI🌻框架进行二次开发

## 2、特点

- 🎯 使用 Element Plus + Vite + Vue3 + TypeScript + Uncoss + Pinia 等主流技术。
- 🍊 多种布局和丰富的主题适配移动端、IPad和PC端。
- 🐼 内置权限管理页面，进行二次开发可直接对接后端接口即可。
- 🌸 集成登陆、注销及权限验证。
- 🎃 封装按钮和Input框的防抖、限流和背景水印以及左侧无限递归菜单。
- 🍀 集成 `pinia`，vuex 的替代方案，轻量、简单、易用，并且配置pinia持久化插件。
- 😍 二次封装Dialog对话框、Drawer抽屉、Notification通知、Message消息提示和Popconfirm确认框，操作更加方便快捷。
- 🍓 二次封装axios，方便接口更好的统一管理。
- 🌍 集成Echarts图表。
- 🌈 集成 `unocss`，antfu 开源的原子 css 解决方案，非常轻量。
- 🐟 集成多环境配置，dev、测试、生产环境。
- 🌼 集成 `eslint + prettier`，代码约束和格式化统一。
- 🌻 集成 `stylelint`，代码约束scss、less、css规范化。
- 👻 集成 `mock` 接口服务。
- 🏡 集成 `iconify` 图标，支持自定义 svg 图标, 优雅使用icon。

## 3、无需递归路由

众所周知，在实现左侧无限递归路由的时候，后端需要进行树形递归，前端再二次进行递归处理，这样增加了前后端开发难度，如何解决如下？

此项目，前端使用扁平化路由，实现三级及以上页面依旧存在路由缓存效果。

后端提供接口菜单不需要再进行递归，直接根据提供的json格式，进行提供接口[数据如下]，简化后端难度，实现无限递归路由。

```properties
{
  "status": 200,
  "msg": "SUCCESS",
  "data": [
    {
      "menuId": 1,
      "menuName": "系统管理",
      "parentId": 0,
      "menuType": "1",
      "path": "/system",
      "name": "systemPage",
      "component": "",
      "icon": "Tools",
      "isHide": "1",
      "isLink": "",
      "isKeepAlive": "0",
      "isFull": "1",
      "isAffix": "1",
      "redirect": "/system/user"
    },
    {
      "menuId": 11,
      "menuName": "用户管理",
      "parentId": 1,
      "menuType": "2",
      "path": "/system/user",
      "name": "userPage",
      "component": "system/user/index",
      "icon": "UserFilled",
      "isHide": "1",
      "isLink": "",
      "isKeepAlive": "0",
      "isFull": "1",
      "isAffix": "1",
      "redirect": ""
    },
}
```

## 4、预览

> 预览截图

<table>
  <tr>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI1.png" /></td>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI2.png" /></td>
  </tr>
  <tr>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI3.png" /></td>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI4.png" /></td>
  </tr>
  <tr>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI5.png" /></td>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI6.png" /></td>
  </tr>
  <tr>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI7.png" /></td>
    <td><img src="https://gitee.com/BigCatHome/koi-photo/raw/master/photos/KOI-ADMIN/KOI8.png" /></td>
  </tr>
</table>

## 5、快速开始

```properties
# 若未配置pnpm，请先下载并配置镜像
npm install pnpm -g --registry=https://registry.npmmirror.com
# 下载依赖
pnpm install
# 启动
pnpm run dev
```

## 6、打包发布

```properties
# 构建环境
pnpm build
# 生产环境
pnpm build:prod
```
