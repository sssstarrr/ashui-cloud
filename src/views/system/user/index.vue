<template>
  <div class="koi-flex">
    <KoiCard>
      <!-- 搜索条件 -->
      <el-form v-show="showSearch" :inline="true">
        <el-form-item label="登录账号" prop="username">
          <el-input
            placeholder="请输入登录账号"
            v-model="searchParams.username"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="nickname">
          <el-input
            placeholder="请输入用户名称"
            v-model="searchParams.nickname"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            placeholder="请输入手机号"
            v-model="searchParams.mobile"
            clearable
            style="width: 200px"
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="登录时间" prop="loginTime">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
          />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" icon="search" plain v-debounce="handleSearch">搜索</el-button>
          <el-button type="danger" icon="refresh" plain v-throttle="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格头部按钮 -->
      <el-row :gutter="10">
        <el-col :span="1.5" v-auth="['system:role:add']">
          <el-button type="primary" icon="plus" plain @click="handleAdd()">新增</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:update']">
          <el-button type="success" icon="edit" plain @click="handleUpdate()" :disabled="single">修改</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:delete']">
          <el-button type="danger" icon="delete" plain @click="handleBatchDelete()" :disabled="multiple">删除</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:update']">
          <el-button type="primary" icon="edit" plain @click="handleAssignRoles()" :disabled="single">分配角色</el-button>
        </el-col>
        <!-- <el-col :span="1.5" v-auth="['system:role:export']">
          <el-button type="warning" icon="download" plain>导出</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:role:import']">
          <el-button type="info" icon="upload" plain>导入</el-button>
        </el-col> -->
        <KoiToolbar v-model:showSearch="showSearch" @refreshTable="handleListPage"></KoiToolbar>
      </el-row>

      <div class="h-20px"></div>
      <!-- 数据表格 :data="tableList" -->
      <el-table
        v-loading="loading"
        border
        :data="tableList"
        empty-text="暂时没有数据哟🌻"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" prop="userId" width="50px" align="center">
          <template #default="scope">
            {{ (searchParams.pageNo - 1) * searchParams.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="登录账号"
          prop="loginName"
          width="120px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="头像" prop="avatar" width="80px" align="center">
          <template #default="scope">
            <div class="flex flex-justify-center">
              <el-image
                class="rounded-full w-36px h-36px"
                :preview-teleported="true"
                :preview-src-list="[scope.row.avatar]"
                :src="
                  scope.row.avatar != null && scope.row.avatar != ''
                    ? scope.row.avatar
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              >
                <template #error>
                  <el-icon class="text-[--el-color-primary]" :size="36">
                    <CircleCloseFilled />
                  </el-icon>
                </template>
              </el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名称"
          prop="userName"
          width="120px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="邮箱" prop="email" width="220px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="手机号" prop="phone" width="150px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="用户类型" prop="userType" width="100px" align="center">
          <template #default="scope">
            <KoiTag :tagOptions="userTypeOptions" :value="scope.row.userType"></KoiTag>
          </template>
        </el-table-column>
        <el-table-column label="用户性别" prop="sex" width="100px" align="center">
          <template #default="scope">
            <KoiTag :tagOptions="userSexOptions" :value="scope.row.sex"></KoiTag>
          </template>
        </el-table-column>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <el-table-column label="用户状态" prop="userStatus" width="100px" align="center">
          <template #default="scope">
            <!-- {{ scope.row.userStatus }} -->
            <el-switch
              v-model="scope.row.userStatus"
              active-text="启用"
              inactive-text="停用"
              active-value="0"
              inactive-value="1"
              :inline-prompt="true"
              @change="handleSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime" width="180px" align="center">
          <template #default="scope">
            {{ formatDate(scope.row.createTime) }}
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="remark" width="200px" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="150"
          fixed="right"
          v-auth="['system:role:update', 'system:role:delete']"
        >
          <template #default="{ row }">
            <el-tooltip content="修改🌻" placement="top">
              <el-button
                type="primary"
                icon="Edit"
                circle
                plain
                @click="handleUpdate(row)"
                v-auth="['system:role:update']"
              ></el-button>
            </el-tooltip>
            <el-tooltip content="删除🌻" placement="top">
              <el-button
                type="danger"
                icon="Delete"
                circle
                plain
                @click="handleDelete(row)"
                v-auth="['system:role:delete']"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="h-20px"></div>
      <!-- {{ searchParams.pageNo }} --- {{ searchParams.pageSize }} -->
      <!-- 分页 -->
      <el-pagination
        background
        v-model:current-page="searchParams.pageNo"
        v-model:page-size="searchParams.pageSize"
        v-show="total > 0"
        :page-sizes="[5, 8, 20, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleListPage"
        @current-change="handleListPage"
      />

      <!-- 添加 OR 修改 -->
      <KoiDrawer
        ref="koiDrawerRef"
        :title="title"
        @koiConfirm="handleConfirm"
        @koiCancel="handleCancel"
        :loading="confirmLoading"
      >
        <template #content>
          <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" status-icon>
            <el-row>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="登录账号" prop="username">
                  <el-input v-model="form.username" placeholder="请输入登录账号" clearable />
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="用户名称" prop="userTitle">
                  <el-input v-model="form.userTitle" placeholder="请输入用户名称" clearable />
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password clearable />
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="用户类型" prop="userType">
                  <el-select placeholder="请选择用户类型" v-model="form.userType" clearable>
                    <el-option
                      v-for="item in userTypeOptions"
                      :key="item.dictValue"
                      :label="item.dictLabel"
                      :value="item.dictValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="用户状态" prop="userStatus">
                  <el-select v-model="form.userStatus" placeholder="请选择用户状态" clearable>
                    <el-option label="启用" value="0" />
                    <el-option label="停用" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="用户头像" prop="avatar">
                  <KoiUploadImage v-model:imageUrl="form.avatar">
                    <template #content>
                      <el-icon><Avatar /></el-icon>
                      <span>请上传头像</span>
                    </template>
                    <template #tip>图片最大为 3M</template>
                  </KoiUploadImage>
                  <!-- <el-input v-model="form.avatar" placeholder="请输入用户头像地址" clearable /> -->
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :sm="{ span: 24 }" :xs="{ span: 24 }">
                <el-form-item label="用户备注" prop="remark">
                  <el-input v-model="form.remark" :rows="5" type="textarea" placeholder="请输入用户备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          {{ form }}
        </template>
      </KoiDrawer>

      <KoiDialog ref="koiDialogRef" title="分配角色" :height="450" :loading="confirmLoading" :footerHidden="true">
        <template #content>
          <div class="flex flex-justify-center">
            <el-transfer
              :props="{
                key: 'value',
                label: 'label'
              }"
              :titles="['角色列表', '拥有角色']"
              target-order="original"
              filterable
              filter-placeholder="关键字搜索"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
              }"
              v-model="transferRightList"
              :data="transferLeftList"
              @change="handleTransferChange"
            />
          </div>
        </template>
      </KoiDialog>
    </KoiCard>
  </div>
