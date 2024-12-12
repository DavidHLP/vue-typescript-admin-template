<template>
  <div class="components-container">
    <!-- Header -->
    <div class="header-container">
      <div class="header-left">
        <i class="el-icon-menu" style="font-size: 18px;"></i>
        <span class="header-title">文章</span>
      </div>
      <div class="header-right">
        <!-- <el-button type="primary" icon="el-icon-view" @click="handlePreview">预览</el-button> -->
        <el-button type="primary" icon="el-icon-document" @click="handleSave">保存</el-button>
        <el-button type="primary" icon="el-icon-setting" @click="openDialog">设置</el-button>
        <el-button type="primary" icon="el-icon-s-promotion" @click="handlePublish">发布</el-button>
      </div>
    </div>

    <!-- Markdown 编辑器 -->
    <div class="editor-container">
      <markdown-editor
        ref="markdownEditor"
        :initialValue="markdownArticle.markdownContent"
        :height="editorHeight"
      />
    </div>

    <!-- 文章设置弹窗 -->
    <el-dialog title="文章设置" :visible.sync="dialogVisible" width="600px">
      <div class="dialog-content">
        <el-divider>常规设置</el-divider>
        <el-form :model="markdownArticle" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="markdownArticle.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="唯一标识">
            <el-input v-model="markdownArticle.uniqueIdentifier" placeholder="唯一标识" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="markdownArticle.author" placeholder="请填写作者" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input
              v-model="markdownArticle.abstractContent"
              placeholder="填写简介"
              type="textarea"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="saveSettings">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
import { updateArticle, getArticleById } from '@/api/articles'
import { Article, defaultArticle } from './components/default-options'

@Component({
  name: 'edit',
  components: {
    MarkdownEditor
  }
})
export default class Edit extends Vue {
  // 数据定义
  private markdownArticle: Article = defaultArticle;
  private dialogVisible = false;
  private editorHeight = 'calc(70vh)'; // 编辑器默认高度
  private id: number | null = null; // 定义 id 为数字类型

  mounted() {
    if (this.$route.query.currentState === 'edit' && this.$route.query.id) {
      this.id = this.$route.query.id
      this.getNowArticle(this.id)
    }
  }

  private async handleSave() {
    this.markdownArticle.markdownContent = (this.$refs.markdownEditor as MarkdownEditor).getMarkdown()
    const { data } = await updateArticle(this.markdownArticle.id, { article: this.markdownArticle })
    this.markdownArticle = data
    this.id = this.markdownArticle.id
    console.log(this.id)
    sessionStorage.setItem('currentArticleId', this.id.toString());
    (this.$refs.markdownEditor as MarkdownEditor).setMarkdown(this.markdownArticle.markdownContent)
  }

  private openDialog() {
    this.dialogVisible = true
  }

  private async saveSettings() {
    await this.handleSave()
    this.dialogVisible = false
  }

  private async handlePublish() {
    this.markdownArticle.status = true
    await this.handleSave()
  }

  private async getNowArticle(id: number) {
    const { data } = await getArticleById(id)
    this.markdownArticle = data.article;
    (this.$refs.markdownEditor as MarkdownEditor).setMarkdown(this.markdownArticle.markdownContent)
  }
}
</script>

<style lang="scss" scoped>
/* 样式调整，与原代码保持一致 */
.components-container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ebeef5;
  height: 60px;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
}

.header-right {
  display: flex;
  align-items: center;
}

.header-right .el-button {
  margin-left: 10px;
}

.dialog-content {
  padding: 10px 0;
}
</style>
