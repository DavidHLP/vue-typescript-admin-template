<!-- <template>
  <div class="components-container">
    <div class="header-container">
      <div class="header-left">
        <i class="el-icon-menu" style="font-size: 18px;"></i>
        <span class="header-title">文章</span>
      </div>
      <div class="header-right">
        <el-button type="primary" icon="el-icon-view" @click="handlePreview">预览</el-button>
        <el-button type="primary" icon="el-icon-document" @click="handleSave">保存</el-button>
        <el-button type="primary" icon="el-icon-setting" @click="openDialog">设置</el-button>
        <el-button type="primary" icon="el-icon-s-promotion" @click="handlePublish">发布</el-button>
      </div>
    </div>
    <div class="editor-container">
      <markdown-editor
        ref="markdownEditor"
        :initialValue="content1"
        :height="'calc(77vh)'"
      />
    </div>
    <div v-html="html"></div>
        <el-dialog title="文章设置" :visible.sync="dialogVisible" width="600px">
      <div class="dialog-content">
        <el-divider>常规设置</el-divider>
        <el-form :model="formData" label-width="100px">
          <el-form-item label="标题">
            <el-input v-model="formData.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="formData.author" placeholder="请选择作者" />
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
const fullcontent = `
  # Awesome Editor!
  This editor takes up the full screen dynamically.

  \`\`\`java
  public static void main(){}
  \`\`\`
`

@Component({
  name: 'MarkdownDemo',
  components: {
    MarkdownEditor
  }
})
export default class MarkdownDemo extends Vue {
  private content1 = fullcontent;
  private html = '';
  private markdowndata = '';

  // 弹窗显示状态
  private dialogVisible = false;

  // 表单数据
  private formData = {
    title: '未命名文章',
    author: 'David'
  };

  // 打开弹窗
  private openDialog() {
    this.dialogVisible = true
  }

  // 保存设置
  private saveSettings() {
    console.log('保存的设置:', this.formData)
    this.dialogVisible = false
  }

  mounted() {
    // Set initial editor height and listen for window resize
    this.updateEditorHeight()
    window.addEventListener('resize', this.updateEditorHeight)
  }

  beforeDestroy() {
    // Clean up event listener
    window.removeEventListener('resize', this.updateEditorHeight)
  }

  private updateEditorHeight() {
    // Dynamically update editor height
    this.editorHeight = `${window.innerHeight - 60}px` // 减去 Header 高度
  }

  private handlePreview() {
    console.log('预览按钮被点击')
    this.html = (this.$refs.markdownEditor as MarkdownEditor).getHtml()
  }

  private handleSave() {
    console.log('保存按钮被点击')
  }

  private handleSettings() {
    console.log('设置按钮被点击')
  }

  private handlePublish() {
    console.log('发布按钮被点击')
  }
}
</script>

<style lang="scss" scoped>
/* 总容器 */
.components-container {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header 样式 */
.header-container {
  display: flex;
  justify-content: space-between; /* 左右对齐 */
  align-items: center; /* 垂直居中 */
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #ebeef5;
  height: 60px; /* 固定高度 */
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

.header-right .el-button:last-child {
  background-color: #1e2f5f; /* 深色按钮 */
  color: white;
  font-weight: bold;
}

.dialog-content {
  padding: 10px 0;
}

.el-form-item__tip {
  display: block;
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style> -->

<template>
  <div id="viewer"></div>
</template>

<script lang="ts">
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'demo'
})
export default class MarkdownDemo extends Vue {
  // 将 fullcontent 移到类的成员变量
  const fullcontent = `
  # Awesome Editor!
  This editor takes up the full screen dynamically.

  \`\`\`java
  public static void main(){}
  \`\`\`
`

  // 在 mounted 钩子中初始化 Viewer
  mounted() {
    const viewer = new Viewer({
      el: document.querySelector('#viewer'),
      height: '600px',
      initialValue: this.fullcontent,
      plugins: [codeSyntaxHighlight],
      minHeight: '200px',
      useCommandShortcut: true,
      usageStatistics: true,
      hideModeSwitch: false,
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'task', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['code', 'codeblock'],
        ['scrollSync']
      ]
    })
  }
}
</script>

<style scoped>
/* 样式可以根据需要调整 */
#viewer {
  width: 100%;
  margin-top: 20px;
}
</style>
