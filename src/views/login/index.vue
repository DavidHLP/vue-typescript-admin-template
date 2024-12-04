<template>
  <div
    class="img js-fullheight"
    :style="{
      backgroundImage: `url(${require('@/assets/images/bg.jpg')})`,
      width: '100%',
      height: '100%'
    }"
  >
   <!-- 添加遮罩层 -->
   <div class="overlay"></div>
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-4">
            <div class="login-wrap p-0">
              <h3 class="mb-4 text-center">Have an account?</h3>
              <!-- <el-form class="signin-form" ref="loginForm"> -->
                <el-form
                  ref="loginForm"
                  :model="loginForm"
                  :rules="loginRules"
                  class="signin-form"
                  autocomplete="on"
                  label-position="left"
                >
                <el-form-item prop="username">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="loginForm.username"
                      ref="username"
                      placeholder="Email"
                    />
                  </div>
                </el-form-item>
                <el-form-item prop="password">
                  <div class="form-group">
                  <input
                    class="form-control"
                    v-model="loginForm.password"
                    ref="password"
                    @keyup ="checkCapslock"
                    @blur="capsTooltip = false"
                    placeholder="Password"
                  />
                  <span
                    @click="showPwd"
                    class="fa fa-fw"
                    :class="passwordType === 'password' ? 'fa-eye' : 'fa-eye-slash'"
                    style="
                      cursor: pointer;
                      position: absolute;
                      right: 10px;
                      top: 50%;
                      transform: translateY(-50%);
                    "
                  ></span>
                </div>
                </el-form-item>
                <div class="form-group">
                  <el-button
                    @click.prevent="handleLogin"
                    class="form-control btn btn-primary submit px-3"
                    :disabled="loading"
                  >
                    Sign In
                  </el-button>
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
                    <a href="#" class="txt1" @click.prevent="redirectToRegister">
                      Create new account
                      <i class="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </el-form>
              <div class="w-100 text-center">
                <a href="#" style="color: #fff">Forgot Password</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'

  @Component({
    name: 'Login'
  })
export default class extends Vue {
    private rememberMe = false

    private validateUsername = (
      rule: any,
      value: string,
      callback: Function
    ) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 简单的邮箱格式正则表达式
      if (!emailRegex.test(value)) {
        callback(new Error('Please enter a valid email address'))
      } else {
        callback()
      }
    }

    // private validateUsername = (rule: any, value: string, callback: Function) => {
    //   if (!isValidUsername(value)) {
    //     callback(new Error('Please enter the correct user name'))
    //   } else {
    //     callback()
    //   }
    // }

    private validatePassword = (
      rule: any,
      value: string,
      callback: Function
    ) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    private loginForm = {
      username: 'admin@system.com',
      password: 'admin123'
    }

    private loginRules = {
      username: [{ validator: this.validateUsername, trigger: 'blur' }],
      password: [{ validator: this.validatePassword, trigger: 'blur' }]
    }

    private passwordType = 'password'
    private loading = false
    private showDialog = false
    private capsTooltip = false
    private redirect?: string
    private otherQuery: Dictionary<string> = {}

    @Watch('$route', { immediate: true })
    private onRouteChange(route: Route) {
      // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
      // See https://github.com/vuejs/vue-router/pull/2050 for details
      const query = route.query as Dictionary<string>
      if (query) {
        this.redirect = query.redirect
        this.otherQuery = this.getOtherQuery(query)
      }
    }

    mounted() {
      if (this.loginForm.username === '') {
        (this.$refs.username as Input).focus()
      } else if (this.loginForm.password === '') {
        (this.$refs.password as Input).focus()
      }
    }

    private checkCapslock(e: KeyboardEvent) {
      const { key } = e
      this.capsTooltip =
        key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
    }

    private showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        (this.$refs.password as Input).focus()
      })
    }

    private handleLogin() {
      (this.$refs.loginForm as ElForm).validate(async(valid: boolean) => {
        if (valid) {
          this.loading = true
          await UserModule.Login(this.loginForm)
          this.$router
            .push({
              path: this.redirect || '/',
              query: this.otherQuery
            })
            .catch(err => {
              console.warn(err)
            })
          // Just to simulate the time of the request
          setTimeout(() => {
            this.loading = false
          }, 0.5 * 1000)
        } else {
          return false
        }
      })
    }

    private getOtherQuery(query: Dictionary<string>) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {} as Dictionary<string>)
    }

    private redirectToRegister() {
      this.$router.push({
        path: '/register'
      })
    }
}
</script>

<style src='@/assets/css/style.css' scoped></style>
<style scoped>
/* 背景图样式 */
.img.js-fullheight {
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

/* 遮罩层样式 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色 */
  z-index: 1;
}

/* 确保内容在遮罩层之上 */
.ftco-section {
  position: relative;
  z-index: 2;
}
</style>
