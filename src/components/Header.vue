<!-- 头部导航栏 -->
<template>
    <header>
        <div class="headerBox">
            <div class="logoBox cur fl">
                <img src="./../assets/img/twod/LOGO.png" alt="许多米科技">
            </div>
            <div class="menulist fl">
                <ul>
                    <li @click="menuActive(1)"><router-link to="/2D" :class="{active:current == '1'}" index='1' >2D</router-link></li>
                    <li @click="menuActive(2)"><router-link to="/3D" :class="{active:current == '2'}">3D</router-link></li>
                    <!-- <li @click="menuActive(3)"><router-link to="/media" :class="{active:current == '3'}">多媒体</router-link></li> -->
                </ul>
            </div>
            <div class="search-btn fl">
                <el-input placeholder="请输入内容" v-model="text" @keyup.enter.native="search">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
                <!-- <span @click="getFile">测试读取数据</span> -->
            </div>
            <!-- <img :src="testimg" alt="" style="width:100px;height:100px;"> -->
            <div class="loginBox fr">
                <div v-if="$store.state.isLogin" class="user_contant">
                    <div class="news_box">
                        <div class="new_icon iconfont icon-xiaoxi" @click="changeisShowNews"></div>
                        <transition name="el-fade-in-linear">
                            <message :msg="promptMessage"></message>
                        </transition>
                    </div>
                    <div class="user_box">
                        <div class="user_icon" @click="showUser">{{$store.state.username}}</div>
                        <transition name="el-fade-in-linear">
                            <div class="sub_userfunc" v-if="isuserCli">
                                <ul>
                                    <li @click="isuserCli=false;"><router-link :to="{path:'/mine/'+this.$store.state.userid}">我的主页</router-link></li>
                                    <li @click="isuserCli=false;"><router-link :to="{name:'PersonSet'}">个人设置</router-link></li>
                                    <li @click="quitLogin">退出</li>
                                </ul>
                            </div>
                        </transition>
                    </div>
                </div>
                <span class="loginBtn" @click="changedialogLogin" v-else>登录/注册</span>
                <span @click="uploadMaterial" class="uploadbtn">上传作品</span>
            </div>
        </div>
        <!-- 登陆 -->
        <!-- <transition name="el-fade-in-linear">
            <login></login>
        </transition> -->
        <!-- 注册 -->
        <!-- <transition name="el-fade-in-linear">
            <signup></signup>
        </transition> -->
        <!-- 忘记密码 -->
        <!-- <transition name="el-fade-in-linear">
            <ForgetPassword></ForgetPassword>
        </transition> -->
        <!-- 上传 -->
        <!-- <transition name="el-fade-in-linear">
            <upload></upload>
        </transition> -->
        
    </header>
