<template>
    <div class="dialogUpload" v-if="$store.state.dialogUpload">
        <el-dialog 
            :visible.sync="$store.state.dialogUpload" 
            :modal="false" 
            :show-close="false" 
            :close-on-click-modal="false"
             v-loading="loading"
            element-loading-text="上传中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.1)">
            <div class="upload-container">
                <p>上传新模型</p>
                <div class="uploader" v-show="uploadshow">
                    <div class="uploader_area">
                        <el-upload
                            :visible.sync="$store.state.dialogUpload"
                            ref="upload"
                            :modal="false"
                            drag
                            :auto-upload="false"
                            :limit="1"
                            action="/api/material/uploadmaterial"
                            :data = "fileInfo"
                            :on-success="uploadSuccess"
                            :on-error="uploadError"
                            >
                            <el-button type="primary">选择上传</el-button>
                            <p>或将模型拖到此处</p>
                        </el-upload>
                    </div>
                    <div class="upload_limit">
                        <p>支持一下格式</p>
                        <p>2D格式:jpg,png,dds,tga</p>
                        <p>3D格式:fbx,stl</p>
                        <p>多媒体:MP3</p>
                        <p>每次允许上传一个模型,大小不超过20M</p>
                    </div>
                </div>
                <div v-show="!uploadshow">
                    <el-form :label-position="labelPosition" label-width="80px" :model="fileInfo" class="fileinfo">
                        <el-form-item label="类型">
                            <el-select v-model="fileInfo.type" placeholder="类型">
                                <el-option label="2D" value="1"></el-option>
                                <el-option label="3D" value="2"></el-option>
                                <el-option label="多媒体" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标题">
                            <el-input v-model="fileInfo.title"></el-input>
                        </el-form-item>
                        <el-form-item label="模型类型">
                            <el-cascader
                                expand-trigger="hover"
                                :options="options"
                                v-model="selectedOptions"
                                @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="upload_footer">
                    <el-button @click="quitUpload">取消</el-button>
                    <el-button type="primary" @click="submitnext" v-if="uploadshow">上传</el-button>
                    <el-button type="primary" @click="submitUpload" v-else>确定上传</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import store from '@/vuex/store'
