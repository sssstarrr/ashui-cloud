<template>
  <div class="storage-config-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>存储方式配置</span>
          <el-button type="primary" @click="handleSaveConfig">保存配置</el-button>
        </div>
      </template>
      
      <el-form ref="formRef" :model="formData" label-width="120px">
        <el-form-item label="存储方式">
          <el-select v-model="formData.currentType" class="w-full" @change="handleStorageTypeChange">
            <el-option
              v-for="(name, code) in availableTypes"
              :key="code"
              :label="name"
              :value="code"
            />
          </el-select>
        </el-form-item>
        
        <!-- 本地存储配置 -->
        <div v-if="formData.currentType === 'local'">
          <el-divider content-position="left">本地存储配置</el-divider>
          <el-form-item label="存储路径" prop="local.storagePath">
            <el-input v-model="formData.local.storagePath" placeholder="请输入文件存储路径"/>
            <div class="form-help">可以是相对路径或绝对路径，例如: upload 或 /data/upload</div>
          </el-form-item>
          <el-form-item label="访问路径" prop="local.accessPath">
            <el-input v-model="formData.local.accessPath" placeholder="请输入文件访问路径"/>
            <div class="form-help">文件访问的URL路径前缀，例如: /upload</div>
          </el-form-item>
          <el-form-item label="访问域名" prop="local.domain">
            <el-input v-model="formData.local.domain" placeholder="请输入访问域名（可选）"/>
            <div class="form-help">可选，设置后返回完整URL，例如: http://example.com</div>
          </el-form-item>
        </div>
        
        <!-- 又拍云存储配置 -->
        <div v-if="formData.currentType === 'upyun'">
          <el-divider content-position="left">又拍云存储配置</el-divider>
          <el-form-item label="服务名称" prop="upyun.bucketName">
            <el-input v-model="formData.upyun.bucketName" placeholder="请输入又拍云服务名称"/>
          </el-form-item>
          <el-form-item label="操作员名称" prop="upyun.operatorName">
            <el-input v-model="formData.upyun.operatorName" placeholder="请输入又拍云操作员名称"/>
          </el-form-item>
          <el-form-item label="操作员密码" prop="upyun.operatorPwd">
            <el-input v-model="formData.upyun.operatorPwd" placeholder="请输入又拍云操作员密码" type="password" show-password/>
          </el-form-item>
          <el-form-item label="访问域名" prop="upyun.domain">
            <el-input v-model="formData.upyun.domain" placeholder="请输入又拍云访问域名"/>
            <div class="form-help">例如: example.com 或 cdn.example.com</div>
          </el-form-item>
        </div>
        
        <el-form-item>
          <el-button type="success" @click="handleTestStorage">测试配置</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card class="box-card mt-4">
      <template #header>
        <div class="card-header">
          <span>存储方式说明</span>
        </div>
      </template>
      
      <div class="storage-info">
        <h3>本地存储</h3>
        <p>文件将保存在服务器本地，适合单机部署的应用。优点是配置简单，无需额外服务；缺点是不支持分布式部署，且依赖服务器存储空间。</p>
        
        <h3>又拍云存储</h3>
        <p>文件将保存在又拍云服务，适合需要CDN加速或分布式部署的应用。优点是访问速度快，支持分布式部署；缺点是需要单独付费。</p>
        
        <h3>扩展说明</h3>
        <p>系统预留了七牛云、阿里云OSS等存储方式的扩展接口，后续可以根据需要进行扩展。</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getStorageConfig, updateStorageType, updateLocalConfig, updateUpYunConfig, testStorage } from '@/api/system/storage';

// 表单数据
const formRef = ref();
const formData = reactive({
  currentType: 'local',
  local: {
    storagePath: '',
    accessPath: '',
    domain: ''
  },
  upyun: {
    bucketName: '',
    operatorName: '',
    operatorPwd: '',
    domain: ''
  }
});

// 可用的存储类型
const availableTypes = ref<Record<string, string>>({});

// 原始配置数据，用于重置
const originalConfig = ref<any>({});

// 加载存储配置
const loadStorageConfig = async () => {
  try {
    const res = await getStorageConfig();
    if (res.code === 200) {
      const { currentType, availableTypes: types, local, upyun } = res.data;
      
      // 设置可用类型
      availableTypes.value = types;
      
      // 设置当前类型
      formData.currentType = currentType;
      
      // 设置本地存储配置
      if (local) {
        formData.local = {
          storagePath: local.storagePath || '',
          accessPath: local.accessPath || '',
          domain: local.domain || ''
        };
      }
      
      // 设置又拍云存储配置
      if (upyun) {
        formData.upyun = {
          bucketName: upyun.bucketName || '',
          operatorName: upyun.operatorName || '',
          operatorPwd: '',  // 密码不从后端获取
          domain: upyun.domain || ''
        };
      }
      
      // 保存原始配置，用于重置
      originalConfig.value = JSON.parse(JSON.stringify({
        currentType,
        local: formData.local,
        upyun: formData.upyun
      }));
    }
  } catch (error) {
    console.error('获取存储配置失败', error);
    ElMessage.error('获取存储配置失败');
  }
};

