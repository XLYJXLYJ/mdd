<!-- 我的主页 -->
<template>
  <div id="my-home">
      <div class="my-home-wrapper">
          <div class="personal-info">
              <div class="mh-image fl"><img :src="user.headportrait" alt=""></div>
              <div class="author-info fl">
                  <div>
                      <div class="author-name">{{user.username}}</div>
                      <span>{{user.attentionme3D}}粉丝</span>
                      <span>{{user.myattention3D}}关注</span>
                  </div>
                  <div>{{user.aboutme}}</div>
                  <el-button class="blockbutton" @click="editSet" v-if="this.$store.state.userid == user.id">编辑</el-button>
                  <el-button class="blockbutton" @click="quitAttention" v-else-if="user.isAttention">取消关注</el-button>
                  <el-button class="blockbutton" @click="attention" v-else>关注Ta</el-button>
                  <div class="author-tag inB" v-for="(tag,index) in user.mytags" :key="index">
                      <el-tag>{{tag}}</el-tag>
                    </div>
              </div>
          </div>
      </div>
      <div class="my-work-menu">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="` 全部作品(${allModules.length}) `" name="all"></el-tab-pane>
                <el-tab-pane :label="` 我的收藏(${user.mycollect3D}) `" name="mycollect"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <div class="my-work" v-if="activeName === 'all'">
                <p>我的草稿</p>
                <el-row type="flex" class="row-bg" justify="space-between" ref="list">
                    <el-col class="img_single">
                        <div class="avatar-uploader" @click="uploadMaterial"> 
                            <div class="el-upload el-upload--text">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </div>
                        </div>
                    </el-col>
                    <el-col class="img_single" v-for='(list,index) in allModules' :key="index" v-if="list.state === 0">
                        <div class="grid-content">
                            <img :src="list.modelimg" alt="" onerror="javascript:this.src=window.errorImg">
                        </div>
                        <div class="bachover" @click="$router.push({path:`/model/draft/${list.id}`})" v-moduleHover></div>
                        <div class="moduleAuthor" v-moduleShow>
                            <div class="module_title fl">{{list.title}}</div>
                            <el-dropdown class="fr" @command="handNoPublish">
                                <span class="el-dropdown-link iconfont icon-31shezhi"></span>
                                <el-dropdown-menu slot="dropdown">
                                    
                                    <el-dropdown-item :command="{'state':7,'id':list.id,'index':index}">发布</el-dropdown-item>
                                    <el-dropdown-item><router-link :to="{path:`/model/draft/${list.id}`}">编辑</router-link></el-dropdown-item>
                                    <el-dropdown-item :command="{'state':2,'id':list.id,'index':index}">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                </el-row>
            </div>
            <div class="my-work" v-if="activeName === 'all'">
                <p>已发布作品</p>
                <el-row type="flex" class="row-bg" justify="space-between" ref="">
                    <el-col class="img_single" v-for='(list,index) in allModules' :key="index" v-if="list.state === 1">
                        <div class="grid-content">
                            <img :src="list.modelimg" alt="" onerror="javascript:this.src=window.errorImg">
                        </div>
                        <div class="bachover" @click="$router.push({path:`/model/detail/${list.id}`})" v-moduleHover></div>
                        <div class="moduleAuthor" v-moduleShow>
                            <div class="module_title fl">{{list.title}}</div>
                            <el-dropdown class="fr" @command="handHasPublish">
                                <span class="el-dropdown-link iconfont icon-31shezhi"></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{'state':4,'id':list.id,'index':index}">下架</el-dropdown-item>
                                    <el-dropdown-item :command="{'state':2,'id':list.id,'index':index}">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                </el-row>
            </div>
            <div class="my-work" v-if="activeName === 'mycollect'">
                <el-row type="flex" class="row-bg" justify="space-between" ref="">
                    <el-col class="img_single" v-for='(list,index) in myCollect' :key="index" v-if="list.state === 1">
                        <div class="grid-content">
                            <img src="../../assets/img/twod/imglist1.png" alt="">
                        </div>
                        <div class="bachover" @click="$router.push({path:`/model/detail/${list.id}`})" v-moduleHover></div>
                        <div class="moduleAuthor" v-moduleShow>
                            <div class="module_title fl">{{list.title}}</div>
                            <el-dropdown class="fr" @command="handHasCollect">
                                <span class="el-dropdown-link iconfont icon-gengduo"></span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{'state':2,'id':list.id,'index':index}">取消收藏</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                    <span style="display:inline;width:380px;height:0;border:none;"></span>
                </el-row>
            </div>
        </div>
        
  </div>
