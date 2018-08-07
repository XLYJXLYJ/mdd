<template>
    <!-- 评论区域 -->
    <div id="review-section">
        <p class="review-title">评论({{total}})</p>
        <div class="publish-review">
            <div class="review-islogin" v-if="!this.$store.state.userid">发表评论前请先<button @click="changedialogLogin">登录</button></div>
            <div class="review-func" v-if="this.$store.state.userid">
                <div><img :src="this.$store.state.userheadportrait" alt="" onerror="javascript:this.src=window.errorImg"></div>
                <div>
                    <textarea name="" id="" cols="30" rows="10" @keydown.enter="commentSelf" v-model="content"></textarea>
                </div>
            </div>
            <hr>
        </div>
        <CommentContent @commnetTotal="getTotal"></CommentContent>
    </div>
</template>
<script>
import CommentTextarea from './CommentTextarea'
import CommentContent from './CommentContent'
import store from '@/vuex/store'
import func from '@/public/func';
import api from '@/public/api';
import {mapState,mapMutations} from 'vuex'
export default {
    props: ['commentinfo'],
    data () {
        return {
            id:store.state.id,
            content:'',
            total:'',
        }
    },
    store,
    methods: {
        ...mapMutations(["changedialogLogin"]),
        //监听到了点击别人的评论
        changeComment(name,index) {
            this.oldComment = name;
            this.choseIndex = index;
            this.type = 1;
        },
        //监听到了取消评论
        cancelComment() {
            this.type = 0;
        },
        commentSelf() {
            let userid = this.$store.state.userid;
            let username = this.$store.state.username;
            let replyInfo = this.$store.state.replyInfo;
            func.ajaxPost(
                api.commentmodule,
                {
                    "resourceid":replyInfo.resourceid,
                    "commentatorid":userid,
                    "commentatorname":username,
                    "bycommentatorid":replyInfo.authid,
                    "type":1,
                    "content":this.content,
                    "resourcetitle":replyInfo.resourcetitle,
                },
                res => {
                    console.log(res.data);
                    if(res.data.status==200) {
                        if(res.data.data) {
                            this.Message('评论成功','success');
                            this.content = "";
                        }else if(res.data.errmsg) {
                            this.Message(errmsg,'error')
                        }
                    }else if(res.data.status == 500){
                        this.Message(errmsg,'error')
                    }
                }
            )
        },
        getTotal(value) {
            this.total = value;
        }
    },
    components: {
        CommentTextarea,CommentContent
    }
}
</script>

<style lang="less" scoped>
    // 评论
    #review-section{
        margin-top: 20px;
        padding: 20px;
        .review-title{
            line-height: 30px;
            font-size: 16px;
            color: #444;
            margin-bottom: 10px;
            text-align: left;
        }
        // 是否登录
        .review-islogin{
            width: 335px;
            height: 50px;
            font-size: 20px;
            button{
                color:#00b8d4;
                border: none;
                background: #fff;
            }
        }
        hr{
            margin: 10px 0;
        }
        .publish-review{
            .review-func{
                text-align: left;
                div{
                    display: inline-block;
                    vertical-align: top;
                    img{
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        margin-right: 5px;
                    }
                    textarea{
                        width: 305px;
                        padding: 10px;
                        height: 52px;
                        border: 1px solid #E0E0E0;
                        border-radius:5px;
                        box-sizing: border-box;
                    }
                }
                .btnBox{
                    margin-left: 220px;
                    .el-button{
                        padding: 10px;
                    }
                }
            }
        }
    }
    
</style>


