<template>
  <div class="blog-home">
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

      <!-- Main Content -->

      <div class="hero-image">
      <img src="https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg" alt="Hero Image" />
      <div class="hero-text">
        <h1>welcome friend</h1>
      </div>
    </div>

          <el-row :gutter="20">
            <el-col :span="8" v-for="(post, index) in posts" :key="index">
              <p></p>
              <el-card class="blog-card" shadow="always" :body-style="{padding: '20px'}" @click.native="navigateToPost(index)">
                <div class="card-header">
                  <img :src="post.image" class="post-image" alt="post" />
                </div>
                <div class="card-content">
                  <h3 class="post-title">{{ post.title }}</h3>
                  <p class="post-excerpt">{{ post.abstractContent }}</p>
                </div>
                <div class="card-footer">
                  <span class="post-date">2024-09-13</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
      </el-container>

      <!-- Footer -->
      <el-footer>
        <p>© 2024 My Blog. All rights reserved.</p>
      </el-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import router from '@/router'

@Component({
  name: 'Home'
})
export default class Home extends Vue {
  private activeMenu = '1';
  private activeCategory = 'All';
  private categories: string[] = ['All', 'Technology', 'Lifestyle', 'Travel', 'Food'];
  private posts: Array<{ title: string, excerpt: string, image: string }> = [
    {
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      title: 'Healthy Lifestyle Tips',
      abstractContent: 'Simple steps to improve your daily well-being.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      title: 'Healthy Lifestyle Tips',
      abstractContent: 'Simple steps to improve your daily well-being.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    }
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
.blog-home {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.hero-image {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.hero-text h1 {
  font-size: 48px;
  margin: 0;
}

.hero-text p {
  font-size: 18px;
  margin: 10px 0 0;
}

.el-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.el-main {
  flex: 1;
  overflow: auto;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.menu {
  line-height: 64px;
}
.sidebar-card {
  margin-bottom: 20px;
}
.sidebar-title {
  font-weight: bold;
  font-size: 18px;
}
.post-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 5px;
}
.post-content {
  text-align: center;
}
</style>
