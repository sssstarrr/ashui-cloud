// 导入二次封装axios
import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  KOI_LOGIN = "/auth/login",
  GET_CAPTCHA = "/auth/captcha"
}

// 登录接口方法
export const koiLogin = (params: any) => {
  return koi.post(API.KOI_LOGIN, params);
};

// 获取验证码
export const getCaptcha = () => {
  return koi.get(API.GET_CAPTCHA);
}; 