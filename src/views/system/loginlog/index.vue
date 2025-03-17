<template>
  <div class="koi-flex">
    <KoiCard>
      <!-- 搜索条件 -->
      <el-form v-show="showSearch" :inline="true">
        <el-form-item label="用户名称" prop="loginName">
          <el-input
            placeholder="请输入用户名称"
            v-model="searchParams.loginName"
            style="width: 200px"
            clearable
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddress">
          <el-input
            placeholder="请输入IP地址"
            v-model="searchParams.ipAddress"
            style="width: 200px"
            clearable
            @keyup.enter.native="handleListPage"
          ></el-input>
        </el-form-item>
        <el-form-item label="登录状态" prop="loginStatus">
          <el-select
            placeholder="请选择日志状态"
            v-model="searchParams.loginStatus"
            style="width: 200px"
            clearable
            @keyup.enter.native="handleListPage"
          >
            <el-option label="登录成功" value="0" />
            <el-option label="登录失败" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问时间" prop="loginTime">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            range-separator="至"
            end-placeholder="结束日期"
            :default-time="[new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" plain v-debounce="handleSearch">搜索</el-button>
          <el-button type="danger" icon="refresh" plain v-throttle="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 表格头部按钮 -->
      <el-row :gutter="10">
        <el-col :span="1.5" v-auth="['system:loginlog:remove']">
          <el-button type="danger" icon="delete" plain @click="handleBatchDelete()" :disabled="multiple">删除</el-button>
        </el-col>
        <el-col :span="1.5" v-auth="['system:loginlog:remove']">
          <el-button type="danger" icon="delete" plain @click="handleCleanLog()">清空</el-button>
        </el-col>
        <KoiToolbar v-model:showSearch="showSearch" @refreshTable="handleListPage"></KoiToolbar>
      </el-row>

      <div class="h-20px"></div>
      <!-- 数据表格 -->
      <el-table
        v-loading="loading"
        border
        :data="tableList"
        empty-text="暂时没有数据哟🌻"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" prop="loginId" width="80px" align="center" type="index"></el-table-column>
        <el-table-column
          label="登录用户"
          prop="username"
          width="130px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="IP地址"
          prop="ipAddress"
          width="160px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="登录地址"
          prop="loginLocation"
          width="260px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="登录状态" prop="status" width="100px" align="center" :show-overflow-tooltip="true">
          <template #default="scope">
            <el-tag :type="scope.row.status == '0' ? 'primary' : scope.row.status == '1' ? 'danger' : 'warning'">
              <!-- :type是用来判断块状的颜色 -->
              <!-- 里面填写内容 -->
              {{ scope.row.status == "0" ? "登录成功" : scope.row.status == "1" ? "登录失败" : "未知状态" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="浏览器"
          prop="browser"
          width="150px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column 
          label="操作系统" 
          prop="os" 
          width="150px" 
          align="center" 
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="登录信息"
          prop="msg"
          width="150px"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 注意：如果后端数据返回的是字符串"0" OR "1"，这里的active-value AND inactive-value不需要加冒号，会认为是字符串，否则：后端返回是0 AND 1数字，则需要添加冒号 -->
        <!-- <el-table-column
          label="是否冻结"
          prop="loginStatus"
          width="100px"
          align="center"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.loginStatus"
              active-text="启用"
              inactive-text="停用"
              active-value="0"
              inactive-value="1"
              :inline-prompt="true"
              @change="handleSwitch(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="登录时间" prop="loginTime" width="180px" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="120" fixed="right">
          <template #default="{ row }">
            <el-tooltip content="删除🌻" placement="top">
              <el-button
                type="danger"
                icon="Delete"
                circle
                plain
                @click="handleDelete(row)"
                v-auth="['system:loginlog:remove']"
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
        v-model:current-page="searchParams.pageNum"
        v-model:page-size="searchParams.pageSize"
        v-show="total > 0"
        :page-sizes="[10, 20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleListPage"
        @current-change="handleListPage"
      />
    </KoiCard>
  </div>
</template>

<script setup lang="ts" name="loginlogPage">
import { ref, onMounted } from "vue";
// @ts-ignore
import { koiNoticeSuccess, koiNoticeError, koiMsgWarning, koiMsgBox, koiMsgInfo, koiMsgError } from "@/utils/koi.ts";
// @ts-ignore
import { koiDatePicker } from "@/utils/index.ts";
// @ts-ignore
import {
  listPage,
  deleteById,
  batchDelete,
  cleanLoginLog
} from "@/api/system/loginlog/index.ts";

// 表格加载动画Loading
const loading = ref(false);
// 是否显示搜索表单[默认显示]
const showSearch = ref<boolean>(true); // 默认显示搜索条件
// 表格数据
const tableList = ref<any>([]);

// 数据表格显示映射关系：
// 前端字段(表格) -> 后端字段(实体类)
// username -> username 用户名
// ipAddress -> ipAddress IP地址
// loginLocation -> loginLocation 登录地址
// status -> status 登录状态(0成功 1失败)
// browser -> browser 浏览器类型
// os -> os 操作系统
// msg -> msg 提示消息/登录信息
// loginTime -> loginTime 登录时间

// 查询参数
const searchParams = ref({
  pageNum: 1, // 第几页
  pageSize: 10, // 每页显示多少条
  loginName: "", // 前端查询参数：用户名 -> 后端映射到 username
  ipAddress: "", // 前端查询参数：IP地址 -> 后端映射到 ipAddress
  loginStatus: "" // 前端查询参数：登录状态 -> 后端映射到 status
});

const total = ref<number>(0);
// 时间
const dateRange = ref();

/** 重置搜索参数 */
const resetSearchParams = () => {
  dateRange.value = [];
  searchParams.value = {
    pageNum: 1,
    pageSize: 10,
    loginName: "",
    ipAddress: "",
    loginStatus: ""
  };
};

/** 搜索 */
const handleSearch = () => {
  console.log("搜索");
  searchParams.value.pageNum = 1;
  handleListPage();
};

/** 重置 */
const resetSearch = () => {
  console.log("重置搜索");
  resetSearchParams();
  handleListPage();
};

/** @current-change：点击分页组件页码发生变化：例如：切换第2、3页 OR 上一页 AND 下一页 OR 跳转某一页 */
/** @size-change：点击分页组件下拉选择条数发生变化：例如：选择10条/页、20条/页等 */
// 分页查询，@current-change AND @size-change都会触发分页，调用后端分页接口
/** 数据表格 */
const handleListPage = async () => {
  try {
    loading.value = true;
    tableList.value = []; // 重置表格数据
    // 在发送请求前打印一下发送的参数
    console.log("发送的搜索参数:", koiDatePicker(searchParams.value, dateRange.value));
    const res: any = await listPage(koiDatePicker(searchParams.value, dateRange.value));
    console.log("日志数据表格数据->", res.data);
    tableList.value = res.data.rows;
    total.value = res.data.total;
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
    console.log("日志数据表格数据->", res.data);
    tableList.value = res.data.rows;
    total.value = res.data.total;
  } catch (error) {
    console.log(error);
    koiNoticeError("数据查询失败，请刷新重试🌻");
  }
};

onMounted(() => {
  // 获取表格数据
  handleListPage();
});

const ids = ref([]); // 选择数组
const single = ref<boolean>(true); // 非单个禁用
const multiple = ref<boolean>(true); // 非多个禁用

/** 是否多选 */
const handleSelectionChange = (selection: any) => {
  // console.log(selection);
  ids.value = selection.map((item: any) => item.id);
  single.value = selection.length != 1; // 单选
  multiple.value = !selection.length; // 多选
};

/** 删除 */
const handleDelete = (row: any) => {
  koiMsgBox("确认要删除该条登录日志吗？")
    .then(async () => {
      try {
        await deleteById(row.id);
        koiNoticeSuccess("删除成功🌻");
        handleTableData();
      } catch (error) {
        console.log(error);
        koiNoticeError("删除失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 批量删除 */
const handleBatchDelete = () => {
  if (ids.value.length === 0) {
    koiMsgWarning("请选择需要删除的数据🌻");
    return;
  }
  koiMsgBox("确认要批量删除选中的登录日志吗？")
    .then(async () => {
      try {
        await batchDelete(ids.value);
        koiNoticeSuccess("批量删除成功🌻");
        handleTableData();
      } catch (error) {
        console.log(error);
        koiNoticeError("批量删除失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};

/** 清空日志 */
const handleCleanLog = () => {
  koiMsgBox("确认要清空所有登录日志吗？此操作不可恢复！")
    .then(async () => {
      try {
        await cleanLoginLog();
        koiNoticeSuccess("清空日志成功🌻");
        handleTableData();
      } catch (error) {
        console.log(error);
        koiNoticeError("清空日志失败，请刷新重试🌻");
      }
    })
    .catch(() => {
      koiMsgError("已取消🌻");
    });
};
</script>

<style lang="scss" scoped></style>
