<template>
    <div id="draft">
        <aside>
            <div class="person-oprate">
                <el-button v-moduleQuit="{userid:this.$store.state.userid}">退出</el-button>
                <el-button @click="saveModule">保存</el-button>
                <el-button @click="pubishModule">发布</el-button>
            </div>
            <div>
                <el-form :label-position="labelPosition" label-width="80px" :model="fileInfo" class="fileinfo">
                    <el-form-item label="标题">
                        <el-input v-model="fileInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item label="分类">
                        <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            v-model="selectedOptions"
                            @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="标签">
                        <div class="el-input">
                            <div :class="[{'getFocus':isFouce},'tag_box']">
                                <div class="tag" v-for='(tag,index) in taglist' :key="index">
                                    <span>{{tag}}</span>
                                    <span class="iconfont icon-cuowu" @click="deleteTag(index)"></span>
                                </div>
                                <input type="text" class="tagInput" v-model="tag" placeholder="输入标签,回车确认" @focus="getFocus" @blur="getBlur" @keydown.enter="addTag">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input
                            type="textarea"
                            :rows="3"
                            placeholder="简单的描述下你的作品,让你的作品更受欢迎哦!"
                            v-model="fileInfo.desc">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
          
      </aside>
    </div>
</template>
<script>
import store from '@/vuex/store'
import func from '@/public/func';
import api from '@/public/api';
export default {
    data () {
        return {
            isFouce:false,
            labelPosition:'top',
            selectedOptions:[],
            fileInfo:{
                title:'',
                filetype:'',
                tags:'',
                desc:'',
                userid:'',
                state:2
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
            taglist:[],
            tag:'',

        }
    },
    store,
    methods: {
        handleChange(value) {
            this.fileInfo.filetype = `${value[0]}-${value[1]}`;
        },
        saveModule() {
            if(this.taglist.length !== 0) {
                this.fileInfo.tags = JSON.stringify(this.taglist);
            }
            let id = this.$route.params.id,
                userid = this.$store.state.userid,
                title = this.fileInfo.title,
                filetype = this.fileInfo.filetype,
                tags = this.fileInfo.tags,
                desc = this.fileInfo.desc;
            func.ajaxPost(
                api.dealmodule,
                {
                    id:id,
                    title:title,
                    filetype:filetype,
                    tags:tags,
                    desc:desc,
                    state:0,
                },
                res => {
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message('保存成功','success')
                        }
                    }
                }
            )
        },
        pubishModule() {
            let id = this.$route.params.id,
                userid = this.$store.state.userid,
                title = this.fileInfo.title,
                filetype = this.fileInfo.filetype,
                tags = this.fileInfo.tags,
                desc = this.fileInfo.desc;
            func.ajaxPost(
                api.dealmodule,
                {
                    id:id,
                    title:title,
                    filetype:filetype,
                    tags:tags,
                    desc:desc,
                    state:1,
                },
                res => {
                    if(res.data.status === 200) {
                        if(res.data.data) {
                            this.Message('发布成功','success');
                            this.$router.push(`/mine/${userid}`)
                        }
                    }
                }
            )
        },
        getFocus() {
            this.isFouce = true;
        },
        getBlur () {
            this.isFouce = false;
        },
        addTag() {
            if(['','undefind','null'].includes(this.tag)) {
                this.Message('标签不合法','warning');
                return false;
            }else if(this.taglist.includes(this.tag)) {
                this.Message('标签已经存在','warning');
                return false;
            }
            this.taglist.push(this.tag);
            this.tag = '';
            console.log(this.taglist);
        },
        deleteTag(index) {
            this.taglist.splice(index,1);
            console.log(this.taglist)
        }
    },
    mounted () {
        let id = this.$route.params.id;
        if(!id) {
            this.$route.push('/404');
            return false;
        }
        func.ajaxPost(
            api.getmodule,
            {
                id:id,
                state:0,
                type:1
            },
            res => {
                console.log(res.data.data);
                this.$emit("modelInfo",{
                    modelsrc:res.data.data.modelsrc,
                    mimetype:res.data.data.mimetype
                })
                this.fileInfo.title = res.data.data.title;
                // this.fileInfo.filetype = res.data.data.filetype;
                this.selectedOptions = [res.data.data.filetype.split('-')[0],res.data.data.filetype.split('-')[1]];
                this.fileInfo.tags = res.data.data.tags;
                this.fileInfo.desc = res.data.data.desc;
                if(res.data.data.tags) {
                    this.taglist = JSON.parse(res.data.data.tags)
                }
            }
        )
    }
}
</script>

<style lang="less" scoped>
    aside{
        width: 375px;
        text-align: left;
        .person-oprate{
            height: 36px;
            font-size: 0;
            padding-left: 20px;
            padding-bottom: 10px;
            button{
                width: 72px;
                height: 34px;
                text-align: center;
                line-height: 36px;
                font-size: 15px;
                margin-right: 12px;
                border-radius: 5px;
                padding:0;
                color: #0078D7;
                border-color: #0078D7;
                &:hover{
                    background-color: #00b8d4;
                    color: #fff;
                }
            }
            .praise,.collect{
                border: 1px solid #00b8d4;
                background-color: #fff;
                color: #00b8d4;
                &:hover{
                    background-color: #00b8d4;
                    color: #fff;
                }
            }
            .down,.share{
                border: 1px solid rgb(133,133,133);
                background-color: rgb(133,133,133);;
                color: #fff;
            }

        }
        .el-form {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

</style>
<style lang="less">
    #draft {
        .el-input{
            .el-input__inner{
                width: 336px;
                height: 50px;
                text-align:left;
            }
        }
        .el-form-item{
            .el-form-item__label{
                line-height:20px;
            }
        }
        .tag{
            display: inline-block;
            line-height: 24px;
            padding: 5px 10px;
            font-size: 14px;
            background-color: #eee;
            border-radius: 5px;
            margin-right: 10px;        
        }
        .tagInput{
            width:200px;
            height: 30px;
            margin-top:10px;
            border:none;
            &:focus{
                border:none;
                outline:none;
            }
        }
        .getFocus{
            border-color:#409EFF!important;
        }
        .tag_box{
            -webkit-appearance: none;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #dcdfe6;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            color: #606266;
            display: inline-block;
            font-size: inherit;
            line-height: 40px;
            outline: 0;
            padding: 0 15px;
            width:100%;
        }
    }
    
</style>



