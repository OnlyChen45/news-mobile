<script setup>
import router from '@/router'
import { login, sendSms } from '@/api/user'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { showToast, showLoadingToast, showSuccessToast, showFailToast } from 'vant'
// const name='login'
const user = reactive({
  mobile: '',
  code: ''
})
const store = useStore()
const loginform = ref(null)
const formRules = {
  mobile: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: /^\d{6}$/, message: '验证码格式错误' }
  ]
}
let isCountDownShow = false // 控制倒计时和发送按钮的显示状
let isSendSmsLoading = false // 发送验证码按钮的 loading 状态
const onClickLeft = () => router.back()

const onLogin = async () => {
  // 找到数据接口
  // 封装请求方法
  showLoadingToast({
    message: '登录中...',
    forbidClick: true,
    duration: 0
  })
  try {
    const { data } = await login(user)
    // const res = await login(user)
    showSuccessToast('登陆成功')
    // 更新store
    store.commit('setUser', data.data)
    router.back() // 这种方式不够好
  } catch (err) {
    console.log(err)
    showFailToast('登陆失败')
  }
}
// 请求调用登录
// 处理请求结果

const onFailed = (error) => {
  // console.log('验证失败')
  if (error.errors[0]) {
    showToast({
      message: error.errors[0].message,
      position: 'top' // 显示位置
    })
  }
}

const onSendSms = async () => {
// 校验手机号码
// 验证通过，发送验证码，用户输入验证🐎
// 发送验证码 显示倒计时
// 倒计时结束 隐藏倒计时并现实发送按钮
  try {
    // const validateresult = await loginform.validate('mobile')
    isSendSmsLoading = true
    await sendSms(user.mobile)
    isCountDownShow = true
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    showToast({
      message: message,
      position: 'top' // 显示位置
    })
  }
  // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
  isSendSmsLoading = false
}
</script>

<template>
    <!-- 使用一些vant组件进行设计 -->
    <!-- 主要有 Navbar Field-->
    <div class="login=container">
        <van-nav-bar class="app-nav-bar" title="登录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-form :show-error="false" :show-error-message="false" validate-first ref="loginform" @submit="onLogin"
            @failed="onFailed">
            <van-field v-model="user.mobile" icon-prefix="toutiao" left-icon="shouji" center placeholder="请输入手机号"
                name="mobile" :rules="formRules.mobile" />
            <van-field v-model="user.code" clearable icon-prefix="toutiao" left-icon="yanzhengma" center
                placeholder="请输入验证码" name="code" :rules="formRules.code">
                <template #button>
                    <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s"
                        @finish="isCountDownShow = false" />
                    <van-button v-else class="send-btn" size="mini" round :loading="isSendSmsLoading"
                        @click.prevent="onSendSms">发送验证码</van-button>
                </template>
            </van-field>
            <div class="login-btn-wrap">
                <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-form>
    </div>
</template>

<style lang="less">
.login-container {
    .send-btn {
        width: 76px;
        height: 23px;
        background-color: #ededed;

        .van-button__text {
            font-size: 11px;
            color: #666666;
        }
    }

    .login-btn-wrap {
        padding: 26px 16px;

        .login-btn {
            background-color: #6db4fb;
            border: none;

            .van-button__text {
                font-size: 15px;
            }
        }
    }
}
</style>