</template>

<script setup lang="ts" name="userPage">
// 已使用字典案例
import { nextTick, ref, reactive, onMounted } from "vue";
// @ts-ignore
import {
  koiMsgSuccess,
  koiNoticeSuccess,
  koiNoticeError,
  koiMsgError,
  koiMsgWarning,
  koiMsgBox,
  koiMsgInfo
} from "@/utils/koi.ts";
// @ts-ignore
import { listPage, getById, add, update, deleteById, batchDelete, updateStatus } from "@/api/system/user/index.ts";
import { listNormalRole, assignUserRole } from "@/api/system/role/index.ts";
// @ts-ignore
import { listDataByType } from "@/api/system/dict/data/index.ts";
import { koiDatePicker } from "@/utils/index.ts";
import type { IUserAddParams, IUserUpdateParams } from "@/api/system/user/type.ts";

// 表格加载动画Loading
const loading = ref(false);
// 是否显示搜索表单[默认显示]
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 表格数据
const tableList = ref<any>([]);

// 查询参数
const searchParams = ref({
  pageNo: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  username: "",
  nickname: "",
  mobile: ""
});

const total = ref<number>(0);

/** 重置搜索参数 */
const resetSearchParams = () => {
  searchParams.value = {
    pageNo: 1,
    pageSize: 10,
    username: "",
    nickname: "",
    mobile: ""
  };
  dateRange.value = [];
};