</template>

<script>
import func from '../../public/func';
import api from '../../public/api';
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
import store from '@/vuex/store'
export default {
    name:"MyHome",
    data () {
        return {
            activeName:'all',
            imageUrl: '',
            user:{},
            allModules:[],
            myCollect:[]
        }
    },
    methods: {
         ...mapMutations(["changedialogUpload"]),
        handleClick(tab,event) {
            console.log(tab.name);
            if(tab.name === 'all') {

            } else if(tab.name === 'mycollect') {
                func.ajaxPost(
                    api.userinfo,
                    {
                        userid:this.user.id,
                        getinfostate:3
                    },
                    res => {
                        if(res.data.status === 200) {
                            console.log(res.data);
                            this.myCollect = res.data.data;
                        }
                        
                    }
                )
            }
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        editSet() {
            let userid = this.user.userid;
            this.$router.push(`/setting`);
        },
        attention() {
            let authid = this.user.id;
            let userid = this.$store.state.userid;
            func.ajaxPost(
                api.useropreate,
                {
                    "userid":userid,
                    "state":5,
                    "attentionid":authid,
                },
                res => {
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message('关注成功','success');
                            this.user.isAttention = true;
                        }else{
                            this.Message(res.data.errmsg,'warning')
                        }
                    } else{
                        this.Message(res.data.errmsg,'warning')
                    }
                }
            )
        },
        quitAttention() {
            let authid = this.user.id;
            let userid = this.$store.state.userid;
            func.ajaxPost(
                api.useropreate,
                {
                    "userid":userid,
                    "state":6,
                    "attentionid":authid,
                },
                res => {
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message('取消关注成功','success');
                            this.user.isAttention = false
                        }else{
                            this.Message(res.data.errmsg,'warning')
                        }
                    } else{
                        this.Message(res.data.errmsg,'warning')
                    }
                }
            )
        },
        uploadMaterial() {
            let userid = this.$store.state.userid;
            if(userid) {
                this.changedialogUpload();
            }else{
                this.Alert('请登录后上传作品','提示',{
                    text:'确定',
                    type:'info',
                    message:'请登录后上传作品',
                })
            }
        },
        handNoPublish(command) {
            let userid = this.$store.state.userid;
            if(command.state === 7) {
                func.ajaxPost(
                    api.useropreate,
                    {
                        userid,
                        state:command.state,
                        id:command.id,
                    },
                    res => {
                        if(res.data.status === 200) {
                            if(res.data.data) {
                                this.Message('发布成功','success');
                                this.allModules[command.index]['state'] = 1;
                            }
                        }
                    }
                )
            }else if(command.state === 2) {
                this.Confirm('确定删除这个作品嘛?','提示',{
                    confirmCb() {
                        func.ajaxPost(
                            api.dealmodule,
                            {
                                userid,
                                state:command.state,
                                id:command.id,
                            },
                            res => {
                                if(res.data.status === 200) {
                                    if(res.data.data) {
                                        this.Message('删除成功','success');
                                        this.allModules[command.index]['state'] = 2;
                                    }
                                }
                            }
                        )
                    },
                    isShowMessage:false
                })
                
            }

        },
        handHasPublish(command) {
            console.log(typeof(command.state))
            let userid = this.$store.state.userid;
            if(command.state === 4) {
                func.ajaxPost(
                    api.dealmodule,
                    {
                        userid,
                        state:command.state,
                        id:command.id,
                    },
                    res => {
                        if(res.data.status === 200) {
                            if(res.data.data) {
                                this.Message('下架成功','success');
                                this.allModules[command.index]['state'] = 0;
                            }
                        }
                    }
                )
            }else if(command.state === 2) {
                this.Confirm('确定删除这个作品嘛?','提示',{
                    confirmCb() {
                        func.ajaxPost(
                            api.dealmodule,
                            {
                                userid,
                                state:command.state,
                                id:command.id,
                            },
                            res => {
                                if(res.data.status === 200) {
                                    if(res.data.data) {
                                        this.Message('删除成功','success');
                                        this.allModules[command.index]['state'] = 2;
                                    }
                                }
                            }
                        )
                    },
                    isShowMessage:false
                })
            }

        },
        handHasCollect(command,id) {
            let userid = this.$store.state.userid;
            if(command.state === 2) {
                func.ajaxPost(
                    api.useropreate,
                    {
                        userid,
                        state:command.state,
                        id:command.id,
                    },
                    res => {
                        if(res.data.status === 200) {
                            if(res.data.data) {
                                this.Message('取消收藏成功','success');
                                this.myCollect.splice(command.index,1);
                                this.user.mycollect3D -=1;
                            }
                        }
                    }
                )
            }
        }
    },
    mounted () {
            let userid = this.$route.params.id;
            func.ajaxPost(
                api.userinfo,
                {
                    userid,
                    getinfostate:2
                },
                res => {
                    if(res.data.status === 200) {
                        this.user = res.data.data.user;
                        Array.from(res.data.data.data,(value) => {
                            if(!value.modelimg) {
                                value.modelimg = "null"
                            }
                            return value
                        })
                        this.allModules = res.data.data.data;
                        if(!this.user.headportrait) {
                            this.user.headportrait = "/res/static/img/logo.42adf1f.png"
                        }

                    }
                    
                }
            )
    }
}
</script>

