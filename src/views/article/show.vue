<template>
  <el-container>
    <!-- Header -->
    <el-header class="header">
      <el-row type="flex" justify="space-between" align="middle" class="custom-header">
        <div class="logo">David Blog</div>
        <el-menu :default-active="activeMenu" class="custom-menu" mode="horizontal">
          <el-menu-item index="1" @click="pushtohome">首页</el-menu-item>
          <el-menu-item index="2" @click="pushtoabout">关于我</el-menu-item>
          <el-menu-item index="3" @click="pushtoprofile">控制台</el-menu-item>
        </el-menu>
      </el-row>
    </el-header>

    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <h1>软技能精选（持续更新）</h1>
        <p class="meta-info">
          <span>David</span> · <span>1992</span> · <span>4 分钟</span> · <span>2024/09/13</span>
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <el-main class="main-content">
      <div class="editor-container">
        <markdown-viewer
          ref="MarkdownViewer"
          :initialValue="fullcontent"
          :height="'calc(77vh)'"
        />
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import MarkdownViewer from '@/views/article/components/article.vue'
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'
import { Article, defaultArticle } from './components/default-options'
import { getArticleById } from '@/api/articles'

@Component({
  name: 'Show',
  components: {
    MarkdownViewer
  }
})
export default class Viewer extends Vue {
  private activeMenu = '';
  private markdownArticle: Article = defaultArticle;
  private fullcontent:string;

  mounted() {
    this.id = this.$route.query.id
    this.getNowArticle(this.id)
  }

  private async getNowArticle(id: number) {
    const { data } = await getArticleById(id)
    this.markdownArticle = data.article
    this.fullcontent = this.markdownArticle.markdownContent;
    (this.$refs.MarkdownViewer as MarkdownViewer).setMarkdown(this.markdownArticle.markdownContent)
  }

  private pushtoprofile() {
    router.push('/profile/index')
  }

  private pushtohome() {
    router.push('/home')
  }

  private pushtoabout() {
    router.push('/about')
  }
}
</script>

<style scoped>

/* Header 和 Hero 部分使用相同的渐变背景 */
.header {
  background: linear-gradient(90deg, #ff7e5f, #feb47b); /* 渐变背景 */
  color: white; /* 主文字颜色 */
}

.custom-header {
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 增加阴影效果 */
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.custom-menu {
  background-color: transparent; /* 清除默认背景 */
  border: none; /* 清除边框 */
}

.custom-menu .el-menu-item {
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin: 0 15px;
  transition: color 0.3s ease, background-color 0.3s ease; /* 增加动画过渡 */
}

.custom-menu .el-menu-item:hover {
  color: rgba(255, 255, 255, 0.8); /* 改变字体颜色 */
  background-color: rgba(255, 255, 255, 0.1); /* 增加背景效果 */
}

.custom-menu .el-menu-item.is-active {
  color: white;
  border-bottom: 2px solid white; /* 高亮当前选项 */
}

.hero-section {
  background: linear-gradient(90deg, #ff7e5f, #feb47b); /* 与 Header 一致的渐变背景 */
  color: white;
  text-align: center;
  padding: 50px 20px;
}

.hero-content h1 {
  font-size: 36px;
  margin: 10px 0;
}

.meta-info {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8); /* 次要文字颜色 */
}

/* 主内容区域样式 */
.main-content {
  width: 70%; /* 设置总宽度的70% */
  margin: 0 auto; /* 居中对齐 */
  padding: 20px 0; /* 上下间距 */
  box-sizing: border-box; /* 包括内边距计算在宽度内 */
}

/* 编辑器容器样式 */
.editor-container {
  width: 100%; /* 子内容占满父容器 */
}

</style>
