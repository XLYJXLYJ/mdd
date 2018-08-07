<!-- 头部导航栏 -->
<template>
    <header>
        <div class="headerBox">
            <div class="logoBox cur fl">
                <img src="./../assets/img/twod/LOGO.png" alt="许多米科技">
            </div>
            <div class="fl">
                <ul>
                    <li class="bac">2D</li>
                    <li>3D</li>
                    <li>多媒体</li>
                </ul>
            </div>
            <div class="search-btn fl">
                <el-input placeholder="请输入内容" v-model="text" v-on:keyup.enter="search">
                    <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
            </div>
            <div class="loginBox fr">
                <div v-if="isLogin" class="user_contant">
                    <div class="news_box">
                        <div class="new_icon"><img src="./../assets/img/twod/LOGO.png" alt=""></div>
                    </div>
                    <div class="user_box">
                        <div class="user_icon"><img src="./../assets/img/twod/LOGO.png" alt=""></div>
                    </div>
                </div>
                <span class="loginBtn" @click="dialogLogin = true" v-else>登录/注册</span>
                <message></message>
                <span @click="showUpload == true">上传作品</span>
            </div>
        </div>
        <!-- 登陆 -->
        <transition name="el-fade-in-linear">
            <div class="dialogLogin" v-if="dialogLogin">
                <el-dialog :visible.sync="dialogLogin" :modal="false" :show-close="false">
                    <div class="dilog-left fl">
                        <p>欢迎使用许多米素材网</p>
                        <el-form :model="formLogin" :rules="rules">
                            <el-form-item prop="loginname">
                                <el-input v-model="formLogin.username" auto-complete="off" placeholder="请输入用户名/邮箱"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input v-model="formLogin.password" auto-complete="off" placeholder="密码" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="Loginbtn">登录</el-button>
                            <div>
                                <span class="fl color-font cur" @click="dialogForgetPasswordbtn">忘记密码</span>
                                <span class="fr">还没有账号?<span class="color-font cur" @click="dialogSignupbtn">点击注册</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-right fl">
                        <img src="" alt="">
                    </div>
                </el-dialog>
            </div>
        </transition>
        <!-- 注册 -->
        <transition name="el-fade-in-linear">
            <div class="dialogSignup" v-if="dialogSignup">
                <el-dialog :visible.sync="dialogSignup" :modal="false" :show-close="false">
                    <div class="dilog-left fl">
                        <p>欢迎注册许多米素材网</p>
                        <el-form :model="formSignup" :rules="rules">
                            <el-form-item prop="username">
                                <el-input v-model="formSignup.username" auto-complete="off" placeholder="请输入用户名"></el-input>
                            </el-form-item>
                            <el-form-item prop="mail">
                                <el-input type="eamil" v-model="formSignup.mail" auto-complete="off" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="formSignup.password" auto-complete="off" placeholder="请输入密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input type="password" v-model="formSignup.surepassword" auto-complete="off" placeholder="请确认密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="agreement" class="agreement">
                                <el-checkbox>我已阅读并同意《服务协议》和隐私政策</el-checkbox>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="Signupbtn">注册</el-button>
                            <div>
                                <span class="fr">已有账号<span class="color-font cur" @click="dialogLoginbtn">点击登录</span></span>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-right fl">
                        <img src="" alt="">
                    </div>
                </el-dialog>
            </div>
        </transition>
        <!-- 忘记密码 -->
        <transition name="el-fade-in-linear">
            <div class="dialogForgetPassword" v-if="dialogForgetPassword">
                <el-dialog :visible.sync="dialogForgetPassword" :modal="false" :show-close="false">
                    <div class="dilog-left fl">
                        <p>忘记密码</p>
                        <el-form :model="formReset" v-if="resetStatus" :rules="rules">
                            <el-form-item prop="mail">
                                <el-input type="eamil" v-model="formReset.mail" auto-complete="off" placeholder="请输入邮箱"></el-input>
                            </el-form-item>
                            <div class="codebox">
                                <el-form-item prop="code">
                                    <el-input v-model="formReset.code" auto-complete="off" class="verifycode-input" placeholder="请输入验证码"></el-input>
                                </el-form-item>
                                <el-button type="primary" @click="GetverifyCode" class="getcode-btn">获取验证码</el-button>
                            </div>
                        </el-form>
                        <el-form :model="form" v-else :rules="rules">
                            <el-form-item prop="password">
                            <el-input  type="password" v-model="formReset.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="password">
                                <el-input  type="password" v-model="formReset.password" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button type="primary" @click="CheckCode" v-if="resetStatus">下一步</el-button>
                            <el-button type="primary" @click="SetPassword" v-else>完成</el-button>
                            <div>
                                <span class="fl color-font cur" @click="dialogLoginbtn">返回登录</span>
                            </div>
                        </div>
                    </div>
                    <div class="dialog-right fl">
                        <img src="" alt="">
                    </div>
                </el-dialog>
            </div>
        </transition>
        <!-- 上传 -->
        <upload v-if="showUpload"></upload>
        
    </header>
