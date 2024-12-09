<template>
  <el-container>
      <!-- Header -->
      <el-header>
        <el-row type="flex" justify="space-between" align="middle">
          <div class="logo">Blog</div>
          <el-menu :default-active="activeMenu" class="menu" mode="horizontal">
            <el-menu-item index="1" @click="pushtohome">首页</el-menu-item>
            <el-menu-item index="2" @click="pushtoabout">关于我</el-menu-item>
            <el-menu-item index="3" @click="pushtoprofile">控制台</el-menu-item>
          </el-menu>
        </el-row>
      </el-header>

    <div class="about">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>About Page</span>
        </div>

        <el-row>
          <el-col :span="24">
            <p>
              Welcome to the About Page! This page is built with Vue 3, TypeScript, and Element Plus. Below is an example of a table displaying some static data.
            </p>
          </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column prop="id" label="ID" width="50" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="role" label="Role" />
        </el-table>

        <div style="margin-top: 20px; text-align: right">
          <el-button type="primary" @click="handleClick">Click Me</el-button>
        </div>
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
      { id: 1, name: 'Alice', role: 'Developer' },
      { id: 2, name: 'Bob', role: 'Designer' },
      { id: 3, name: 'Charlie', role: 'Manager' }
    ];

    // Button click handler
    private handleClick(): void {
      alert('Button clicked!')
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