// 切换存储类型
const handleStorageTypeChange = (type: string) => {
  formData.currentType = type;
};

// 测试存储配置
const handleTestStorage = async () => {
  try {
    const res = await testStorage(formData.currentType);
    if (res.code === 200) {
      ElMessage.success('存储配置测试成功');
    } else {
      ElMessage.error(res.msg || '存储配置测试失败');
    }
  } catch (error) {
    console.error('测试存储配置失败', error);
    ElMessage.error('测试存储配置失败');
  }
};

// 保存配置
const handleSaveConfig = async () => {
  ElMessageBox.confirm('确认保存存储配置？保存后将立即生效', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      // 根据当前选择的存储类型更新对应配置
      if (formData.currentType === 'local') {
        // 先更新本地存储配置
        await updateLocalConfig(formData.local);
        console.log('本地存储配置已更新');
        
        // 再更新存储类型
        await updateStorageType(formData.currentType);
        console.log('存储类型已更新为:', formData.currentType);
      } else if (formData.currentType === 'upyun') {
        // 详细检查又拍云配置
        if (!formData.upyun.bucketName) {
          ElMessage.warning('请输入又拍云服务名称');
          return;
        }
        
        if (!formData.upyun.operatorName) {
          ElMessage.warning('请输入又拍云操作员名称');
          return;
        }
        
        if (!formData.upyun.operatorPwd) {
          ElMessage.warning('请输入又拍云操作员密码');
          return;
        }
        
        if (!formData.upyun.domain) {
          ElMessage.warning('请输入又拍云访问域名');
          return;
        }
        
        // 输出详细日志
        console.log('准备提交又拍云配置:', JSON.stringify({
          bucketName: formData.upyun.bucketName,
          operatorName: formData.upyun.operatorName,
          hasPassword: !!formData.upyun.operatorPwd,
          passwordLength: formData.upyun.operatorPwd ? formData.upyun.operatorPwd.length : 0,
          domain: formData.upyun.domain
        }));
        
        try {
          // 先提交又拍云详细配置
          const upyunResult = await updateUpYunConfig({
            bucketName: formData.upyun.bucketName,
            operatorName: formData.upyun.operatorName,
            operatorPwd: formData.upyun.operatorPwd,
            domain: formData.upyun.domain
          });
          console.log('又拍云配置提交结果:', upyunResult);
          
          if (upyunResult.code !== 200) {
            throw new Error(upyunResult.msg || '保存又拍云配置失败');
          }
          
          // 再更新存储类型
          await updateStorageType(formData.currentType);
          console.log('存储类型已更新为:', formData.currentType);
          
          // 检查配置是否成功提交
          console.log('又拍云配置已提交，测试配置中...');
          const testResult = await testStorage('upyun');
          console.log('又拍云配置测试结果:', testResult);
        } catch (upyunError: any) {
          console.error('保存又拍云配置失败:', upyunError);
          ElMessage.error('保存又拍云配置失败: ' + (upyunError.message || '未知错误'));
          throw upyunError; // 重新抛出错误，阻止后续代码执行
        }
      }
      
      ElMessage.success('存储配置保存成功');
      
      // 提示用户可能需要重启应用
      ElMessage.info('配置已保存，如遇问题请重启应用以确保配置生效');
      
      // 重新加载配置
      await loadStorageConfig();
    } catch (error: any) {
      console.error('保存存储配置失败', error);
      ElMessage.error('保存存储配置失败: ' + (error.message || '未知错误'));
    }
  }).catch(() => {
    // 取消保存
    console.log('用户取消了保存操作');
  });
};

// 重置表单
const handleReset = () => {
  // 使用原始配置重置表单
  if (originalConfig.value) {
    formData.currentType = originalConfig.value.currentType;
    formData.local = JSON.parse(JSON.stringify(originalConfig.value.local));
    formData.upyun = JSON.parse(JSON.stringify(originalConfig.value.upyun));
  }
};

onMounted(() => {
  loadStorageConfig();
});
</script>

<style scoped>
.storage-config-container {
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-help {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.storage-info {
  font-size: 14px;
}

.storage-info h3 {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}

.storage-info p {
  margin-bottom: 15px;
  color: #606266;
  line-height: 1.6;
}
</style> 