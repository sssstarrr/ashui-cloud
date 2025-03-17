# 登录日志相关接口文档

## 1. 登录日志列表查询

### 1.1 基本信息

> 请求路径：/api/system/loginlog/list
>
> 请求方式：GET
>
> 接口描述：该接口用于查询登录日志列表，支持分页和条件查询

### 1.2 请求参数

参数格式：queryString

参数说明：

| 参数名     | 类型   | 是否必须 | 备注                                       |
| ---------- | ------ | -------- | ------------------------------------------ |
| pageNum    | number | 是       | 当前页码，默认为1                          |
| pageSize   | number | 是       | 每页显示条数，默认为10                     |
| loginName  | string | 否       | 用户名                                     |
| ipAddress  | string | 否       | IP地址                                     |
| loginStatus| string | 否       | 登录状态（0成功 1失败）                    |
| beginTime  | string | 否       | 开始时间，格式：yyyy-MM-dd HH:mm:ss        |
| endTime    | string | 否       | 结束时间，格式：yyyy-MM-dd HH:mm:ss        |

请求参数样例：

```
/api/system/loginlog/list?pageNum=1&pageSize=10
/api/system/loginlog/list?pageNum=1&pageSize=10&loginName=admin
/api/system/loginlog/list?pageNum=1&pageSize=10&loginStatus=0&beginTime=2023-01-01 00:00:00&endTime=2023-12-31 23:59:59
```

### 1.3 响应数据

参数格式：application/json

参数说明：

| 参数名           | 类型      | 是否必须 | 备注                           |
| ---------------- | --------- | -------- | ------------------------------ |
| code             | number    | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg              | string    | 非必须   | 提示信息                       |
| data             | object    | 非必须   | 返回的数据                     |
| \|- total        | number    | 必须     | 总记录数                       |
| \|- rows         | array     | 必须     | 登录日志列表                   |
| \|- id           | number    | 必须     | 访问ID                         |
| \|- username     | string    | 必须     | 用户账号                       |
| \|- ipAddress    | string    | 必须     | 登录IP地址                     |
| \|- loginLocation| string    | 必须     | 登录地点                       |
| \|- browser      | string    | 必须     | 浏览器类型                     |
| \|- os           | string    | 必须     | 操作系统                       |
| \|- status       | string    | 必须     | 登录状态（0成功 1失败）        |
| \|- msg          | string    | 必须     | 提示消息                       |
| \|- loginTime    | string    | 必须     | 登录时间                       |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "total": 100,
    "rows": [
      {
        "id": 1,
        "username": "admin",
        "ipAddress": "127.0.0.1",
        "loginLocation": "内网IP",
        "browser": "Chrome",
        "os": "Windows 10",
        "status": "0",
        "msg": "登录成功",
        "loginTime": "2023-08-08 23:00:00"
      },
      {
        "id": 2,
        "username": "test",
        "ipAddress": "192.168.1.1",
        "loginLocation": "内网IP",
        "browser": "Firefox",
        "os": "Windows 10",
        "status": "1",
        "msg": "用户名或密码错误",
        "loginTime": "2023-08-08 22:55:00"
      }
    ]
  }
}
```

## 2. 删除登录日志

### 2.1 基本信息

> 请求路径：/api/system/loginlog/{id}
>
> 请求方式：DELETE
>
> 接口描述：该接口用于删除指定的登录日志

### 2.2 请求参数

参数格式：路径参数

参数说明：

| 参数名 | 类型   | 是否必须 | 备注       |
| ------ | ------ | -------- | ---------- |
| id     | number | 必须     | 登录日志ID |

请求参数样例：

```
/api/system/loginlog/1
```

### 2.3 响应数据

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
  "msg": "操作成功"
}
```

## 3. 批量删除登录日志

### 3.1 基本信息

> 请求路径：/api/system/loginlog/batch
>
> 请求方式：DELETE
>
> 接口描述：该接口用于批量删除登录日志

### 3.2 请求参数

参数格式：application/json

参数说明：

| 参数名 | 类型     | 是否必须 | 备注           |
| ------ | -------- | -------- | -------------- |
| ids    | number[] | 必须     | 登录日志ID数组 |

请求参数样例：

```json
{
  "ids": [1, 2, 3]
}
```

### 3.3 响应数据

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
  "msg": "操作成功"
}
```

## 4. 清空登录日志

### 4.1 基本信息

> 请求路径：/api/system/loginlog/clean
>
> 请求方式：DELETE
>
> 接口描述：该接口用于清空所有登录日志

### 4.2 请求参数

无

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
  "msg": "操作成功"
}
```

## 5. 登录日志需求说明

1. 登录日志记录：
   - 用户登录成功或失败时，系统自动记录登录日志
   - 记录内容包括用户名、IP地址、登录地点、浏览器类型、操作系统、登录状态、提示消息和登录时间
   - 登录地点通过IP地址解析获取

2. 日志查询：
   - 支持按用户名、IP地址、登录状态和时间范围进行查询
   - 查询结果支持分页显示

3. 日志管理：
   - 支持删除单条日志记录
   - 支持批量删除日志记录
   - 支持清空所有日志记录
   - 只有管理员角色可以执行删除和清空操作 