<style lang="less" scoped>
    #my-home{
        text-align: left;
        .my-home-wrapper{
            max-width: 1200px;
            margin: 0 auto;
            background: url(../../assets/img/mineBac.jpg) no-repeat;
            .personal-info{
                height: 216px;
                padding-top: 60px;
                .mh-image{
                    width: 120px;
                    height: 120px;
                    margin: 0 40px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .author-info{
                    >div{
                        margin-bottom: 12px;
                        font-size: 14px;
                        color: #E2E2E2;
                        .author-name{
                            font-size: 24px;
                            display: inline-block;
                            color: #fff;
                        }
                        span{
                            margin: 0 10px;
                        }
                        
                        
                    }
                    .author-tag{
                        margin-top: 40px;
                    }
                }
            }
        }
        .my-work-menu{
            background: #fff;
            height: 55px;
            line-height: 55px;
        }
        .my-work{
            width: 1200px;
            margin: 0 auto;
            margin-top: 10px;
            @size:100%;
            box-sizing: border-box;
            p{
                color: #9e9e9e;
                margin-top: 30px;
                margin-bottom: 16px;
            }
            .el-row--flex {
                flex-wrap:wrap;
                .img_single{
                    width: 387px;
                    height: 242px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    border-radius: 3px;
                    position: relative;
                    .grid-content{
                        width: 100%;
                        height: 100%;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .moduleAuthor{
                        left: 0;
                        right: 0;
                        bottom: 0;
                        padding: 10px;
                        height: 50px;
                        position: absolute;
                        box-sizing: border-box;
                        display: none;
                        .icon-gengduo,.icon-31shezhi{
                            width: 30px;
                            height: 30px;
                            font-size: 20px;
                            text-align: center;
                            line-height: 30px;
                            border-radius: 50%;
                            display: block;
                            &:hover{
                                background-color: #00b8d4;
                            }
                        }
                        .author_avatar{
                            width: 30px;
                            height: 30px;
                            margin-right: 10px;
                        }
                        .module_title{
                            color: #fff;
                            line-height: 30px;
                        }
                    }
                    
                    .bachover{
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        &:hover{
                            background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.3));
                            
                        }
                    }
                    
                }
            }
        }
    }
</style>
<style lang="less">
    #my-home{
        .blockbutton{
            display: block;
        }
        .author-tag span{
            /* width: 66px; */
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: #586A8D;
            border: none;
            color: #fff;
            margin-right: 10px;
        }

        .el-tabs{
            max-width: 1200px;
            margin: 0 auto;
            
        }
        .avatar-uploader .el-upload {
            width: 387px;
            height: 242px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 100px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 242px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
        .el-dropdown{
            color: #fff;
        }
    }
    .el-dropdown-menu .el-dropdown-menu__item{
        a{
            color:#606266;
        }
    }
    
</style>



