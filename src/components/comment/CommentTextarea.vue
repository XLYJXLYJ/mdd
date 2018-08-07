<template>
    <div id="commnet-text">
        <div><img src="../../assets/img/workshow/logo.png" alt=""></div>
        <div>
            <textarea name="" id="" cols="30" rows="10" @keydown.enter="addComment" v-model="content"></textarea>
        </div>
        <div class="btnBox">
            <el-button @click="quitReply">取消</el-button>
            <el-button type="primary" @click="comment">评论</el-button>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
import func from '@/public/func';
import api from '@/public/api';
export default {
    data () {
        return {
            content:'',
        }
    },
    store,
    methods: {
        ...mapMutations(["setResourceid"]),
        addComment() {
            let id = this.$route.params.id;
            let userid = this.$store.state.userid;
            let resourcetitle = this.$store.state.replyInfo.resourcetitle;
            func.ajaxPost(
                api.commentmodule,
                {
                    resourceid:id,
                    commentatorid:userid,
                    bycommentatorid:userid,
                    type:1,
                    content:this.content,
                    resourcetitle,

                },
                res => {
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
        
        comment() {
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
                    "type":replyInfo.type,
                    "index":replyInfo.index,
                    "content":this.content,
                    "resourcetitle":replyInfo.resourcetitle
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
        quitReply() {
            this.$emit('cancel');
            this.commnetText = '';
        }
    }
}
</script>

<style lang="less" scoped>
    #commnet-text{
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
</style>


