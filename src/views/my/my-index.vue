<script setup>
import { mapState, useStore } from 'vuex'
import { computed } from 'vue'
import { showDialog } from 'vant'
import { getCurrentUser } from '@/api/user'
const store = useStore()
const storeState = mapState(['user'])
const resultOfState = {}
// 组合式api对于computed:{...mapState([  ])}的替代写法https://juejin.cn/post/7064897548573474853
Object.keys(storeState).map((item) => {
  const resFunc = storeState[item]
  resultOfState[item] = computed(resFunc.bind({ $store: store }))
  return null
})
let currentUser = {}
const loadCurrentUser = async () => {
  const { data } = await getCurrentUser()
  currentUser = data.data
}
loadCurrentUser()
const { user } = { ...resultOfState }
const onLogout = () => {
  showDialog({ title: '退出提示', message: '确认退出吗？' })
    .then(() => {
      // 清除用户登陆状态 ,即把vuex容器中user给clear
      store.commit('setUser', null)
    })
    .catch(() => { // on concel
      console.log('onConcel')
    })
}
// /deep/是干嘛的，是用来强制穿透子组件中局部类型的

</script>
<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell class="base-info" center :border="false">
        <template #icon>
          <van-image class="avatar" round fit="cover" :src="currentUser.photo" />
        </template>
        <template #title>
          <div class="name">{{ currentUser.name }}</div>
        </template>
        <template #value>
          <van-button class="update-btn" size="small" round to="/user/profile">编辑资料</van-button>
        </template>
      </van-cell>
      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div  class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <!-- <div slot="text" class="text-wrap"> -->
          <div  class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div  class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-wrap" >
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login">
      <div @click="$router.push({
        name: 'login',
        query: {
          redirect: '/my'
        }
      })">
        <img class="mobile" src="./手机.png">
      </div>
      <div class="text">登录 / 注册</div>
    </div>
    <van-grid class="nav-grid mb-4" :column-num="2">
      <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
      <van-grid-item class="nav-grid-item" icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell title="消息通知" is-link to="/" />
    <van-cell class="mb-4" title="小智同学" is-link to="/user/chat" />
    <van-cell v-if="user" class="logout-cell" title="退出登录" @click="onLogout" />
  </div>
</template>
<style  scoped  lang="less">
.my-container {
  .my-info {
    background: url("./banner.png") no-repeat;
    background-size: cover;

    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;

      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }

      .name {
        font-size: 15px;
        color: #fff;
      }

      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }

    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;

        .text-wrap {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .count {
            font-size: 18px;
          }

          .text {
            font-size: 11px;
          }
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .mobile {
      width: 66px;
      height: 66px;
    }

    .text {
      font-size: 14px;
      color: #fff;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 125px;

      .toutiao {
        font-size: 22px;
      }

      .toutiao-shoucang {
        color: #eb5253;
      }

      .toutiao-lishi {
        color: #ff9d1d;
      }

      .van-grid-item__text {
        font-size: 14px;
        color: #333333;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
  }

  .mb-4 {
    margin-bottom: 4px;
  }
}
</style>