/** 搜索 */
const handleSearch = () => {
  console.log("搜索");
  searchParams.value.pageNo = 1;
  handleListPage();
};

/** 重置 */
const resetSearch = () => {
  console.log("重置搜索");
  resetSearchParams();
  handleListPage();
};

// 时间
const dateRange = ref();

/** @current-change：点击分页组件页码发生变化：例如：切换第2、3页 OR 上一页 AND 下一页 OR 跳转某一页 */
/** @size-change：点击分页组件下拉选择条数发生变化：例如：选择10条/页、20条/页等 */
// 分页查询，@current-change AND @size-change都会触发分页，调用后端分页接口
/** 数据表格 */
const handleListPage = async () => {
  try {
    loading.value = true;
    tableList.value = []; // 重置表格数据
    const res: any = await listPage(koiDatePicker(searchParams.value, dateRange.value));
    console.log("用户数据表格数据->", res.data);
    
    // 映射返回数据的字段名称以匹配表格中使用的字段名称
    // 保持后端返回的原始顺序
    if (res.data && res.data.rows) {
      tableList.value = res.data.rows.map((item: any) => ({
        userId: item.id,
        loginName: item.username,
        userName: item.nickname,
        userStatus: item.status,
        avatar: item.avatar,
        email: item.email,
        phone: item.mobile,
        userType: item.userType,
        sex: item.gender,
        createTime: item.createTime,
        remark: item.remark,
        // 保留其他原始字段
        ...item
      }));
      total.value = res.data.total;
    } else {
      tableList.value = [];
      total.value = 0;
    }
    
    loading.value = false;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
    loading.value = false;
  }
};

/** 数据表格[删除、批量删除等刷新使用] */
const handleTableData = async () => {
  try {
    const res: any = await listPage(koiDatePicker(searchParams.value, dateRange.value));
    // console.log("用户数据表格数据->", res.data);
    
    // 映射返回数据的字段名称以匹配表格中使用的字段名称
    // 保持后端返回的原始顺序
    if (res.data && res.data.rows) {
      tableList.value = res.data.rows.map((item: any) => ({
        userId: item.id,
        loginName: item.username,
        userName: item.nickname,
        userStatus: item.status,
        avatar: item.avatar,
        email: item.email,
        phone: item.mobile,
        userType: item.userType,
        sex: item.gender,
        createTime: item.createTime,
        remark: item.remark,
        // 保留其他原始字段
        ...item
      }));
      total.value = res.data.total;
    } else {
      tableList.value = [];
      total.value = 0;
    }
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
  }
};

onMounted(() => {
  // 获取表格数据
  handleListPage();
  handleDict1();
  handleDict2();
});

// 翻译数据[用户类型]
const userTypeOptions = ref();

/** 字典翻译tag */
const handleDict1 = async () => {
  try {
    userTypeOptions.value = [
      {
        dictLabel: "系统用户",
        dictValue: "1",
        dictTag: "primary",
        dictColor: ""
      },
      {
        dictLabel: "注册用户",
        dictValue: "2",
        dictTag: "warning",
        dictColor: ""
      }
    ];
    // const res: any = await listDataByType("sys_user_type");
    // console.log("字典数据", res.data);
    // userTypeOptions.value = res.data;
  } catch (error) {
    console.log(error);
    koiMsgError("数据字典查询失败，请刷新重试🌻");
  }
};

// 翻译数据[用户性别]
const userSexOptions = ref();

/** 字典翻译tag */
const handleDict2 = async () => {
  try {
    userSexOptions.value = [
      { dictLabel: "男", dictValue: "0", dictTag: "primary", dictColor: "" },
      { dictLabel: "女", dictValue: "1", dictTag: "danger", dictColor: "" },
      { dictLabel: "未知", dictValue: "2", dictTag: "info", dictColor: "" }
    ];
    // const res: any = await listDataByType("sys_user_sex");
    // console.log("字典数据", res.data);
    // userSexOptions.value = res.data;
  } catch (error) {
    console.log(error);
    koiMsgError("数据字典查询失败，请刷新重试🌻");
  }
};

