<template>
  <el-card style="margin-bottom: 20px">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb
          :image="user.avatar"
          :height="'100px'"
          :width="'100px'"
          :hoverable="false"
        >
          <!-- <div>Hello</div>
          {{ user.roles }} -->
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">
          {{ user.name }}
        </div>
        <div class="user-role text-center text-muted">
          {{ user.roles }}
        </div>
      </div>
      <div class="box-center">
         <!-- 修改头像按钮 -->
         <el-upload
          class="upload-avatar"
          action="/api/upload/avatar"
          :show-file-list="false"
          :http-request="handleFileUpload"
          :before-upload="beforeFileUpload"
        >
          <el-button size="small" type="primary" style="margin-top: 10px">修改头像</el-button>
        </el-upload>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="education" /><span>Education</span>
        </div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header">
          <svg-icon name="skill" /><span>Skills</span>
        </div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="51" />
          </div>
          <div class="progress-item">
            <span>Typescript</span>
            <el-progress :percentage="45" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="4" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProfile } from '../index.vue'
import PanThumb from '@/components/PanThumb/index.vue'
import { uploadFile } from '@/api/fileUploadDownload'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'UserCard',
  components: {
    PanThumb
  }
})
export default class extends Vue {
  @Prop({ required: true }) private user!: IProfile

  // 自定义请求头（如果需要 Token 等，可以在这里配置）
  private uploadHeaders = {
    Authorization: `Bearer ${UserModule.token}`
  }

  /**
   * 上传前校验
   * @param {File} file - 要上传的文件
   * @returns {boolean} 是否允许上传
   */
  private beforeFileUpload(file: File): boolean {
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (file.size > maxSize) {
      this.$message.error('文件大小不能超过 2MB')
      return false
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      this.$message.error('仅支持 JPEG/PNG/GIF 格式图片')
      return false
    }
    return true
  }

  /**
   * 手动处理文件上传
   * @param {any} options - 包含文件和回调方法
   */
  private async handleFileUpload(options: any) {
    const { file, onSuccess, onError } = options
    const formData = new FormData()
    formData.append('file', file)

    try {
      const { data } = await uploadFile(formData)
      if (data && data.filePath) {
        this.user.avatar = data.filePath // 动态更新用户头像
        UserModule.GetUserInfo()
        this.$message.success('头像上传成功！')
        onSuccess(data) // 通知 el-upload 上传成功
      } else {
        this.$message.error('上传成功，但返回数据格式错误')
        onError(new Error('无效的响应数据'))
      }
    } catch (error) {
      this.$message.error('头像上传失败，请重试！')
      console.error('上传失败:', error)
      onError(error) // 通知 el-upload 上传失败
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }

    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }

</style>
