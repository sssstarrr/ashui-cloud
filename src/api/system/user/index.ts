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
  LIST_PAGE = "/koi/sysLoginUser/listPage",
  GET_BY_ID = "/koi/sysLoginUser/getById",
  UPDATE = "/koi/sysLoginUser/update",
  ADD = "/koi/sysLoginUser/add",
  DELETE = "/koi/sysLoginUser/deleteById",
  BATCH_DELETE = "/koi/sysLoginUser/batchDelete",
  UPDATE_STATUS = "/koi/sysLoginUser/updateStatus",
  // 个人中心相关接口
  PROFILE_GET = "/system/user/profile",
  PROFILE_UPDATE = "/system/user/profile",
  PROFILE_UPDATE_PWD = "/system/user/profile/updatePwd",
  PROFILE_UPLOAD_AVATAR = "/system/user/profile/avatar"
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
  return koi.get(API.GET_BY_ID + "/" + id);
};

// 根据ID进行修改
export const update = (data: any) => {
  return koi.post(API.UPDATE, data);
};

// 添加
export const add = (data: any) => {
  if (!data.postIds || data.postIds.length === 0) {
    data.postIds = [-1];
  }
  if (!data.roleIds || data.roleIds.length === 0) {
    data.roleIds = [-1];
  }
  return koi.post(API.ADD, data);
};

// 删除
export const deleteById = (id: any) => {
  return koi.post(API.DELETE + "/" + id);
};

// 批量删除
export const batchDelete = (ids: any) => {
  return koi.post(API.BATCH_DELETE, ids); // 第一种传参方式
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return koi.post(API.UPDATE_STATUS + "/" + id + "/" + status); // 第一种传参方式
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
