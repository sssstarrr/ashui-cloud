# 用户管理相关接口文档

## 1. 获取用户列表

### 1.1 基本信息

> 请求路径：/api/system/user/list
>
> 请求方式：GET
>
> 接口描述：该接口用于获取用户列表数据，支持分页和条件查询

### 1.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

查询参数：

| 参数名     | 类型   | 是否必须 | 备注                      |
| ---------- | ------ | -------- | ------------------------- |
| pageNum    | number | 非必须   | 当前页码，默认为1         |
| pageSize   | number | 非必须   | 每页显示条数，默认为10    |
| username   | string | 非必须   | 用户名/登录名             |
| nickname   | string | 非必须   | 用户昵称                  |
| status     | string | 非必须   | 用户状态（0启用 1停用）   |
| mobile     | string | 非必须   | 手机号                    |
| beginTime  | string | 非必须   | 开始日期                  |
| endTime    | string | 非必须   | 结束日期                  |

### 1.3 响应数据

参数格式：application/json

参数说明：

| 参数名         | 类型   | 是否必须 | 备注                           |
| -------------- | ------ | -------- | ------------------------------ |
| code           | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg            | string | 非必须   | 提示信息                       |
| data           | object | 非必须   | 返回的数据                     |
| \|- total      | number | 必须     | 总记录数                       |
| \|- rows       | array  | 必须     | 用户数据列表                   |
| \|-- id        | number | 必须     | 用户ID                         |
| \|-- username  | string | 必须     | 用户名（登录名）               |
| \|-- nickname  | string | 必须     | 用户昵称                       |
| \|-- email     | string | 非必须   | 用户邮箱                       |
| \|-- mobile    | string | 非必须   | 手机号码                       |
| \|-- gender    | string | 必须     | 用户性别（0男 1女 2未知）      |
| \|-- status    | string | 必须     | 用户状态（0启用 1停用）        |
| \|-- avatar    | string | 非必须   | 头像地址                       |
| \|-- userType  | string | 非必须   | 用户类型                       |
| \|-- createTime| string | 非必须   | 创建时间                       |
| \|-- updateTime| string | 非必须   | 修改时间                       |
| \|-- roles     | array  | 非必须   | 用户角色列表                   |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "total": 2,
    "rows": [
      {
        "id": 1,
        "username": "admin",
        "nickname": "系统管理员",
        "email": "admin@ashui.cloud",
        "mobile": "18593114301",
        "gender": "0",
        "status": "0",
        "avatar": "https://example.com/avatar.png",
        "userType": "00",
        "createTime": "2023-11-23 18:00:00",
        "updateTime": "2023-11-23 18:00:00",
        "roles": [
          {
            "id": 1,
            "roleName": "超级管理员",
            "roleKey": "admin"
          }
        ]
      },
      {
        "id": 2,
        "username": "test",
        "nickname": "测试用户",
        "email": "test@ashui.cloud",
        "mobile": "13800138000",
        "gender": "1",
        "status": "0",
        "avatar": "https://example.com/avatar2.png",
        "userType": "01",
        "createTime": "2023-11-24 10:00:00",
        "updateTime": "2023-11-24 10:00:00",
        "roles": [
          {
            "id": 2,
            "roleName": "普通用户",
            "roleKey": "common"
          }
        ]
      }
    ]
  }
}
```

## 2. 获取用户详情

### 2.1 基本信息

> 请求路径：/api/system/user/{userId}
>
> 请求方式：GET
>
> 接口描述：该接口用于获取指定用户的详细信息

### 2.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

路径参数：

| 参数名 | 示例值 | 备注   |
| ------ | ------ | ------ |
| userId | 1      | 用户ID |

### 2.3 响应数据

参数格式：application/json

参数说明：

| 参数名       | 类型   | 是否必须 | 备注                           |
| ------------ | ------ | -------- | ------------------------------ |
| code         | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg          | string | 非必须   | 提示信息                       |
| data         | object | 非必须   | 返回的数据                     |
| \|- id       | number | 必须     | 用户ID                         |
| \|- username | string | 必须     | 用户名（登录名）               |
| \|- nickname | string | 必须     | 用户昵称                       |
| \|- email    | string | 非必须   | 用户邮箱                       |
| \|- mobile   | string | 非必须   | 手机号码                       |
| \|- gender   | string | 必须     | 用户性别（0男 1女 2未知）      |
| \|- status   | string | 必须     | 用户状态（0启用 1停用）        |
| \|- avatar   | string | 非必须   | 头像地址                       |
| \|- userType | string | 非必须   | 用户类型                       |
| \|- remark   | string | 非必须   | 备注信息                       |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "系统管理员",
    "email": "admin@ashui.cloud",
    "mobile": "18593114301",
    "gender": "0",
    "status": "0",
    "avatar": "https://example.com/avatar.png",
    "userType": "00",
    "remark": "系统默认管理员账号"
  }
}
```

