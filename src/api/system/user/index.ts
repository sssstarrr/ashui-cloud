// 导入二次封装axios
import koi from "@/utils/axios.ts";
// 引入接口类型
import type { 
  ILoginParams, 
  IProfileInfo,
  IProfileUpdateParams,
  IPasswordUpdateParams,
  IUploadAvatarResult,
  IResponse
} from "./type.ts";

// 统一管理接口
enum API {
  KOI_LOGIN = "/auth/login",
  KOI_DYNAMIC_DATA = "/koi/sysLoginUser/getLoginUserInfo",
  KOI_USERINFO = "/user/info",
  LIST_PAGE = "/system/user/list",
  GET_BY_ID = "/system/user",
  UPDATE = "/system/user",
  ADD = "/system/user",
  DELETE = "/system/user",
  BATCH_DELETE = "/system/user/batch",
  UPDATE_STATUS = "/system/user/status",
  // 字典数据相关接口
  DICT_DATA_BY_TYPE = "/koi/sysDictData/listDataByType",
  // 个人中心相关接口
  PROFILE_GET = "/system/user/profile",
  PROFILE_UPDATE = "/system/user/profile",
  PROFILE_UPDATE_PWD = "/system/user/profile/updatePwd",
  PROFILE_UPLOAD_AVATAR = "/system/user/profile/avatar",
  // 用户管理接口
  USER_LIST = "/system/user/list",
  USER_DETAIL = "/system/user",
  USER_ADD = "/system/user",
  USER_UPDATE = "/system/user",
  USER_DELETE = "/system/user",
  USER_BATCH_DELETE = "/system/user/batch",
  USER_STATUS = "/system/user/status",
  USER_ROLES = "/system/user/roles"
}
// 暴露请求函数
// 登录接口方法
export const koiLogin = (params: ILoginParams) => {
  return koi.post(API.KOI_LOGIN, params);
};

// 通过token查询相关用户信息、按钮权限、菜单权限数据，token必须有效
export const koiDynamicData = () => {
  return koi.get(API.KOI_DYNAMIC_DATA);
};

// 查询用户信息
export const koiUserInfo = (params: ILoginParams) => {
  return koi.get(API.KOI_USERINFO, params);
};

// 多条件分页查询数据
export const listPage = (params: any) => {
  return koi.get(API.LIST_PAGE, params);
};

// 根据ID进行查询
export const getById = (id: any) => {
  return koi.get(`${API.GET_BY_ID}/${id}`);
};

// 根据ID进行修改
export const update = (data: any) => {
  return koi.put(API.UPDATE, data);
};

// 新增
export const add = (data: any) => {
  return koi.post(API.ADD, data);
};

// 删除
export const deleteById = (id: any) => {
  return koi.delete(`${API.DELETE}/${id}`);
};

// 批量删除
export const batchDelete = (ids: any) => {
  return koi.post(API.BATCH_DELETE, ids);
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  // 确保传递正确的参数格式，后端需要 {id, status} 对象
  return koi.put(API.UPDATE_STATUS, { id, status });
};

// 个人中心相关接口

/**
 * 获取个人信息
 * @returns Promise<IResponse<IProfileInfo>>
 */
export const getProfile = () => {
  return koi.get<IResponse<IProfileInfo>>(API.PROFILE_GET);
};

/**
 * 更新个人信息
 * @param data 个人信息更新参数
 * @returns Promise<IResponse>
 */
export const updateProfile = (data: IProfileUpdateParams) => {
  return koi.put<IResponse>(API.PROFILE_UPDATE, data);
};

/**
 * 修改密码
 * @param data 密码更新参数
 * @returns Promise<IResponse>
 */
export const updatePassword = (data: IPasswordUpdateParams) => {
  return koi.put<IResponse>(API.PROFILE_UPDATE_PWD, data);
};

/**
 * 上传头像
 * @param file 头像文件
 * @returns Promise<IResponse<IUploadAvatarResult>>
 */
export const uploadAvatar = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return koi.upload<IResponse<IUploadAvatarResult>>(API.PROFILE_UPLOAD_AVATAR, formData);
};

/**
 * 获取用户列表
 * @param params 查询参数
 * @returns 用户列表
 */
export function getUserList(params: any) {
  return koi.get(API.USER_LIST, { params })
}

/**
 * 获取用户详情
 * @param userId 用户ID
 * @returns 用户详情
 */
export function getUserDetail(userId: string | number) {
  // 直接使用已有的getById函数保持一致性
  return getById(userId);
}

/**
 * 添加用户
 * @param data 用户数据
 * @returns 添加结果
 */
export function addUser(data: any) {
  return koi.post(API.USER_ADD, data)
}

/**
 * 修改用户
 * @param data 用户数据
 * @returns 修改结果
 */
export function updateUser(data: any) {
  return koi.put(API.USER_UPDATE, data)
}

/**
 * 删除用户
 * @param userId 用户ID
 * @returns 删除结果
 */
export function deleteUser(userId: string) {
  return koi.delete(API.USER_DELETE + "/" + userId)
}

/**
 * 批量删除用户
 * @param userIds 用户ID数组
 * @returns 删除结果
 */
export function batchDeleteUsers(userIds: string[]) {
  return koi.post(API.USER_BATCH_DELETE, { userIds })
}

/**
 * 修改用户状态
 * @param userId 用户ID
 * @param status 状态值 (0启用 1停用)
 * @returns 修改结果
 */
export function changeUserStatus(userId: string, status: string) {
  return koi.put(API.USER_STATUS, { id: userId, status: status })
}

/**
 * 获取用户角色信息
 * @param userId 用户ID
 * @returns 用户角色信息
 */
export function getUserRoles(userId: string) {
  return koi.get(API.USER_ROLES + "/" + userId)
}

/**
 * 分配用户角色
 * @param data 用户角色数据
 * @returns 分配结果
 */
export function assignUserRoles(data: any) {
  return koi.post(API.USER_ROLES, data)
}

/**
 * 根据字典类型获取字典数据
 * @param dictType 字典类型
 * @returns 字典数据列表
 */
export function getDictDataByType(dictType: string) {
  return koi.get(`${API.DICT_DATA_BY_TYPE}/${dictType}`);
}
