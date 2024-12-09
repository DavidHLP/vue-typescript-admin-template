<template>
    <div class="article-page">
      <!-- 筛选区域 -->
      <el-card class="filter-card">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input v-model="searchKeyword" placeholder="输入关键词搜索" clearable />
          </el-col>
          <el-col :span="4">
            <el-select v-model="selectedStatus" placeholder="状态" clearable>
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="selectedCategory" placeholder="分类" clearable>
              <el-option v-for="item in categoryOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select v-model="selectedTag" placeholder="标签" clearable>
              <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
          <el-col :span="6" class="text-right">
            <el-button type="primary" @click="handleCreate">新建</el-button>
          </el-col>
        </el-row>
      </el-card>

      <!-- 文章列表 -->
      <el-card class="table-card">
        <el-table :data="filteredArticles" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="title" label="标题" min-width="200"></el-table-column>
          <el-table-column prop="views" label="访问量" width="100"></el-table-column>
          <el-table-column prop="comments" label="评论数" width="100"></el-table-column>
          <el-table-column prop="status" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.status === '已发布' ? 'success' : 'info'">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="author" label="作者" width="120"></el-table-column>
          <el-table-column prop="publishDate" label="发布时间" width="180"></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'

@Component
export default class ArticlePage extends Vue {
  // 筛选相关
  private searchKeyword = '';
  private selectedStatus: string | null = null;
  private selectedCategory: string | null = null;
  private selectedTag: string | null = null;

  // 选项数据
  private statusOptions = [
    { value: '已发布', label: '已发布' },
    { value: '未发布', label: '未发布' }
  ];

  private categoryOptions = [
    { value: '技术', label: '技术' },
    { value: '生活', label: '生活' },
    { value: '其他', label: '其他' }
  ];

  private tagOptions = [
    { value: 'Vue', label: 'Vue' },
    { value: 'Element', label: 'Element' },
    { value: 'TypeScript', label: 'TypeScript' }
  ];

  // 文章数据
  private articles = [
    {
      title: '计算机系统层次结构',
      views: 9,
      comments: 0,
      status: '已发布',
      author: '张三',
      publishDate: '2024-12-09 15:13'
    },
    {
      title: '存储器',
      views: 0,
      comments: 0,
      status: '未发布',
      author: '李四',
      publishDate: '未发布'
    },
    {
      title: 'RabbitMQ 延迟消息',
      views: 10,
      comments: 0,
      status: '已发布',
      author: '王五',
      publishDate: '2024-11-25 15:31'
    }
  ];

  // 计算筛选后的文章列表
  get filteredArticles() {
    return this.articles.filter((article) => {
      const matchesKeyword =
        !this.searchKeyword || article.title.includes(this.searchKeyword)
      const matchesStatus =
        !this.selectedStatus || article.status === this.selectedStatus
      const matchesCategory =
        !this.selectedCategory || article.category === this.selectedCategory
      const matchesTag = !this.selectedTag || article.tags?.includes(this.selectedTag)

      return matchesKeyword && matchesStatus && matchesCategory && matchesTag
    })
  }

  // 操作相关
  private handleCreate() {
    router.push('/article/edit')
  }

  private handleEdit(row: any) {
    console.log('编辑文章', row)
  }

  private handleDelete(row: any) {
    console.log('删除文章', row)
  }
}
</script>

<style lang="scss" scoped>
.article-page {
  padding: 20px;
}

.filter-card {
  margin-bottom: 20px;
}

.table-card {
  margin-top: 20px;
}
</style>