import {mapState,mapMutations ,mapGetters ,mapActions} from 'vuex'
export default {
    data () {
        return {
            loading:false,
            uploadshow:true,
            labelPosition:'left',
            selectedOptions: [],
            fileInfo:{
                title:'',
                type:'',
                filetype:'',
                userid:'',
                state:1
            },
            options:[
                {
                value:'人物',
                label:'人物',
                children:[{
                    value:'女性',
                    label:'女性'
                },{
                    value:'男性',
                    label:'男性'
                },{
                    value:'卡通女性',
                    label:'卡通女性'
                },{
                    value:'卡通男性',
                    label:'卡通男性'
                },{
                    value:'虚拟人物',
                    label:'虚拟人物'
                },{
                    value:'机器人',
                    label:'机器人'
                },{
                    value:'异性怪物',
                    label:'异性怪物'
                },{
                    value:'人体器官',
                    label:'人体器官'
                },]
                },{
                    value:'动物',
                    label:'动物',
                    children:[{
                        value:'哺乳',
                        label:'哺乳'
                    },{
                        value:'爬行',
                        label:'爬行'
                    },{
                        value:'飞禽',
                        label:'飞禽'
                    },{
                        value:'昆虫',
                        label:'昆虫'
                    },{
                        value:'鱼类',
                        label:'鱼类'
                    },{
                        value:'恐龙',
                        label:'恐龙'
                    },{
                        value:'机器动物',
                        label:'机器动物'
                    },]
                },{
                    value:'植物',
                    label:'植物',
                    children:[{
                        value:'树木',
                        label:'树木'
                    },{
                        value:'草类',
                        label:'草类'
                    },{
                        value:'花卉',
                        label:'花卉'
                    },{
                        value:'水果蔬菜',
                        label:'水果蔬菜'
                    },]
                },{
                    value:'载具',
                    label:'载具',
                    children:[{
                        value:'汽车',
                        label:'汽车'
                    },{
                        value:'自行车',
                        label:'自行车'
                    },{
                        value:'摩托车',
                        label:'摩托车'
                    },{
                        value:'飞机',
                        label:'飞机'
                    },{
                        value:'火车',
                        label:'火车'
                    },{
                        value:'船只',
                        label:'船只'
                    },{
                        value:'宇宙飞船',
                        label:'宇宙飞船'
                    },{
                        value:'车辆部件',
                        label:'车辆部件'
                    },]
                },{
                    value:'室外',
                    label:'室外',
                    children:[{
                        value:'历史古迹',
                        label:'历史古迹'
                    },{
                        value:'城市场景',
                        label:'城市场景'
                    },{
                        value:'自然场景',
                        label:'自然场景'
                    },{
                        value:'地标建筑',
                        label:'地标建筑'
                    },{
                        value:'公共设施',
                        label:'公共设施'
                    },{
                        value:'私人住宅',
                        label:'私人住宅'
                    },{
                        value:'商业办公',
                        label:'商业办公'
                    },{
                        value:'科幻场景',
                        label:'科幻场景'
                    },]
                },{
                    value:'室内',
                    label:'室内',
                    children:[{
                        value:'餐厅',
                        label:'餐厅'
                    },{
                        value:'客厅',
                        label:'客厅'
                    },{
                        value:'卧室',
                        label:'卧室'
                    },{
                        value:'书房',
                        label:'书房'
                    },{
                        value:'厨房',
                        label:'厨房'
                    },{
                        value:'卫浴',
                        label:'卫浴'
                    },{
                        value:'阳台',
                        label:'阳台'
                    },]
                },{
                    value:'家具',
                    label:'家具',
                    children:[{
                        value:'椅子',
                        label:'椅子'
                    },{
                        value:'桌子',
                        label:'桌子'
                    },{
                        value:'沙发',
                        label:'沙发'
                    },{
                        value:'柜子',
                        label:'柜子'
                    },{
                        value:'床',
                        label:'床'
                    },{
                        value:'灯具',
                        label:'灯具'
                    },{
                        value:'门窗',
                        label:'门窗'
                    },]
                },{
                    value:'军用',
                    label:'军用',
                    children:[{
                        value:'冷兵器',
                        label:'冷兵器'
                    },{
                        value:'枪支',
                        label:'枪支'
                    },{
                        value:'火炮',
                        label:'火炮'
                    },{
                        value:'装甲车',
                        label:'装甲车'
                    },{
                        value:'战斗机',
                        label:'战斗机'
                    },{
                        value:'军舰',
                        label:'军舰'
                    },{
                        value:'潜艇',
                        label:'潜艇'
                    },]
                },{
                    value:'电子',
                    label:'电子',
                    children:[{
                        value:'生活电器',
                        label:'生活电器'
                    },{
                        value:'手机设备',
                        label:'手机设备'
                    },{
                        value:'电脑设备',
                        label:'电脑设备'
                    },{
                        value:'摄像设备',
                        label:'摄像设备'
                    },]
                },{
                    value:'其他',
                    label:'其他',
                    children:[{
                        value:'雕塑',
                        label:'雕塑'
                    },{
                        value:'食品',
                        label:'食品'
                    },{
                        value:'餐具',
                        label:'餐具'
                    },{
                        value:'乐器',
                        label:'乐器'
                    },{
                        value:'服饰',
                        label:'服饰'
                    },{
                        value:'日用品',
                        label:'日用品'
                    },{
                        value:'珠宝首饰',
                        label:'珠宝首饰'
                    },{
                        value:'体育用品',
                        label:'体育用品'
                    },{
                        value:'工业机械',
                        label:'工业机械'
                    },{
                        value:'其他',
                        label:'其他'
                    },]
                }
            ],
        }
    },
    methods: {
        ...mapMutations(["changedialogUpload"]),
        quitUpload() {
            let self = this;
            this.Confirm('是否退出上传作品','提示',{
                confirmmessage:'退出成功',
                confirmCb() {
                    self.changedialogUpload();
                    self.uploadshow = true;
                }
            })
        },
        submitnext() {
             this.uploadshow = false;
            //  console.log(this.$refs.upload);
        },
        submitUpload() {
            let userid = this.$store.state.userid;
            if(!userid) {
                this.Message('请登录后上传模型','warning');
                return fasle;
            }else if(!this.fileInfo.title) {
                this.Message('请填写模型名称','warning');
                return fasle;
            }else if(!this.fileInfo.filetype) {
                this.Message('请选择模型类型','warning');
                return fasle;
            }
            this.fileInfo.userid = userid;
            this.$refs.upload.submit();
            this.loading = true;
            
            // console.log(this.$refs.upload);
        },
        handleChange(value) {
            // console.log(value);
            this.fileInfo.filetype = `${value[0]}-${value[1]}`;
        },
        uploadSuccess(response, file, fileList) {
            this.loading = false;
            this.Message('上传成功','success');
            this.uploadshow = true;
            this.changedialogUpload();
            // console.log(response);
            let id = response.data.id;
            this.$router.push(`/model/draft/${id}`)
        },
        uploadError(response, file, fileList) {
            this.loading = false;
            this.Message('上传失败','error');
        },
    }
}
</script>

<style lang="less" scoped>
    .dialogUpload{
        width: 100vh;
        height: 100vh;
    }
</style>



