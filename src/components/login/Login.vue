<template>
    <div class="dialogLogin" v-if="$store.state.dialogLogin">
        <el-dialog :visible.sync="$store.state.dialogLogin" :modal="false" :show-close="false">
            <div class="dilog-left fl">
                <p>欢迎使用许多米素材网</p>
                <el-form :model="formLogin" :rules="rules1">
                    <el-form-item prop="username">
                        <el-input v-model="formLogin.username" auto-complete="off" placeholder="请输入用户名/邮箱"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="formLogin.password" auto-complete="off" placeholder="密码" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="Loginbtn(formLogin)">登录</el-button>
                    <div>
                        <span class="fl color-font cur" @click="changedialogForgetPassword">忘记密码</span>
                        <span class="fr">还没有账号?<span class="color-font cur" @click="changedialogSignup">点击注册</span></span>
                    </div>
                </div>
            </div>
            <div class="dialog-right fl">
                <img src="" alt="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
import NodeRSA from 'node-rsa';
import store from '@/vuex/store'
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
import func from '@/public/func';
import api from '@/public/api';
export default {
    data () {
        return {
            formLogin: {
                id:'',
                username: '',
                password: '',
            },
            rules1:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min:3, message: '此用户名不存在', trigger: 'blur' },
                    // { validator:checkUsername, trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {min:6,max:12, message: '长度在 6 到 12 个英文与数字', trigger: 'blur' }
                ]
            },
        }
    },
    store,    
    computed: {
    },
    methods: {
        ...mapMutations(["changedialogLogin","changedialogSignup","changedialogForgetPassword","setisLogin","setusername","setuserid"]),
        Loginbtn(formLogin) {
            // this.$refs[formLogin].validate((valid) => {
            //     console.log(valid);
            //     if(valid) {
            //         console.log('submit')
            //     }else{
            //         console.log('error')
            //     }
            // })
            if(this.formLogin.username && this.formLogin.password) {
                let publicKey = this.$store.state.publicKey;
                let privatekey = new NodeRSA(publicKey);
                let password = privatekey.encrypt(this.formLogin.password,'base64');
                func.ajaxPost(
                    api.login, 
                    {
                        username:this.formLogin.username,
                        password:password,
                    },
                    res => {
                    let resData = res.data;
                    if(resData.status == 200){
                        if(resData.data) {
                            if(localStorage) {
                                if(localStorage.getItem("modelUserid")) {
                                    if(localStorage.getItem("modelUserid") !== res.data.data.userid) {
                                        localStorage.setItem("modelUserid",res.data.data.userid);
                                        console.log("重新赋值")
                                    }
                                }else{
                                    localStorage.setItem("modelUserid",res.data.data.userid);
                                    console.log("初始化")
                                }
                            }
                            this.changedialogLogin();
                            this.setisLogin();
                            this.setusername(resData.data.username);
                            this.setuserid(resData.data.id);
                            this.Message('登录成功','success')
                        }else if(resData.errmsg) {
                            this.Message(resData.errmsg,error)
                        }
                    }else if(resData.status == 500){
                        this.Message(resData.errmsg,error)
                    }
                });
            }
            
        },
    },
}
</script>

<style lang="less">
    .dialogLogin {
        .dilog-left{
            padding: 0 20px;
            input {
                width: 260px;
                height: 32px;
            }
        }
    }
    
</style>


