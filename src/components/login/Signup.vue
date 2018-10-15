<template>
    <div class="dialogSignup" v-if="$store.state.dialogSignup">
        <el-dialog :visible.sync="$store.state.dialogSignup" :modal="false" :show-close="false">
            <div class="dilog-left fl">
                <p>欢迎注册许多米素材网</p>
                <el-form :model="formSignup" :rules="rules2">
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
                        <span class="fr">已有账号<span class="color-font cur" @click="changedialogLogin">点击登录</span></span>
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
import Vue from 'vue'
import axios from 'axios'
export default {
    data () {
        return {
            formSignup: {
                username: '',
                password: '',
                mail:'',
            },
            rules2:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                mail:[
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    // { type:mail, message: '请输入合法的email邮箱', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    {min:6,max:12, message: '长度在 6 到 12 个英文与数字', trigger: 'blur' }
                ],
                agreement:[
                    { required: true, message: '请阅读并同意《服务协议》和隐私政策', trigger: 'change' }
                ]
            },
        }
    },
    store,
    methods: {
        ...mapMutations(["changedialogLogin","changedialogSignup"]),
        Signupbtn() {
            let that = this;
            // let publicKey = this.$store.state.publicKey;
            // let privatekey = new NodeRSA(publicKey);
            // let password = privatekey.encrypt(this.formSignup.password,'base64');
            func.ajaxPost(
                api.signup,
                {
                    username:this.formSignup.username,
                    mail:this.formSignup.mail,
                    password:this.formSignup.password,
                },
                res => {
                    if(res.data.status==200) {
                        if(res.data.data) {
                            this.changedialogSignup();
                            this.Message(res.data.data.msg,success)
                        }else if(res.data.errmsg) {
                            this.Message(errmsg,error)
                        }
                    }else if(res.data.status == 500){
                        this.Message(errmsg,error)
                    }
                }
            )

            axios.post('/forum/api/v2/users', 
                {
                    _uid:1,
                    username:this.formSignup.username,
                    mail:this.formSignup.mail,
                    password:this.formSignup.password,
                },
                {
                    headers: {'Authorization':'Bearer db7a60a5-6c70-4057-b1d4-1dd289895c31'},
                }
            )
            .then(response => {
            })
            .catch(function (error) {
                console.log(error);
            });


        },
    },
}
</script>
<style lang="less">
    .dialogSignup{
        .el-dialog__body{
            padding: 30px 20px;
        }
        .dilog-left{
            padding: 0 20px;
        }
        .el-dialog__header{
            padding: 0;
        }
        .el-input .el-input__inner{
            width: 526px;
            height: 40px;
        }
    }
</style>


