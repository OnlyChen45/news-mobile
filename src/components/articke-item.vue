<!-- 这里需要定义一下article的结构 -->
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    article: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <!-- <div class="article-item">文章列表项</div> -->
    <van-cell class="article-item" :to="{
        name: 'article',
        params: {
            articleId: article.art_id
        }
    }">
        <template #title>
            <div class="title van-multi-ellipsis--l3">{{ article.title }}</div>
        </template>
        <template #label>
            <div slot="label">
                <div v-if="article.cover.type === 3" class="cover-wrap">
                    <div class="cover-wrap-item" v-for="(img, index) in article.cover.images" :key="index">
                        <van-image class="cover-image" fit="cover" :src="img" />
                    </div>
                </div>
                <div class="label-wrap">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <span>{{ article.pubdate | relativeTime }}</span>
                </div>
            </div>
        </template>
        <!-- 默认插槽的名字叫 default，可以省略 -->
        <template #default>
            <van-image v-if="article.cover.type === 1" class="right-cover" fit="cover" :src="article.cover.images[0]" />
        </template>

    </van-cell>
</template>
<style scoped lang="less">
.article-item {
    .title {
        font-size: 16px;
        color: #3a3a3a;
    }

    /deep/ .van-cell__value {
        flex: unset;
        width: 116px;
        height: 73px;
        margin-left: 12px;
    }

    .right-cover {
        width: 116px;
        height: 73px;
    }

    .cover-wrap {
        padding: 15px 0;
        display: flex;

        .cover-wrap-item {
            flex: 1;
            height: 73px;

            &:not(:last-child) {
                padding-right: 4px;
            }

            .cover-image {
                width: 100%;
                height: 73px;
            }
        }
    }

    .label-wrap {
        font-size: 11px;
        color: #b4b4b4;
    }

    .label-wrap span {
        margin-right: 12px;
    }
}
</style>