## 3. 新增用户

### 3.1 基本信息

> 请求路径：/api/system/user
>
> 请求方式：POST
>
> 接口描述：该接口用于添加新用户

### 3.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

请求体格式：application/json

参数说明：

| 参数名   | 类型   | 是否必须 | 备注                      |
| -------- | ------ | -------- | ------------------------- |
| username | string | 必须     | 用户名（登录名）          |
| nickname | string | 必须     | 用户昵称                  |
| password | string | 必须     | 密码                      |
| email    | string | 非必须   | 用户邮箱                  |
| mobile   | string | 非必须   | 手机号码                  |
| gender   | string | 非必须   | 用户性别（0男 1女 2未知） |
| status   | string | 非必须   | 用户状态（0启用 1停用）   |
| avatar   | string | 非必须   | 头像地址                  |
| userType | string | 非必须   | 用户类型                  |
| remark   | string | 非必须   | 备注信息                  |
| roleIds  | array  | 非必须   | 角色ID数组                |

请求参数样例：

```json
{
  "username": "testuser",
  "nickname": "测试用户",
  "password": "123456",
  "email": "test@example.com",
  "mobile": "13800138000",
  "gender": "0",
  "status": "0",
  "userType": "01",
  "remark": "测试账号",
  "roleIds": [2]
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
  "msg": "新增成功"
}
```

## 4. 修改用户

### 4.1 基本信息

> 请求路径：/api/system/user
>
> 请求方式：PUT
>
> 接口描述：该接口用于修改用户信息

### 4.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

请求体格式：application/json

参数说明：

| 参数名   | 类型   | 是否必须 | 备注                      |
| -------- | ------ | -------- | ------------------------- |
| id       | number | 必须     | 用户ID                    |
| username | string | 必须     | 用户名（登录名）          |
| nickname | string | 必须     | 用户昵称                  |
| password | string | 非必须   | 密码，不填则不修改密码    |
| email    | string | 非必须   | 用户邮箱                  |
| mobile   | string | 非必须   | 手机号码                  |
| gender   | string | 非必须   | 用户性别（0男 1女 2未知） |
| status   | string | 非必须   | 用户状态（0启用 1停用）   |
| avatar   | string | 非必须   | 头像地址                  |
| userType | string | 非必须   | 用户类型                  |
| remark   | string | 非必须   | 备注信息                  |
| roleIds  | array  | 非必须   | 角色ID数组                |

请求参数样例：

```json
{
  "id": 2,
  "username": "testuser",
  "nickname": "测试用户已修改",
  "email": "test@example.com",
  "mobile": "13800138001",
  "gender": "1",
  "status": "0",
  "userType": "01",
  "remark": "测试账号已修改",
  "roleIds": [2, 3]
}
```

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
  "msg": "修改成功"
}
```

## 5. 删除用户

### 5.1 基本信息

> 请求路径：/api/system/user/{userId}
>
> 请求方式：DELETE
>
> 接口描述：该接口用于删除指定用户

### 5.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

路径参数：

| 参数名 | 示例值 | 备注   |
| ------ | ------ | ------ |
| userId | 2      | 用户ID |

### 5.3 响应数据

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
  "msg": "删除成功"
}
```

## 6. 批量删除用户

### 6.1 基本信息

> 请求路径：/api/system/user/batch
>
> 请求方式：POST
>
> 接口描述：该接口用于批量删除用户

### 6.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

请求体格式：application/json

参数说明：

| 参数名  | 类型  | 是否必须 | 备注        |
| ------- | ----- | -------- | ----------- |
| userIds | array | 必须     | 用户ID数组  |

请求参数样例：

```json
{
  "userIds": [2, 3, 4]
}
```

