<script setup>
import {defineProps} from 'vue'
import  articleitem  from '@/components/articke-item.vue'
import {getArticles} from '@/api/article';
// 初始化属性
const props=defineProps({
        channel:{
            type:Object,
            required:true
        }
    })
// 注册数据
const list = []
const loading = false
const finished = false
const timetamp = null
// 注册方法
const onLoad=()=>{

}
</script>

<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<style scoped lang="less">
</style>
