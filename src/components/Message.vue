<template>
    <div class="sub_news_contain" v-if="$store.state.isShowNews">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="我的消息" name="first"></el-tab-pane>
            <el-tab-pane label="系统消息" name="second"></el-tab-pane>
        </el-tabs>
        <div class="messageBox">
            <ul>
                <li v-for="(value,index) in msg" :key="index">
                    <!-- <div class="newlist_icon fl"><img src="./../assets/img/twod/LOGO.png" alt=""></div> -->
                    <div class="newlsit_contant fl">
                        <div><router-link :to="{path:'/mine/'+value.commentatorid}" @click.native="changeisShowNews">{{value.commentatorname}}</router-link>在【<router-link :to="{path:'/model/detail/'+value.id}" @click.native="changeisShowNews">{{value.resourcetitle}}</router-link>】中回复了您</div>
                        <!-- <div>已经上传成功,快去发布吧</div> -->
                        <div>{{value.comment_time}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
export default {
    props:['msg'],
    data () {
        return {
            activeName:'',
        }
    },
    store,
    methods: {
        ...mapMutations(["changeisShowNews"]),
        handleClick() {

        }
    }
}
</script>

<style lang="less" scoped>
    .messageBox{
        max-height: 500px;
        overflow-y: scroll;
        background-color: #474747;
    }
</style>

