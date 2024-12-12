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
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <!-- <el-col :span="4">
          <el-select v-model="selectedCategory" placeholder="分类" clearable>
            <el-option
              v-for="item in categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select v-model="selectedTag" placeholder="标签" clearable>
            <el-option
              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col> -->
        <el-col :span="6" class="text-right">
          <el-button type="primary" @click="handleCreate">新建</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 文章列表 -->
    <el-card class="table-card">
      <el-table :data="articles" :loading="loading" style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column prop="title" label="标题" min-width="200"></el-table-column>
        <el-table-column prop="views" label="访问量" width="100"></el-table-column>
        <el-table-column prop="comments" label="评论数" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.status ? 'success' : 'info'">
              {{ scope.row.status ? '已发布' : '未发布' }}
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
import { Article } from './components/default-options'
import { getArticleByStatusAndKeyWord, deleteArticleById } from '@/api/articles'

@Component
export default class ArticlePage extends Vue {
  // 筛选相关
  private searchKeyword = ''
  private selectedStatus: boolean | null = null
  private articles:Article[];
  private loading = false;
  // private selectedCategory: string | null = null
  // private selectedTag: string | null = null

  private statusOptions = [
    { value: true, label: '已发布' },
    { value: false, label: '未发布' }
  ]

  mounted() {
    this.GetArticleByStatusAndKeyWord()
  }

  watch: {
    selectedStatus: 'GetArticleByStatusAndKeyWord'
    searchKeyword: 'GetArticleByStatusAndKeyWord'
  }

  private async GetArticleByStatusAndKeyWord() {
    this.loading = true // 开启加载状态
    try {
      const { data } = await getArticleByStatusAndKeyWord(this.selectedStatus, this.searchKeyword)
      this.articles = data.article || []
    } catch (error) {
      this.$message.error('获取文章数据失败')
      this.articles = []
    } finally {
      this.loading = false // 关闭加载状态
    }
  }

  // private categoryOptions = [
  //   { value: '技术', label: '技术' },
  //   { value: '生活', label: '生活' },
  //   { value: '其他', label: '其他' }
  // ]

  // private tagOptions = [
  //   { value: 'Vue', label: 'Vue' },
  //   { value: 'Element', label: 'Element' },
  //   { value: 'TypeScript', label: 'TypeScript' }
  // ]

  // 操作相关
  private handleCreate() {
    router.push('/article/edit')
  }

  private handleEdit(row: any) {
    router.push({ path: '/article/edit', query: { id: row.id, currentState: 'edit' } })
  }

  private handleDelete(row: any) {
    this.$confirm('确认删除该文章吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.loading = true // 开启加载状态
      deleteArticleById(row.id)
      this.articles = this.articles.filter((article) => article !== row)
      this.$message.success('删除成功')
      this.loading = false // 关闭加载状态
    }).catch(() => {
      this.$message.info('已取消删除')
    })
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