const ids = ref([]); // 选择数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用

/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.userId);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 添加 */
const handleAdd = () => {
  // 打开对话框
  koiDrawerRef.value.koiOpen();
  koiMsgSuccess("添加🌻");
  // 重置表单
  resetForm();
  // 标题
  title.value = "用户添加";
  form.value.userStatus = "0";
  // 添加用户时密码字段必填
  const passwordRule = rules.password[0];
  passwordRule.required = true;
  passwordRule.message = "请输入密码";
};

/** 回显数据 */
const handleEcho = async (id: any) => {
  console.log("回显数据ID", id);
  if (id == null || id == "") {
    koiMsgWarning("请选择需要修改的数据🌻");
    return;
  }
  try {
    loading.value = true;
    const res: any = await getById(id);
    console.log(res.data);
    if (res.data) {
      // 映射后端返回的字段到表单字段
      form.value = {
        userId: res.data.id,
        userTitle: res.data.nickname,
        userType: res.data.userType,
        userStatus: res.data.status,
        avatar: res.data.avatar,
        phone: res.data.mobile,
        remark: res.data.remark,
        // 保留其他原始字段
        ...res.data
      };
    } else {
      koiMsgWarning("未找到用户数据");
    }
    loading.value = false;
  } catch (error) {
    console.error("获取用户详情失败:", error);
    koiNoticeError("数据获取失败，请检查网络连接或联系管理员🌻");
    loading.value = false;
  }
};

/** 修改 */
const handleUpdate = async (row?: any) => {
  // 打开对话框
  koiDrawerRef.value.koiOpen();
  koiMsgSuccess("修改🌻");
  // 重置表单
  resetForm();
  // 标题
  title.value = "用户修改";
  const userId = row ? row.userId : ids.value[0];
  if (userId == null || userId == "") {
    koiMsgError("请选择需要修改的数据🌻");
    koiDrawerRef.value.koiClose(); // 关闭抽屉
    return; // 提前返回
  }
  console.log(userId);
  // 回显数据
  handleEcho(userId);
  // 修改用户时密码字段可选
  const passwordRule = rules.password[0];
  passwordRule.required = false;
  passwordRule.message = "留空表示不修改密码";
};

// 添加 OR 修改抽屉Ref
const koiDrawerRef = ref();
// 标题
const title = ref("用户类型管理");
// form表单Ref
const formRef = ref<any>();

// form表单
let form = ref<any>({
  userTitle: "",
  userType: "",
  userStatus: "",
  avatar: "",
  phone: "",
  remark: "",
  username: "",
  password: ""
});

/** 清空表单数据 */
const resetForm = () => {
  // 等待 DOM 更新完成
  nextTick(() => {
    if (formRef.value) {
      // 重置该表单项，将其值重置为初始值，并移除校验结果
      formRef.value.resetFields();
    }
  });     
  form.value = {
    userTitle: "",
    userType: "",
    userStatus: "",
    avatar: "",
    phone: "",
    remark: "",
    username: "",
    password: ""
  };
};

