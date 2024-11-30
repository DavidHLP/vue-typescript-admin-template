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
              <h3 class="mb-4 text-center">Register an account?</h3>
              <el-form
                ref="registerForm"
                :model="registerForm"
                :rules="registerRules"
                class="signin-form"
                autocomplete="on"
                label-position="left"
              >
                <el-form-item prop="username">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="registerForm.username"
                      ref="username"
                      placeholder="Username"
                    />
                  </div>
                </el-form-item>
                <el-form-item prop="password">
                  <div class="form-group">
                    <input
                      class="form-control"
                      v-model="registerForm.password"
                      ref="password"
                      @keyup="checkCapslock"
                      @blur="capsTooltip = false"
                      placeholder="Password"
                    />
                  </div>
                </el-form-item>
                <el-form-item prop="email">
                  <div class="form-group">
                    <div style="display: flex; gap: 10px; align-items: center;">
                      <input
                        class="form-control"
                        v-model="registerForm.email"
                        ref="email"
                        @keyup="checkCapslock"
                        @blur="capsTooltip = false"
                        placeholder="Email"
                        style="flex: 1;"
                      />
                      <el-button
                        class="form-control"
                        style="width: 30%; font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
                        size="small"
                        @click="sendVerificationCode"
                        :disabled="codeButtonDisabled"
                        v-text="codeButtonText"
                      ></el-button>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item prop="verificationCode">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="registerForm.verificationCode"
                      placeholder="Verification Code"
                    />
                  </div>
                </el-form-item>

                <div class="form-group">
                  <el-button
                    @click.prevent="handleRegister"
                    class="form-control btn btn-primary submit px-3"
                    :disabled="loading"
                  >
                    Register In
                  </el-button>
                </div>
                <div class="form-group d-md-flex">
                </div>
              </el-form>
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
import { isValidUsername } from '@/utils/validate'
import { register as Register, sendcode } from '@/api/users'

@Component({
  name: 'Register'
})

export default class extends Vue {
    private rememberMe = false

    private validateEmail = (
      rule: any,
      value: string,
      callback: Function
    ) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        callback(new Error('Please enter a valid email address'))
      } else {
        callback()
      }
    }

    private validateUsername = (rule: any, value: string, callback: Function) => {
      if (!isValidUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }

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

    private registerForm = {
      username: 'DavidHLP',
      password: '#Alone117',
      email: 'lysf15520112973@163.com',
      verificationCode: ''
    }

    private codeButtonText = 'Send Code' // 默认按钮文字
    private codeButtonDisabled = false // 默认按钮启用状态
    private countdown = 60 // 倒计时时间，单位为秒

    private registerRules = {
      username: [{ validator: this.validateUsername, trigger: 'blur' }],
      password: [{ validator: this.validatePassword, trigger: 'blur' }],
      email: [{ validator: this.validateEmail, trigger: 'blur' }]
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
      if (this.registerForm.username === '') {
        (this.$refs.username as Input).focus()
      } else if (this.registerForm.password === '') {
        (this.$refs.password as Input).focus()
      } else if (this.registerForm.email === '') {
        (this.$refs.email as Input).focus()
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

    private async sendVerificationCode() {
      if (!this.registerForm.email) {
        this.$message.error('Please enter your email address')
        return
      }

      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.registerForm.email)
      if (!isValid) {
        this.$message.error('Please enter a valid email address')
        return
      }

      try {
        this.codeButtonDisabled = true
        this.codeButtonText = `Resend in ${this.countdown}s`

        // 调用 API 发送验证码
        await sendcode(this.registerForm.email)

        this.$message.success('Verification code sent successfully')

        // 启动倒计时
        const interval = setInterval(() => {
          this.countdown -= 1
          this.codeButtonText = `${this.countdown}s`
          if (this.countdown <= 0) {
            clearInterval(interval)
            this.codeButtonDisabled = false
            this.codeButtonText = 'Send Code'
            this.countdown = 60
          }
        }, 1000)
      } catch (error) {
        this.$message.error('Failed to send verification code')
        this.codeButtonDisabled = false
        this.codeButtonText = 'Send Code'
      }
    }

    private handleRegister() {
      (this.$refs.registerForm as ElForm).validate(async(valid: boolean) => {
        if (valid) {
          this.loading = true
          await Register(this.registerForm)
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
}
</script>

<style src='@/assets/css/style.css' lang="css" scoped></style>
<style scr="@/assets/css/lato-font.css" lang="css" scoped ></style>
<style scr="@/assets/css/font-awesome.min.css" lang="css" scoped></style>
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
