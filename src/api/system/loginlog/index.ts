// 导入二次封装axios
import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  LIST_PAGE = "/system/loginlog/list",
  GET_BY_ID = "/koi/sysLoginLog/getById",
  UPDATE = "/koi/sysLoginLog/update",
  ADD = "/koi/sysLoginLog/add",
  DELETE = "/system/loginlog",
  BATCH_DELETE = "/system/loginlog/batch",
  UPDATE_STATUS = "/koi/sysLoginLog/updateStatus",
  CLEAN = "/system/loginlog/clean"
}

// 多条件分页查询数据
export const listPage = (params: any) => {
  return koi.get(API.LIST_PAGE, params);
};

// 根据ID查询
export const getById = (id: any) => {
  return koi.get(API.GET_BY_ID + "/" + id);
};

// 添加
export const add = (params: any) => {
  return koi.post(API.ADD, params);
};

// 修改
export const update = (params: any) => {
  return koi.put(API.UPDATE, params);
};

// 删除单条数据
export const deleteById = (id: number) => {
  return koi.delete(`${API.DELETE}/${id}`);
};

// 批量删除数据
export const batchDelete = (ids: number[]) => {
  return koi.post(API.BATCH_DELETE, ids);
};

// 修改状态
export const updateStatus = (id: any, status: any) => {
  return koi.post(API.UPDATE_STATUS + "/" + id + "/" + status); // 第一种传参方式
};

// 清空登录日志
export const cleanLoginLog = () => {
  return koi.delete(API.CLEAN);
};
