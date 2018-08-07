<template>
    <div class="dialogForgetPassword" v-if="$store.state.dialogForgetPassword">
        <el-dialog :visible.sync="$store.state.dialogForgetPassword" :modal="false" :show-close="false">
            <div class="dilog-left fl">
                <p>忘记密码</p>
                <el-form :model="formReset" v-if="resetStatus" :rules="rules3">
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
                        <span class="fl color-font cur" @click="changedialogLogin">返回登录</span>
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
import store from '@/vuex/store'
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
import func from '@/public/func';
import api from '@/public/api';
export default {
    data () {
        return {
            resetStatus:true,
            formReset: {
                password: '',
                surepassword: '',
                mail:'',
                code:'',
            },
            rules3:{
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
                ]
            },
        }
    },
    store,    
    computed: {
    },
    methods: {
        ...mapMutations(["changedialogLogin"]),
        GetverifyCode() {
            func.ajaxPost(
                api.getverifycode,
                {
                    mail:this.formReset.mail,
                },
                res => {
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message(msg,succces)
                        }else if(res.data.errmsg) {
                            this.Message(msg,succces)
                        }
                    }else if(res.data.status == 500){
                        this.Message(errmsg,error)
                    }
                    
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
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message(res.data.data.msg,succces);
                            this.resetStatus = false;
                        }else{
                            this.Message(res.data.errmsg,error)
                        }
                    }else if(res.data.status === 500) {
                        this.Message(res.data.errmsg,error)
                    }
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
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message('密码重置成功！',succces);
                            this.dialogForgetPassword = false;
                            this.resetStatus = true;
                        }else{
                            this.Message(res.data.errmsg,error)
                        }
                    }else if(res.data.status === 500) {
                        this.Message(res.data.errmsg,error)
                    }
                    
                }
            )
        },
        
    },
}
</script>

<style lang="less">
    .dialogForgetPassword{
        .el-dialog__header{
            padding:0
        }
        .dilog-left{
            padding: 0 20px;
            .el-input .el-input__inner {
                width: 260px;
                height: 32px;
            }
        }
        .el-dialog__body{
            padding:30px 20px;
        }
    }
    
</style>


