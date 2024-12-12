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

    <div class="about">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>关于页面</span>
        </div>

        <el-row>
          <el-col :span="24">
            <p>
              欢迎访问关于页面！此项目由 David 开发，使用 Vue 2、TypeScript 和 Element UI 构建。
              David 是一位全栈基础开发工程师，对用户界面设计和性能优化充满热情。
            </p>
          </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column prop="id" label="编号" width="50" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="role" label="角色" />
        </el-table>

      </el-card>
    </div>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'

  @Component({
    name: 'About'
  })
export default class About extends Vue {
    private activeMenu = '2'
    // Table data
    private tableData = [
      { id: 1, name: 'David', role: 'Developer' },
      { id: 2, name: 'Spike', role: 'Designer' }
    ];

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
.about {
  padding: 20px;
}

.box-card {
  width: 800px;
  margin: 0 auto;
}

.logo {
font-size: 24px;
font-weight: bold;
}
</style>
