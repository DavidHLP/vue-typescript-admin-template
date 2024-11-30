<template>
  <div
    class="img js-fullheight"
    :style="{
      backgroundImage: `url(${require('./images/bg.jpg')})`,
      width: '100%',
      height: '100%'
    }"
  >
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-0">
              <h3 class="mb-4 text-center">Have an account?</h3>
              <form @submit.prevent="handleSubmit" class="signin-form">
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    v-model="username"
                    required
                  />
                </div>
                <div class="form-group">
                  <input
                    id="password-field"
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    placeholder="Password"
                    v-model="password"
                    required
                  />
                  <span
                    @click="togglePassword"
                    class="fa fa-fw"
                    :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
                    style="
                      cursor: pointer;
                      position: absolute;
                      right: 10px;
                      top: 50%;
                      transform: translateY(-50%);
                    "
                  ></span>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary submit px-3"
                  >
                    Sign In
                  </button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50">
                    <label class="checkbox-wrap checkbox-primary">
                      Remember Me
                      <input type="checkbox" v-model="rememberMe" />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="w-50 text-md-right">
                    <a href="#" class="txt1">
                      Create new account
                      <i class="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </form>
              <div class="w-100 text-center">
                <a href="#" style="color: #fff">Forgot Password</a>
              </div>
              <p class="w-100 text-center">&mdash; Or Sign In With &mdash;</p>
              <div class="social d-flex text-center">
                <a href="#" class="px-2 py-2 mr-md-1 rounded">
                  <span class="ion-logo-facebook mr-2"></span> Facebook
                </a>
                <a href="#" class="px-2 py-2 ml-md-1 rounded">
                  <span class="ion-logo-twitter mr-2"></span> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'

export default {
  name: 'Re',
  setup() {
    // 定义响应式变量类型
    const username = ref<string>('') // 用户名
    const password = ref<string>('') // 密码
    const rememberMe = ref<boolean>(true) // 记住密码
    const showPassword = ref<boolean>(false) // 显示密码状态

    // 切换密码可见性
    const togglePassword = (): void => {
      showPassword.value = !showPassword.value
    }

    // 表单提交处理逻辑
    const handleSubmit = (): void => {
      console.log('Form submitted with:', {
        username: username.value,
        password: password.value,
        rememberMe: rememberMe.value
      })
    }

    // 动态加载字体和图标样式
    const loadStylesheet = (href: string): void => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.appendChild(link)
    }

    onMounted(() => {
      // 加载 Google Fonts
      loadStylesheet(
        'https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap'
      )
      // 加载 Font Awesome
      loadStylesheet(
        'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      )
    })

    return {
      username,
      password,
      rememberMe,
      showPassword,
      togglePassword,
      handleSubmit
    }
  }
}
</script>

<style>
  @import 'css/style.css'; /* 引入外部CSS文件 */
</style>
