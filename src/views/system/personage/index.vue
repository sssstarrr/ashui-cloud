<template>
  <div class="p-4px">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card>
          <div class="text-13px text-#303133 dark:text-#E5EAF3">
            <div class="flex flex-justify-center">
              <KoiUploadImage v-model:imageUrl="mine.avatar" @update:imageUrl="handleAvatarUpload">
                <template #content>
                  <el-icon><Avatar /></el-icon>
                  <span>请上传头像</span>
                </template>
              </KoiUploadImage>
            </div>
            <div class="flex flex-justify-between flex-wrap mt-20px p-y-12px">
              <div class="flex flex-items-center">
                <el-icon size="15"> <UserFilled /> </el-icon>
                <div class="p-l-2px">登录名称</div>
              </div>
              <div v-text="mine.loginName"></div>
            </div>
            <div class="flex flex-justify-between flex-wrap p-y-12px">
              <div class="flex flex-items-center">
                <el-icon size="15"> <User /> </el-icon>
                <div class="p-l-2px">用户名称</div>
              </div>
              <div v-text="mine.userName"></div>
            </div>
            <div class="flex flex-justify-between flex-wrap p-y-12px">
              <div class="flex flex-items-center">
                <el-icon size="15"> <Iphone /> </el-icon>
                <div class="p-l-2px">手机号码</div>
              </div>
              <div v-text="mine.phone"></div>
            </div>
            <div class="flex flex-justify-between flex-wrap p-y-12px">
              <div class="flex flex-items-center">
                <el-icon size="15"> <Message /> </el-icon>
                <div class="p-l-2px">用户邮箱</div>
              </div>
              <div v-text="mine.email"></div>
            </div>
            <div class="flex flex-justify-between flex-wrap p-y-12px">
              <div class="flex flex-items-center">
                <el-icon size="15"> <Collection /> </el-icon>
                <div class="p-l-2px">所属角色</div>
              </div>
              <div v-text="mine.roleName"></div>
            </div>
            <div class="flex flex-justify-between flex-wrap p-y-12px">
              <div class="flex items-center">
                <el-icon size="15"> <Calendar /> </el-icon>
                <div class="p-l-2px">创建日期</div>
              </div>
              <div v-text="mine.createTime"></div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card :body-style="{ 'padding-top': '6px' }">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本资料" name="first">
              <el-form ref="mineFormRef" :rules="mineRules" :model="mineForm" label-width="80px" status-icon>
                <el-row>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="登录名称" prop="loginName">
                      <el-input v-model="mineForm.loginName" placeholder="请输入登录名称" clearable disabled />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="用户昵称" prop="nickname">
                      <el-input v-model="mineForm.nickname" placeholder="请输入用户昵称" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="手机号码" prop="phone">
                      <el-input v-model="mineForm.phone" placeholder="请输入手机号码" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="mineForm.email" placeholder="请输入邮箱" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="性别" prop="sex">
                      <el-radio-group v-model="mineForm.sex" placeholder="请选择性别">
                        <el-radio value="0" border>男</el-radio>
                        <el-radio value="1" border>女</el-radio>
                        <el-radio value="2" border>未知</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }" class="mt-6px">
                    <el-form-item>
                      <el-button type="primary" plain @click="handleMineSave">保存</el-button>
                      <el-button type="danger" plain @click="resetMineForm">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="second">
              <el-form ref="pwdFormRef" :rules="pwdRules" :model="pwdForm" label-width="80px" status-icon>
                <el-row>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="旧密码" prop="oldPassword">
                      <el-input v-model="pwdForm.oldPassword" placeholder="请输入旧密码" show-password clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="新密码" prop="newPassword">
                      <el-input v-model="pwdForm.newPassword" placeholder="请输入新密码" show-password clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                    <el-form-item label="确认密码" prop="confirmPassword">
                      <el-input v-model="pwdForm.confirmPassword" placeholder="请输入确认密码" show-password clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="{ span: 24 }" :xs="{ span: 24 }" class="mt-6px">
                    <el-form-item>
                      <el-button type="primary" plain @click="handlePwdSave">保存</el-button>
                      <el-button type="danger" plain @click="resetPwdForm">重置</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="personagePage">
import { nextTick, ref, reactive, onMounted } from "vue";
import { koiMsgError, koiMsgSuccess } from "@/utils/koi.ts";
// 导入API
import { getProfile, updateProfile, updatePassword, uploadAvatar } from "@/api/system/user/index.ts";
import type { IProfileUpdateParams, IPasswordUpdateParams } from "@/api/system/user/type.ts";
import { koiSessionStorage, koiLocalStorage } from "@/utils/storage.ts";
import { LOGIN_URL } from "@/config/index.ts";

// 个人信息
const mine = ref({
  avatar: "",
  loginName: "",
  userName: "",
  phone: "",
  email: "",
  roleName: "",
  createTime: ""
});

// el-card标签选择name
const activeName = ref("first");

// 获取个人信息
const fetchProfileInfo = async () => {
  try {
    const res = await getProfile();
    if (res.code === 200) {
      const data = res.data;
      // 映射后端数据到前端显示格式
      mine.value = {
        avatar: data.avatar || "",
        loginName: data.username,
        userName: data.nickname,
        phone: data.mobile,
        email: data.email,
        roleName: data.roles && data.roles.length > 0 ? data.roles[0].roleName : "",
        createTime: data.createTime
      };
      
      // 同时填充表单数据
      mineForm.value = {
        loginName: data.username,
        nickname: data.nickname,
        phone: data.mobile,
        email: data.email,
        sex: data.gender
      };
    } else {
      koiMsgError("获取个人信息失败：" + res.msg);
    }
  } catch (error) {
    console.error("获取个人信息出错", error);
    koiMsgError("获取个人信息出错，请稍后重试");
  }
};