/** 表单规则 */
const rules = reactive({
  userTitle: [{ required: true, message: "请输入用户名字", trigger: "blur" }],
  userType: [{ required: true, message: "请输入用户类型", trigger: "blur" }],
  userStatus: [{ required: true, message: "请输入选择用户状态", trigger: "blur" }],
  username: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

// 确定按钮是否显示Loading
const confirmLoading = ref(false);

/** 确定  */
const handleConfirm = () => {
  if (!formRef.value) return;
  confirmLoading.value = true;
  (formRef.value as any).validate(async (valid: any) => {
    if (valid) {
      console.log("表单ID", form.value.userId);
      try {
        // 准备提交的数据，根据API需要的格式转换字段
        const submitData = {
          id: form.value.userId,
          username: form.value.username,
          nickname: form.value.userTitle,
          password: form.value.password,
          userType: form.value.userType,
          status: form.value.userStatus,
          avatar: form.value.avatar,
          mobile: form.value.phone,
          remark: form.value.remark
        };
        
        if (form.value.userId != null && form.value.userId != "") {
          // 修改用户，如果密码为空则从提交数据中删除
          if (!submitData.password) {
            delete submitData.password;
          }
          await update(submitData);
          koiNoticeSuccess("修改成功🌻");
        } else {
          await add(submitData);
          koiNoticeSuccess("添加成功🌻");
        }
        confirmLoading.value = false;
        koiDrawerRef.value.koiQuickClose();
        resetForm();
        handleListPage();
      } catch (error) {
        console.log(error);
        confirmLoading.value = false;
        koiNoticeError(form.value.userId ? "修改失败，请刷新重试🌻" : "添加失败，请刷新重试🌻");
      }
    } else {
      koiMsgError("验证失败，请检查填写内容🌻");
      confirmLoading.value = false;
    }
  });
};

/** 取消 */
const handleCancel = () => {
  koiDrawerRef.value.koiClose();
};

/** 状态开关 */
const handleSwitch = (row: any) => {
  let text = row.userStatus === "0" ? "启用" : "停用";
  koiMsgBox("确认要[" + text + "]-[" + row.userName + "]吗？")
    .then(async () => {
      if (!row.userId || !row.userStatus) {
        koiMsgWarning("请选择需要修改的数据🌻");
        return;
      }
      try {
        await updateStatus(row.userId, row.userStatus);
        koiNoticeSuccess("修改成功🌻");
      } catch (error) {
        console.log(error);
        koiNoticeError("修改失败，请刷新重试🌻");
        handleTableData();
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

// 分配角色对话框
const koiDialogRef = ref();

/** 分配角色 */
const handleAssignRoles = async () => {
  try {
    // 传递当前登录用户ID
    const res: any = await listNormalRole(ids.value[0]);
    transferLeftList.value = res.data.data1; // 左侧所有数据，右边出现一样的会自动进行去除
    transferRightList.value = res.data.data2;
  } catch (error) {
    console.log(error);
    koiMsgError("加载角色数据失败");
  }
  koiDialogRef.value.koiOpen();
};
// 右侧选择数据，必须是['1']数据
const transferRightList = ref<string[]>([]);
const transferLeftList = ref<any>([]);

/** 右侧列表元素变化时触发 */
const handleTransferChange = async (value: any) => {
  console.log(value);
  try {
    await assignUserRole(value);
    koiNoticeSuccess("分配角色成功🌻");
  } catch (error) {
    console.log(error);
    handleAssignRoles();
    koiMsgError("分配角色失败，请重试");
  }
};

/** 删除 */
const handleDelete = (row: any) => {
  const id = row.userId;
  if (id == null || id == "") {
    koiMsgWarning("请选择需要删除的数据🌻");
    return;
  }
  koiMsgBox("您确认需要删除用户名称[" + row.userTitle + "]么？")
    .then(async () => {
      try {
        await deleteById(id);
        handleTableData();
        koiNoticeSuccess("删除成功🌻");
      } catch (error) {
        console.log(error);
        handleTableData();
        koiNoticeError("删除失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 批量删除 */
const handleBatchDelete = () => {
  if (ids.value.length == 0) {
    koiMsgInfo("请选择需要删除的数据🌻");
    return;
  }
  koiMsgBox("您确认需要进行批量删除么？")
    .then(async () => {
      try {
        console.log("ids", ids.value);
        await batchDelete(ids.value);
        handleTableData();
        koiNoticeSuccess("批量删除成功🌻");
      } catch (error) {
        console.log(error);
        koiNoticeError("批量删除失败，请刷新重试🌻");
        handleTableData();
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 日期格式化 */
const formatDate = (date: string) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const seconds = d.getSeconds().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<style lang="scss" scoped>
// 穿梭框高度调整
:deep(.el-transfer-panel__body) {
  height: 400px;
}
</style>