### 6.3 响应数据

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
  "msg": "批量删除成功"
}
```

## 7. 修改用户状态

### 7.1 基本信息

> 请求路径：/api/system/user/status
>
> 请求方式：PUT
>
> 接口描述：该接口用于修改用户状态（启用/停用）

### 7.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

请求体格式：application/json

参数说明：

| 参数名 | 类型   | 是否必须 | 备注                    |
| ------ | ------ | -------- | ----------------------- |
| id     | number | 必须     | 用户ID                  |
| status | string | 必须     | 用户状态（0启用 1停用） |

请求参数样例：

```json
{
  "id": 2,
  "status": "1"
}
```

### 7.3 响应数据

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
  "msg": "状态修改成功"
}
```

## 8. 获取用户角色信息

### 8.1 基本信息

> 请求路径：/api/system/user/roles/{userId}
>
> 请求方式：GET
>
> 接口描述：该接口用于获取指定用户已分配的角色和可选角色列表

### 8.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

路径参数：

| 参数名 | 示例值 | 备注   |
| ------ | ------ | ------ |
| userId | 2      | 用户ID |

### 8.3 响应数据

参数格式：application/json

参数说明：

| 参数名           | 类型   | 是否必须 | 备注                           |
| ---------------- | ------ | -------- | ------------------------------ |
| code             | number | 必须     | 响应码，200 代表成功，其他代表失败 |
| msg              | string | 非必须   | 提示信息                       |
| data             | object | 非必须   | 返回的数据                     |
| \|- user         | object | 必须     | 用户基本信息                   |
| \|-- id          | number | 必须     | 用户ID                         |
| \|-- username    | string | 必须     | 用户名（登录名）               |
| \|-- nickname    | string | 必须     | 用户昵称                       |
| \|- roles        | array  | 必须     | 所有可选角色列表               |
| \|-- id          | number | 必须     | 角色ID                         |
| \|-- roleName    | string | 必须     | 角色名称                       |
| \|-- roleKey     | string | 必须     | 角色权限字符串                 |
| \|-- status      | string | 必须     | 角色状态                       |
| \|-- createTime  | string | 非必须   | 创建时间                       |
| \|- checkedRoles | array  | 必须     | 已分配角色ID列表               |

响应数据样例：

```json
{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "user": {
      "id": 2,
      "username": "test",
      "nickname": "测试用户"
    },
    "roles": [
      {
        "id": 1,
        "roleName": "超级管理员",
        "roleKey": "admin",
        "status": "0",
        "createTime": "2023-11-23 18:00:00"
      },
      {
        "id": 2,
        "roleName": "普通用户",
        "roleKey": "common",
        "status": "0",
        "createTime": "2023-11-23 18:00:00"
      }
    ],
    "checkedRoles": [2]
  }
}
```

## 9. 分配用户角色

### 9.1 基本信息

> 请求路径：/api/system/user/roles
>
> 请求方式：POST
>
> 接口描述：该接口用于分配用户角色

### 9.2 请求参数

请求头：

| 参数名 | 示例值                        | 备注      |
| ------ | ----------------------------- | --------- |
| token  | eyJhbGciOiJIUzI1NiIsInR5c... | JWT令牌值 |

请求体格式：application/json

参数说明：

| 参数名  | 类型   | 是否必须 | 备注       |
| ------- | ------ | -------- | ---------- |
| userId  | number | 必须     | 用户ID     |
| roleIds | array  | 必须     | 角色ID数组 |

请求参数样例：

```json
{
  "userId": 2,
  "roleIds": [2, 3]
}
```

### 9.3 响应数据

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
  "msg": "分配角色成功"
}
```

## 10. 用户管理权限说明

1. 用户查询：用户列表页查看权限
   - 系统管理员可以查看所有用户
   - 普通管理员只能查看自己创建的用户

2. 用户编辑：
   - 管理员可以编辑普通用户信息
   - 普通用户只能编辑自己的基本信息
   - 不可修改超级管理员信息

3. 用户删除：
   - 可以单个或批量删除普通用户
   - 不能删除超级管理员账号
   - 不能删除自己当前登录的账号

4. 密码策略：
   - 密码长度不得少于6位
   - 建议包含字母、数字和特殊字符
   - 定期更新密码以提高安全性

5. 状态变更：
   - 可以启用或停用用户账号
   - 当用户账号被停用时，该用户将无法登录系统 