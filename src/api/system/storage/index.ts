import koi from "@/utils/axios.ts";

// 统一管理接口
enum API {
  GET_CONFIG = "/system/storage/config",
  UPDATE_TYPE = "/system/storage/type",
  UPDATE_LOCAL = "/system/storage/local",
  UPDATE_UPYUN = "/system/storage/upyun",
  TEST_STORAGE = "/system/storage/test"
}

/**
 * 获取存储配置
 */
export function getStorageConfig() {
  return koi.get(API.GET_CONFIG);
}

/**
 * 更新存储类型
 * @param type 存储类型
 */
export function updateStorageType(type: string) {
  return koi.put(API.UPDATE_TYPE, { type });
}

/**
 * 更新本地存储配置
 * @param data 配置数据
 */
export function updateLocalConfig(data: {
  storagePath?: string;
  accessPath?: string;
  domain?: string;
}) {
  return koi.put(API.UPDATE_LOCAL, data);
}

/**
 * 更新又拍云存储配置
 * @param data 配置数据
 */
export function updateUpYunConfig(data: {
  bucketName?: string;
  operatorName?: string;
  operatorPwd?: string;
  domain?: string;
}) {
  return koi.put(API.UPDATE_UPYUN, data);
}

/**
 * 测试存储配置
 * @param type 存储类型
 */
export function testStorage(type: string) {
  return koi.post(API.TEST_STORAGE, { type });
} 