</template>
<script>
// import login from '@/components/login/Login'
// import signup from '@/components/login/Signup'
// import ForgetPassword from '@/components/login/ForgetPassword'
import upload from '@/components/upload'
import message from '@/components/message'
import func from '../public/func';
import api from '../public/api';
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
import store from '@/vuex/store'
export default {
    data () {
        // 验证用户名
        let checkUsername = (rule, value, callback) => {
            if(!value) {
                return callback(new Error('请输入用户名'))
            }
        }
        //验证密码
        return {
            current:'1',
            text:'',
            list:[],
            isLogin:false,
            isuserCli:false,
            isnewCli:false,
            uploadState:true,
            promptMessage:[]
            
        }
    },
    components: {
        // login,signup,ForgetPassword,
        upload,message
    },
    computed: {
    },
    methods: {
        ...mapMutations(["changedialogLogin","changedialogUpload","changeisShowNews","setPublicKey","setisLogin","setusername","setuserid","setuserheadportrait"]),
        menuActive(key) {
            this.current = key;
        },
        showUser() {
            if(this.isuserCli) {
                this.isuserCli = false
            }else{
                this.isuserCli = true
            }
        },
        showNews() {
            if(this.isnewCli) {
                this.isnewCli = false
            }else{
                this.isnewCli = true
            }
        },
        search() {
            this.$router.push(`/search/${this.text}`)
        },
        quitLogin() {
            func.ajaxGet(
                api.logout,
                res => {
                    if(res.data.status == 200){
                        if(res.data.data) {
                            this.Message('退出成功','success');
                            this.isuserCli = false;
                            window.location.href = "/";
                        }else if(res.data.errmsg) {
                            this.Message(res.data.errmsg,error)
                        }
                    }else if(res.data.status == 500){
                        this.Message(res.data.errmsg,error)
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
        getFile () {
            func.ajaxPost(
                api.getfile,
                {
                    id:11595,
                },
                res => {
                    console.log(res.data);
                }
            )
        }
    },
    mounted () {
        // if(localStorage.hasOwnProperty('mymf')) {
        //     let strStorage = window.localStorage? localStorage.getItem('mymf'):Cookie.read("mymf");
        //     console.log(strStorage);
        //     let tempStorage = strStorage.split(",");
        //     if(new Date().getTime()-tempStorage[2]<604800000) {
        //         this.id = tempStorage[0];
        //         this.formLogin.username = tempStorage[1];
        //         this.isLogin = true;
        //     }
        // }
        // func.ajaxPost(
        //     api.getfile,
        //     {
        //         id:11595,
        //     },
        //     res => {
        //         console.log(res.data);
        //     }
        // )
        if(this.$router.currentRoute.path == '/2D') {
            this.current = 1
        }else if(this.$router.currentRoute.path == '/3D') {
            this.current = 2
        }else if(this.$router.currentRoute.path == '/media') {
            this.current = 3
        }
        func.ajaxGet(
            api.verify,
            res => {
                if(res.data.status == 200 &&　res.data.data) {
                    let key = res.data.data.publicKey;
                    this.setPublicKey(key);
                    if(res.data.data.userid) {
                        this.setisLogin();
                        this.setusername(res.data.data.username);
                        this.setuserid(res.data.data.userid);
                        if(res.data.data.headportrait) {
                            this.setuserheadportrait(res.data.data.headportrait)
                        }
                        this.promptMessage = res.data.data.message;
                        console.log(res.data.data.message)
                    }
                } 
                
            }
        )
    },
    store
}
</script>
<style lang="less" scoped>
    header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 70px;
        width: 100%;
        max-width: 1920px;
        background: #383838;
        z-index: 999;
        margin: 0 auto;
        .headerBox{
            height: 70px;
            // padding: 0 140px;
            width: 1200px;
            margin: 0 auto;
            .logoBox{
                width: 163px;
                height: 40px;
                margin-top: 15px;
            }
            .menulist ul{
                margin-left: 24px;
                .bac{
                    color: #fff;
                }
                li{
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    margin-top: 15px;
                    margin-right: 54px;
                    a{
                        color: #9B9B9B;
                        &:hover{
                        color: #fff;
                            cursor: pointer;
                        }
                    }
                }
            }
            .search-btn{
                width: 300px;
                margin-top: 10px;
                input{
                    background-color: #383838;
                }
            }
            .loginBox{
                span{
                    // width: 94px;
                    height: 34px;
                    line-height: 34px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                    background: #383838;
                    color: #fff;
                    margin-top: 18px;
                    display: inline-block;
                    cursor: pointer;
                }
                .user_contant{
                    display: inline-block;
                    // width: 96px;
                    height: 36px;
                    margin-right: 30px;
                    vertical-align: middle;
                    .news_box{
                        display: inline-block;
                        margin-right: 30px;
                        vertical-align: middle;
                        position: relative;
                        .new_icon{
                            width: 30px;
                            height: 30px;
                            cursor: pointer;
                            color: #fff;
                            font-size: 22px;
                            line-height: 30px;
                        }
                        .sub_news_contain{
                            position: absolute;
                            top: 40px;
                            right: 0;
                            width: 380px;
                            height: 450px;
                            background-color: #474747;
                            color: #747474;
                        }
                    }
                    .user_box{
                        display: inline-block;
                        cursor: pointer;
                        position: relative;
                        .user_icon{
                            // width: 30px;
                            // height: 30px;
                            color: #fff;
                            // img{
                            //     width: 100%;
                            //     height: 100%;
                            // }
                        }
                        .sub_userfunc{
                            position: absolute;
                            top: 40px;
                            left: -10px;
                            width: 120px;
                            height: 108px;
                            text-align: left;
                            ul{
                                margin-left: 0;
                                li{
                                    width: 110px;
                                    height: 36px;
                                    line-height: 36px;
                                    font-size: 14px;
                                    color: #fff;
                                    margin-top: 0;
                                    margin-right: 0;
                                    background-color: #474747;
                                    padding-left: 10px;
                                    &:hover{
                                        background-color: #383838;
                                    }
                                }
                            }
                            
                        }
                    }
                    
                }
                .loginBtn{
                    width: 94px;
                    margin-right: 30px;
                }
                .uploadbtn{
                    width: 94px;
                }
            }
        }
    }
</style>
<style lang="less">
    .active{
        color: #fff!important;
    }
    .dialogForgetPassword .el-dialog,.dialogLogin .el-dialog{
        width: 685px;
        height: 306px;
        border-radius: 10px;
        text-align: left;
        .el-dialog__body{
            padding:0 20px;
        }
        .codebox{
            position: relative;
            .verifycode-input .el-input__inner{
                width:164px;
                height: 32px;
                margin-right:6px;
            }
            .getcode-btn{
                width:90px;
                height: 32px;
                position: absolute;
                top:5px;
                right:0;
            }
        }
        
    }
    .dialogSignup .el-dialog{
        width: 685px;
        height: 480px;
        border-radius: 10px;
        text-align: left;
    }
    .el-form-item{
        margin-bottom:22px;
    }
    .dialogForgetPassword .el-dialog__body{
        padding: 0;
        .agreement{
            margin-bottom:0;
        }
    }
    .dilog-left{
        padding: 40px 80px 30px 50px;
        width: 260px;
        p{
            font-size:18px;
            color:#515666;
            margin-bottom:30px;
        }
        input{
            width:260px;
            height: 32px;
            // margin-bottom:24px;
            border-radius:5px;
            border:1px solid #eee;
        }
        button{
            width:260px;
            height: 32px;
            margin-bottom:12px;
            padding: 0;
        }
        .el-checkbox{
            margin-bottom:12px;
        }
        .color-font{
            color:#0078D7;
        }
    }
    .dilog-right{
        padding: 0 30px 30px 0;
    }
    .el-dialog__wrapper{
        background-color: rgba(30,30,30,.5);
    }
    .search-btn .el-input .el-input__inner{
        background-color: #383838;
        border: 1px solid #383838;
        color: #c0c4cc;
    }
    .sub_news_contain{
        .el-tabs__header{
            height: 66px;
            line-height: 66px;
            margin-bottom: 0;
            .el-tabs__item{
                width:190px;
                padding:0;
                font-size:18px;
                color:#747474;
            }
        }
        ul li{
            height: 80px;
            padding:20px;
            box-sizing:border-box;
            .newlist_icon {
                width:40px;
                height: 40px;
                border-radius:50%;
                img{
                    width:100%;
                    height: 100%;
                }
            }
            .newlsit_contant{
                margin-left:10px;
                div{
                    color:#A3A3A3;
                    line-height:20px;
                    font-size:14px;
                    text-align:left;
                }
            }

        }
    }
    //上传
    .dialogUpload .el-dialog__header{
        padding:0!important;
    }
    .upload-container{
        width: 600px;
        height: 465px;
        margin: 0 auto;
        // margin-top: 148px;
        background-color: #fff;
        border-radius: 6px;
        padding: 30px 35px;
        box-sizing: border-box;
        text-align:left;
        >p{
            font-size: 24px;
            color: #616161;
            margin-bottom: 30px;
        }
        .uploader{
            width:530px;
            // padding:30px;
            height: 290px;
            background:#f5f5f5;
            .uploader_area{
                .el-upload-dragger{
                    width:530px;
                    height: 116px;
                    button {
                        width:200px;
                        height: 50px;
                        margin-top:30px;
                        margin-bottom:10px;
                        font-size:18px;
                    }
                }
            }
            .upload_limit{
                height: 132px;
                // margin-top:30px;
                p{
                    font-size:14px;
                    color:#9E9E9E;
                    line-height:26px;
                    text-align:center;
                }
            }
        }
        .upload_footer {
            text-align:right;
            margin-top:20px;
            button{
                width:90px;
                // height: 34px;
                // color:#bdbdbd;
            }
        }
        .fileinfo{
            background:#f5f5f5;
            padding:30px;
            height: 230px;
            .el-input input{
                width:380px;
            }
            
        }
    }
    .el-cascader-menu{
        // width:232px;
    }
    
</style>

