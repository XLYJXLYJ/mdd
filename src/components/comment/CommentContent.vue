<template>
    <div class="comment-content">
        <ul class="review-list">
            <li v-for="(list,index) in lists" :key="index">
                <div class="review-person">
                    <img :src="list.headportrait" alt="" onerror="javascript:this.src=window.errorImg">
                    <span>{{list.username}}</span>
                </div>
                <div class="review-content">{{list.content}}</div>
                <div class="review-reply-box">
                    <span class="review-time">{{list.comment_time}}</span>
                    <span class="review-reply fr cur" v-reply="{replyIndex:[index,0],replyInfo:{'bycommentatorid':list.commentatorid,'type':2,'index':list.index},set:setbool,reset:resetComment}" v-if="userid !=list.commentatorid && !isReply[index][0]">回复</span>
                </div>
                <CommentTextarea v-if="isReply[index][0]" class="replyBox" @cancel="resetComment"></CommentTextarea>
                <hr>
                <ul v-if="list.reply.length >= 0" class="sub-list">
                    <li v-for="(sublist,subindex) in list.reply" :key="subindex">
                        <div class="review-person">
                            <img :src="sublist.headportrait" alt="" onerror="javascript:this.src=window.errorImg">
                            <span>{{sublist.username}}</span>
                        </div>
                        <div class="review-content">{{sublist.content}}</div>
                        <div class="review-reply-box">
                            <span class="review-time">{{sublist.comment_time}}</span>
                            <span class="review-reply fr cur" v-reply="{replyIndex:[index,subindex+1],replyInfo:{'bycommentatorid':sublist.commentatorid,'type':2,'index':sublist.index},set:setbool,reset:resetComment}" v-if="userid !=sublist.commentatorid && !isReply[index][subindex+1]">回复</span>
                        </div>
                        <CommentTextarea v-if="isReply[index][subindex+1]" @cancel="resetComment()"></CommentTextarea>
                        <hr>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import store from '@/vuex/store';
import {mapState,mapMutations} from 'vuex';
import func from '@/public/func';
import api from '@/public/api';
import CommentTextarea from './CommentTextarea'
export default {
    data () {
        return {
            lists:[],
            total:0,
            replyInfo:{
                bycommentatorid:'',
                type:'',
            },
            isReply:[],
            userid : this.$store.state.userid
        }
    },
    store,
    props: ['comment'],
    methods: {
        ...mapMutations(["setReplyInfo"]),
        setErrorImg(e) {
            errorImg(e,)
        },
        changeCommenter(name,index) {
            this.$emit('change',name,index)
        },
        setbool(replyIndex,replyInfo,value) {
            this.$set(this.isReply[replyIndex[0]],replyIndex[1],true);
            this.setReplyInfo(replyInfo);
        },
        resetComment() {
            let oindex = this.$store.state.replyInfo.oindex;
            let tindex = this.$store.state.replyInfo.tindex;
            this.$set(this.isReply[oindex],tindex,false);
        }
    },
    components: {
        CommentTextarea
    },
    mounted () {
        let id = this.$route.params.id;
        func.ajaxPost(
            api.getcomment,
            {
                id
            },
            res => {
                console.log(res.data.data);
                if(res.data.status === 200) {
                    if(res.data.data) {
                        this.lists = res.data.data.data;
                        let total = res.data.data.total ? res.data.data.total : 0;
                        this.$emit("commnetTotal",total);
                        this.total = res.data.data.total;
                        Array.from(this.lists,(value) => {
                            let length = value.reply.length + 1;
                            let temp_arr = new Array(length).fill(false);
                            let arr = [];
                            arr[0] = temp_arr;
                            this.isReply.push(...arr);
                        })
                    }else{
                        this.Message(res.data.errmsg,'warning')
                    }
                }else{
                        this.Message(res.data.errmsg,'warning')                    
                }
                

            }
        )
    },
    // watch:{
    //     isReply:{
    //         handler:function (n,o) {
    //             console.log("======")
    //             console.log(n);
    //             console.log(o);
    //         },
    //         immediate: true,
    //         deep:true
    //     },
    // }
}
</script>

<style lang="less" scoped>
    .comment-content {
        // 评论列表
        .review-list{
            li{
                font-size: 12px;
                text-align: left;
                .review-person{
                    img{
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                    }
                    span{
                        vertical-align: top;
                        color:#3C3C3C;
                    }
                }
                .review-content{
                    color: #616161;
                    font-size: 13px;
                    margin-left: 25px;
                }
                .review-reply-box{
                    color:#A9A9A9;
                    margin-bottom: 16px;
                    .review-time{
                        margin-left: 30px;
                    }
                }
            }
            .sub-list{
                li{
                    width: 310px;
                    margin-left: 25px;
                    textarea{
                        width: 280px;
                    }
                }
            }
        }
    }
    
</style>

<style lang="less">
    .comment-content {
        .review-list {
            .review-func{
                width: 310px;
                margin-left: 25px;
                div textarea{
                    width: 280px!important;
                }
                .btnBox{
                    margin-left: 195px;
                    .el-button{
                        padding: 10px;
                    }
                }
            }
            hr{
                margin: 10px 0;
            }
        }
    }
    
    
</style>



