# 登录相关接口文档

## 1. 用户登录

### 1.1 基本信息

> 请求路径：/api/auth/login
>
> 请求方式：POST
>
> 接口描述：该接口用于用户登录，登录成功后返回JWT令牌

### 1.2 请求参数

格式：application/json

参数说明：

| 参数名   | 类型   | 是否必须 | 备注       |
| -------- | ------ | -------- | ---------- |
| username | string | 必须     | 用户名     |
| password | string | 必须     | 密码       |
| code     | string | 必须     | 验证码     |
| uuid     | string | 必须     | 验证码标识 |

请求参数样例：

```json
{
  "username": "admin",
  "password": "admin123",
  "code": "1234",
  "uuid": "abcd-1234-efgh-5678"
}
```

### 1.3 响应数据

参数格式：application/json

参数说明：

| 参数名 | 类型   | 是否必须 | 备注                           |
| ------ | ------ | -------- | ------------------------------ |
| code   | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg    | string | 非必须   | 提示信息                       |
| data   | object | 非必须   | 返回的数据                     |
| token  | string | 必须     | JWT令牌                        |

响应数据样例：

```json
{
  "code": 200,
  "msg": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

## 2. 获取验证码

### 2.1 基本信息

> 请求路径：/api/auth/captcha
>
> 请求方式：GET
>
> 接口描述：该接口用于获取图形验证码

### 2.2 请求参数

无

### 2.3 响应数据

参数格式：application/json

参数说明：

| 参数名 | 类型   | 是否必须 | 备注                           |
| ------ | ------ | -------- | ------------------------------ |
| code   | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg    | string | 非必须   | 提示信息                       |
| data   | object | 非必须   | 返回的数据                     |
| img    | string | 必须     | Base64格式的验证码图片         |
| uuid   | string | 必须     | 验证码标识                     |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "img": "data:image/png;base64,iVBORw0KGgoAAAANSUhEU...",
    "uuid": "abcd-1234-efgh-5678"
  }
}
```

## 3. 获取用户信息

### 3.1 基本信息

> 请求路径：/api/auth/info
>
> 请求方式：GET
>
> 接口描述：该接口用于获取已登录用户的信息，需要在请求头中携带token

### 3.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

### 3.3 响应数据

参数格式：application/json

参数说明：

| 参数名     | 类型     | 是否必须 | 备注                           |
| ---------- | -------- | -------- | ------------------------------ |
| code       | number   | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg        | string   | 非必须   | 提示信息                       |
| data       | object   | 非必须   | 返回的数据                     |
| user       | object   | 必须     | 用户信息                       |
| roles      | array    | 必须     | 角色信息                       |
| permissions| array    | 必须     | 权限信息                       |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "user": {
      "id": 1,
      "username": "admin",
      "nickname": "系统管理员",
      "email": "admin@ashui.cloud",
      "mobile": null,
      "gender": "0",
      "avatar": "https://example.com/avatar.png"
    },
    "roles": ["admin"],
    "permissions": ["system:user:list", "system:user:edit"]
  }
}
```

## 4. 用户登出

### 4.1 基本信息

> 请求路径：/api/auth/logout
>
> 请求方式：POST
>
> 接口描述：该接口用于用户登出系统，需要在请求头中携带token

### 4.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

### 4.3 响应数据

参数格式：application/json

参数说明：

| 参数名 | 类型   | 是否必须 | 备注                           |
| ------ | ------ | -------- | ------------------------------ |
| code   | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg    | string | 非必须   | 提示信息                       |

响应数据样例：

```json
{
  "code": 200,
  "msg": "退出成功"
}
```

## 5. 登录需求说明

1. 用户登录流程：
   - 用户首先获取验证码
   - 输入用户名、密码和验证码进行登录
   - 登录成功后获取JWT令牌
   - 后续请求需在请求头中携带JWT令牌

2. 安全要求：
   - 密码传输采用加密方式
   - 用户密码存储采用BCrypt加密
   - 登录失败超过5次将锁定账户30分钟
   - 登录成功记录登录日志
   - JWT令牌有效期为24小时

3. 令牌处理：
   - 登录成功后下发JWT令牌
   - 登出后令牌将被加入黑名单
   - 令牌中包含用户ID和角色信息
   - 每次请求都会校验令牌有效性 