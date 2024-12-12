<template>
  <div class="blog-home">
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
      <div class="hero-image">
        <img src="https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg" alt="Hero Image" />
        <div class="hero-text">
          <h1>welcome friend</h1>
        </div>
      </div>

      <!-- Main Content -->
      <el-main>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" v-for="(post, index) in posts" :key="index">
            <el-card class="blog-card" shadow="always" :body-style="{padding: '20px'}" @click.native="navigateToPost(post)">
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
      </el-main>
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
interface ArticleUnder {
  title: string
  abstractContent: string
  image: string
  id: number
}
export default class Home extends Vue {
  private activeMenu = '1';
  private posts: Array<ArticleUnder> = [
    {
      id: 1,
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 2,
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 1,
      title: 'Healthy Lifestyle Tips',
      abstractContent: 'Simple steps to improve your daily well-being.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 2,
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 1,
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 2,
      title: 'Healthy Lifestyle Tips',
      abstractContent: 'Simple steps to improve your daily well-being.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 1,
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 2,
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 1,
      title: 'Healthy Lifestyle Tips',
      abstractContent: 'Simple steps to improve your daily well-being.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 2,
      title: 'The Future of Technology',
      abstractContent: 'A glimpse into the advancements shaping tomorrow.',
      image: 'https://davidhlp.asia/d/HLP/Blog/1870ba61db3ce38e1807771fe0de5c7.jpg'
    },
    {
      id: 1,
      title: 'Top 10 Travel Destinations',
      abstractContent: 'Discover the must-visit places for your next adventure.',
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

  private navigateToPost(post) {
    router.push({ path: '/show', query: { id: post.id } })
  }
}
</script>

<style scoped>
.blog-home {
  font-family: Arial, sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* 防止横向滚动条 */
}

.hero-image {
  position: relative;
  width: 100%;
  height: 100vh; /* 高度占满整个视口 */
  overflow: hidden;
}

.hero-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片以适合的比例填满容器 */
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
  font-size: 4vw;
  margin: 0;
}

.hero-text p {
  font-size: 1.5vw;
  margin: 10px 0 0;
}

.el-main {
  flex: 1;
  margin: auto;
  width: 100%;
  max-width: 1200px; /* 限制主内容的最大宽度 */
  padding: 0 10px; /* 增加内容内边距 */
}

.el-footer {
  text-align: center;
  padding: 10px 0;
}

.el-row {
  display: flex;
  flex-wrap: wrap; /* 确保内容能够换行 */
}

.el-col {
  display: flex;
  flex-direction: column;
}

.blog-card {
  width: 100%; /* 确保卡片宽度适应父容器 */
  height: 350px; /* 固定卡片总高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 确保内容均匀分布 */
  margin-bottom: 20px; /* 增加卡片间距 */
}

.card-header img {
  width: 100%;
  height: 200px; /* 固定图片高度 */
  object-fit: cover;
  border-radius: 5px;
}

.card-content {
  flex: 1; /* 让内容区域占据剩余空间 */
  margin-top: 10px;
}

.post-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 单行显示，超出部分用省略号 */
}

.post-excerpt {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  height: 40px; /* 限制描述区域高度 */
  line-height: 20px; /* 设置行高 */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /* 为多行文本省略做准备 */
  -webkit-line-clamp: 2; /* 限制为两行 */
  -webkit-box-orient: vertical;
}

.post-image {
  width: 100%;
  height: auto; /* 保持图片宽高比 */
  object-fit: cover;
  border-radius: 5px;
}
</style>
