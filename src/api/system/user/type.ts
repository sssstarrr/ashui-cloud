/**
 * 登录接口需要携带的参数ts类型
 */
export interface ILoginParams {
  loginName: string | number;
  password: string | number;
  securityCode?: string | number;
}

export interface ILoginPageParams {
  loginForm: ILoginParams;
}

/**
 * 通用响应结构
 */
export interface IResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * 个人中心相关接口类型定义
 */
// 个人信息响应类型
export interface IProfileInfo {
  id: number;
  username: string;
  nickname: string;
  email: string;
  mobile: string;
  gender: string;
  avatar: string;
  createTime: string;
  updateTime: string;
  roles: Array<{
    id: number;
    roleName: string;
    roleKey: string;
  }>;
}

// 更新个人信息请求类型
export interface IProfileUpdateParams {
  nickname: string;
  email: string;
  mobile: string;
  gender: string;
}

// 修改密码请求类型
export interface IPasswordUpdateParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 头像上传响应类型
export interface IUploadAvatarResult {
  url: string;
}

/**
 * 用户接口类型定义
 */
export interface IUserAddParams {
  username: string;  // 登录账号
  nickname: string;  // 用户名称
  password: string;  // 密码
  email?: string;    // 邮箱
  mobile?: string;   // 手机号
  status?: string;   // 用户状态
  avatar?: string;   // 头像
  gender?: string;   // 性别
  userType?: string; // 用户类型
  remark?: string;   // 备注
}

export interface IUserUpdateParams extends Omit<IUserAddParams, 'password'> {
  id: number | string;
  password?: string;  // 修改时密码可选
}