// 页面加载时获取数据
onMounted(() => {
  fetchProfileInfo();
});

/** 基本资料 Begin  */

// form表单Ref
const mineFormRef = ref<any>();
// form表单
let mineForm = ref<any>({
  loginName: "",
  nickname: "",
  phone: "",
  email: "",
  sex: "2"
});
/** 清空表单数据 */
const resetMineForm = () => {
  // 重新获取个人信息
  fetchProfileInfo();
};
/** 表单规则 */
const mineRules = reactive({
  loginName: [{ required: true, message: "请输入登录名称", trigger: "blur" }],
  nickname: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
  phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
  email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }]
});

/** 保存 */
const handleMineSave = () => {
  if (!mineFormRef.value) return;
  (mineFormRef.value as any).validate(async (valid: any) => {
    if (valid) {
      try {
        // 映射前端字段到后端字段
        const params: IProfileUpdateParams = {
          nickname: mineForm.value.nickname,
          email: mineForm.value.email,
          mobile: mineForm.value.phone,
          gender: mineForm.value.sex
        };
        
        const res = await updateProfile(params);
        if (res.code === 200) {
          koiMsgSuccess(res.msg || "保存成功");
          // 更新成功后重新获取个人信息
          fetchProfileInfo();
        } else {
          koiMsgError(res.msg || "保存失败");
        }
      } catch (error) {
        console.error("更新个人信息出错", error);
        koiMsgError("更新个人信息出错，请稍后重试");
      }
    } else {
      koiMsgError("验证失败，请检查填写内容");
    }
  });
};

/** 基本资料 End  */

/** 修改密码 Begin  */
// form表单Ref
const pwdFormRef = ref<any>();
// form表单
let pwdForm = ref<any>({
  oldPassword: "",
  newPassword: "",
  confirmPassword: ""
});

/** 清空表单数据 */
const resetPwdForm = () => {
  // 等待 DOM 更新完成
  nextTick(() => {
    if(pwdFormRef.value) {
      // 重置该表单项，将其值重置为初始值，并移除校验结果
      pwdFormRef.value.resetFields();
    }
  });    
  pwdForm.value = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  };
};

/** 表单规则 */
const pwdRules = reactive({
  oldPassword: [{ required: true, message: "请输入旧密码", trigger: "change" }],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "change" },
    { min: 8, message: "密码长度至少8位", trigger: "change" },
    { 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,}$/,
      message: "密码必须包含大小写字母和数字",
      trigger: "change"
    }
  ],
  confirmPassword: [
    { required: true, message: "请输入确认密码", trigger: "change" },
    { 
      validator: (_: any, value: string, callback: any) => {
        if (value !== pwdForm.value.newPassword) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "change"
    }
  ]
});

/** 保存密码 */
const handlePwdSave = () => {
  if (!pwdFormRef.value) return;
  (pwdFormRef.value as any).validate(async (valid: any) => {
    if (valid) {
      try {
        const params: IPasswordUpdateParams = {
          oldPassword: pwdForm.value.oldPassword,
          newPassword: pwdForm.value.newPassword,
          confirmPassword: pwdForm.value.confirmPassword
        };
        
        const res = await updatePassword(params);
        if (res.code === 200) {
          koiMsgSuccess(res.msg || "密码修改成功，即将跳转到登录页面");
          // 清空表单
          resetPwdForm();
          
          // 密码修改成功后，清除登录信息并跳转到登录页
          setTimeout(() => {
            // 清除用户会话和本地存储
            koiSessionStorage.clear();
            koiLocalStorage.remove("user");
            koiLocalStorage.remove("keepAlive");
            koiLocalStorage.remove("tabs");
            // 跳转到登录页
            window.location.replace(LOGIN_URL);
          }, 1500);
        } else {
          koiMsgError(res.msg || "密码修改失败");
        }
      } catch (error) {
        console.error("修改密码出错", error);
        koiMsgError("修改密码出错，请稍后重试");
      }
    } else {
      koiMsgError("验证失败，请检查填写内容");
    }
  });
};

/** 修改密码 End  */

/** 上传头像 Begin */
const handleAvatarUpload = async (file: File | string) => {
  // 如果是字符串(URL)，直接返回
  if (typeof file === 'string' || !file) return;
  
  // 检查文件类型和大小
  const isImage = file.type.startsWith('image/');
  const isLt3M = file.size / 1024 / 1024 < 3;

  if (!isImage) {
    koiMsgError("只能上传图片文件！");
    return;
  }
  if (!isLt3M) {
    koiMsgError("图片大小不能超过 3MB！");
    return;
  }

  try {
    const res = await uploadAvatar(file);
    if (res.code === 200) {
      koiMsgSuccess(res.msg || "头像上传成功");
      // 上传成功后更新头像URL
      mine.value.avatar = res.data.url;
      // 重新获取个人信息
      fetchProfileInfo();
    } else {
      console.error("头像上传失败", res);
      koiMsgError(res.msg || "头像上传失败");
    }
  } catch (error) {
    console.error("上传头像出错", error);
    koiMsgError("上传头像出错，请稍后重试");
  }
};
/** 上传头像 End */
</script>

<style lang="scss" scoped>

</style>
