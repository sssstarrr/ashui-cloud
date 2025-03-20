// 登录接口需要携带的参数ts类型
export interface ILoginParams {
  loginName: string | number;
  password: string | number;
  securityCode?: string | number;
}

export interface ILoginPageParams {
  loginForm: ILoginParams;
}

// 通用响应结构
export interface IResponse<T = any> {
  code: number;
  msg: string;
  data: T;
}

// 个人中心相关接口类型定义
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