</template>
<script>
import upload from '@/components/upload'
import message from '@/components/message'
import func from '../public/func';
import api from '../public/api';
export default {
    data () {
        return {
            text:'',
            list:[],
            isLogin:false,
            showUpload:false,
            dialogLogin:false,
            dialogSignup:false,
            dialogForgetPassword:false,
            resetStatus:true,
            formLogin: {
                username: '',
                password: '',
            },
            formSignup: {
                username: '',
                password: '',
                mail:'',
            },
            formReset: {
                password: '',
                surepassword: '',
                mail:'',
                code:'',
            },
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                loginname:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                mail:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    // { type:mail, message: '请输入合法的email邮箱', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {min:6,max:12, message: '长度在 6 到 12 个英文与数字', trigger: 'blur' }
                ],
                code:[
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { min:6,max:6, message: '请输入正确的验证码', trigger: 'blur' }
                ],
                agreement:[
                    { required: true, message: '请阅读并同意《服务协议》和隐私政策', trigger: 'change' }
                ]
            }
        }
    },
    components: {
        upload,message
    },
    methods: {
        dialogLoginbtn() {
            this.dialogLogin = true;
            this.dialogSignup = false;
            this.dialogForgetPassword = false;
        },
        dialogSignupbtn() {
            this.dialogLogin = false;
            this.dialogSignup = true;
            this.dialogForgetPassword = false;
        },
        dialogForgetPasswordbtn() {
            this.dialogLogin = false;
            this.dialogSignup = false;
            this.dialogForgetPassword = true;
            
        },
        search() {
            func.ajaxPost(
                api.search,
                {search:Vue.text},
                function (data) {
                    console.log(data);
                    if(data.status == 200) {
                        Vue.list = data.data;
                    }
                })
        },
        Loginbtn() {
            func.ajaxPost(
                api.login, 
                {
                    username:this.formLogin.username,
                    password:this.formLogin.password,
                },
                res => {
                console.log(res.data);
                this.dialogLogin=false;
                let data = res.data;
                // if(data.data){
                //     this.isLogin = true;
                // }
            });
        },
        Signupbtn() {
            func.ajaxPost(
                api.signup,
                {
                    username:this.formSignup.username,
                    mail:this.formSignup.mail,
                    password:this.formSignup.password,
                },
                res => {
                    console.log(res.data);
                    this.dialogSignup = false;
                }
            )
        },
        GetverifyCode() {
            func.ajaxPost(
                api.getverifycode,
                {
                    mail:this.formReset.mail,
                },
                res => {
                    console.log(res.data);
                }
            )
        },
        CheckCode() {
            func.ajaxPost(
                api.checkcode,
                {
                    mail:this.formReset.mail,
                    code:this.formReset.code
                },
                res => {
                    console.log(res.data);
                    this.resetStatus = false;
                }
            )
        },
        SetPassword() {
            func.ajaxPost(
                api.setpassword,
                {
                    mail:this.formReset.mail,
                    password:this.formReset.password
                },
                res => {
                    console.log(res.data);
                    this.dialogForgetPassword = false;
                    this.resetStatus = true;
                }
            )
        }


        
    }
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
        max-width: 1280px;
        background: #383838;
        z-index: 2;
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
            ul{
                margin-left: 24px;
                .bac{
                    color: #fff;
                }
                li{
                    float: left;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    color: #9B9B9B;
                    margin-top: 15px;
                    margin-right: 54px;
                    &:hover{
                        color: #fff;
                        cursor: pointer;
                    }
                    
                }
            }
            .search-btn{
                width: 500px;
                margin-top: 15px;
                input{
                    background-color: #383838;
                }
            }
            .loginBox{
                span{
                    width: 94px;
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
                    width: 96px;
                    height: 36px;
                    margin-right: 30px;
                    vertical-align: middle;
                    .news_box{
                        display: inline-block;
                        margin-right: 30px;
                        .new_icon{
                            width: 30px;
                            height: 30px;
                            cursor: pointer;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .user_box{
                        display: inline-block;
                        cursor: pointer;
                        .user_icon{
                            width: 30px;
                            height: 30px;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    
                }
                .loginBtn{
                    margin-right: 30px;
                }
            }
        }
    }
</style>
<style lang="less">
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
                top:0;
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
    .el-dialog__body{
        padding: 0;
        .agreement{
            margin-bottom:0;
        }
    }
    
    
    .dilog-left{
        padding: 10px 80px 30px 50px;
        width: 260px;
        p{
            font-size:18px;
            color:#515666;
            margin-bottom:36px;
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
</style>

