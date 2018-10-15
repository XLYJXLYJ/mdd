<!-- 2D -->
<template>
  <div id="twoD" v-loading="loading">
    <div class="mainNav">
        <div class="subMainNavBox">
            <div class="mainNav-middle fl cur">
                <ul>
                    <li @click="recommendedTop" :class="[{defalutColor:active == 1}]">编辑推荐</li>
                    <li @click="trendingTop" :class="[{defalutColor:active == 2}]">正在流行</li>
                    <li @click="newTop" :class="[{defalutColor:active ==3}]">新鲜出炉</li>
                </ul>
            </div>
            <div class="mainNav-right fr">
                <div class="">
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                        <el-submenu index="1">
                            <template slot="title">全部分类</template>
                            <el-submenu v-for="(option,index) in options" :key="index" :index="option.label">
                                <template slot="title">{{option.value}}</template>
                                <el-menu-item v-for="(suboption,subindex) in option.children" :key="subindex" :index="`${option.label}-${suboption.label}`">{{suboption.value}}</el-menu-item>
                                
                            </el-submenu>
                        </el-submenu>
                    </el-menu>
                </div>
                <div>
                    <!-- <el-checkbox v-model="checked">可下载</el-checkbox>
                    <el-checkbox v-model="checked">带动画</el-checkbox> -->
                </div>
            </div>
        </div>
    </div>
    <div class="container clear">
        <el-row type="flex" class="row-bg" justify="space-between" ref="list">
            <router-link :to="{path:'/model/detail/'+list.id}" v-for='(list,index) in lists' :key="index">
                <el-col class="img_single">
                    <div class="grid-content">
                        <img :src="list.modelimg" alt="" onerror="javascript:this.src=window.errorImg">
                    </div>
                    <div class="bachover" v-moduleHover></div>
                    <div class="moduleAuthor" v-moduleShow>
                        <router-link :to="{path:'/author/'+list.userid}">
                            <div class="author_avatar fl">
                                <img :src="list.headPortraits" alt="" onerror="javascript:this.src=window.errorImg">
                            </div>
                            <div class="author_name fl">{{list.auth}}</div>
                        </router-link>
                    </div>
                </el-col>
            </router-link>
            <span style="display:inline;width:380px;height:0;border:none;"></span>
            <span style="display:inline;width:380px;height:0;border:none;"></span>
        </el-row>
        <div class="more" v-if="isAll" @click="loadMore">加载更多</div>
        <!-- <hr>
        <h1>{{setHeight}}</h1> -->
    </div>
  </div>
</template>

<script>
import func from '@/public/func';
import api from '@/public/api';
export default {
  name: 'Twod',
  data(){
      return {
          active:1,
          TwoDImg:[],
          activeIndex:'',
          checked:'',
          lists:[],
          isAll:false,
          loading:false,
          pagenum:1,
          pagesize:15,
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
  mounted () {
    func.ajaxPost(
        api.modulelist, 
        {
            state:1,
            type:1,
            pagenum:this.pagenum,
            pagesize:this.pagesize
        },
        res => {
            this.loading = false;
            let resData = res.data;
            if(resData.status == 200){
                
                if(resData.data) {
                    Array.from(resData.data,(value) => {
                        if(!value.modelimg) {
                            value.modelimg = "null"
                        }
                        if(!value.headPortraits) {
                            value.headPortraits = "null"
                        }
                        return value
                    })
                    this.lists = resData.data;
                    if(resData.data.length < this.pagesize) {
                        this.isAll = false;
                    }else{
                        this.pagenum += 1;
                    }
                }else if(resData.errmsg) {
                    this.Message(resData.errmsg,error)
                }
            }else{
                this.Message(resData.errmsg,error)
            }
    });
  },
  methods: {
      recommendedTop() {
          this.loading = false;
          this.pagenum = 1;
          this.active = 1;
          func.ajaxPost(
            api.modulelist, 
            {
                sortstate:1,
                type:1,
                pagenum:this.pagenum,
                pagesize:this.pagesize
            },
            res => {
                this.loading = false;
            let resData = res.data;
            if(resData.status == 200){
                if(resData.data) {
                    Array.from(resData.data,(value) => {
                        if(!value.modelimg) {
                            value.modelimg = "null"
                        }
                        if(!value.headPortraits) {
                            value.headPortraits = "null"
                        }
                        return value
                    })
                    this.lists = resData.data;
                    if(resData.data.length < 15) {
                        this.isAll = true;
                    }else{
                        this.isAll = false;
                    }
                }else if(resData.errmsg) {
                    this.Message(resData.errmsg,error)
                }
            }else if(resData.status == 500){
                this.Message(resData.errmsg,error)
            }
        });
      },
      trendingTop() {
          this.loading = false;
          this.pagenum = 1;
          this.active = 2;          
          func.ajaxPost(
            api.modulelist, 
            {
                sortstate:2,
                type:1,
                pagenum:this.pagenum,
                pagesize:this.pagesize
            },
            res => {
                this.loading = false;
            let resData = res.data;
            if(resData.status == 200){
                if(resData.data) {
                    Array.from(resData.data,(value) => {
                        if(!value.modelimg) {
                            value.modelimg = "null"
                        }
                        if(!value.headPortraits) {
                            value.headPortraits = "null"
                        }
                        return value
                    })
                    this.lists = resData.data;
                    if(resData.data.length < 15) {
                        this.isAll = false;
                    }else{
                        this.isAll = true;
                    }
                }else if(resData.errmsg) {
                    this.Message(resData.errmsg,error)
                }
            }else if(resData.status == 500){
                this.Message(resData.errmsg,error)
            }
        });
      },
      newTop() {
          this.loading = false;
          this.pagenum = 1;
          this.active = 3;          
          func.ajaxPost(
            api.modulelist, 
            {
                sortstate:3,
                type:1,
                pagenum:this.pagenum,
                pagesize:this.pagesize
            },
            res => {
                this.loading = false;
            let resData = res.data;
            if(resData.status == 200){
                if(resData.data) {
                    Array.from(resData.data,(value) => {
                        if(!value.modelimg) {
                            value.modelimg = "null"
                        }
                        if(!value.headPortraits) {
                            value.headPortraits = "null"
                        }
                        return value
                    })
                    this.lists = resData.data;
                    if(resData.data.length < 15) {
                        this.isAll = false;
                    }else{
                        this.isAll = true;
                    }
                }else if(resData.errmsg) {
                    this.Message(resData.errmsg,error)
                }
            }else if(resData.status == 500){
                this.Message(resData.errmsg,error)
            }
        });
      },
      loadMore() {
          this.loading = false;
          func.ajaxPost(
            api.modulelist, 
            {
                state:1,
                type:1,
            },
            res => {
                this.loading = false;
                let resData = res.data;
                if(resData.status == 200){
                    if(resData.data) {
                        Array.from(resData.data,(value) => {
                            if(!value.modelimg) {
                                value.modelimg = "null"
                            }
                            if(!value.headPortraits) {
                                value.headPortraits = "null"
                            }
                            return value
                        })
                        this.lists = [...resData.data];
                        if(resData.data.length < this.pagesize) {
                            this.isAll = false;
                        }else{
                            this.pagenum += 1;
                        }
                    }else if(resData.errmsg) {
                        this.Message(resData.errmsg,error)
                    }
                }else{
                    this.Message(resData.errmsg,error)
                }
            });
      },
      handleSelect(key, keyPath) {
          this.loading = false;
          this.lists = [];
        func.ajaxPost(
            api.modulelist, 
            {
                sortstate:5,
                filter:keyPath[1],
                type:1,
                pagenum:this.pagenum,
                pagesize:this.pagesize
            },
            res => {
                this.loading = false;
            let resData = res.data;
            if(resData.status == 200){
                if(resData.data) {
                    if(resData.data.msg) {
                        this.Message(resData.data.msg,'warning');
                        this.isAll = false;
                    }else{
                        Array.from(resData.data,(value) => {
                            if(!value.modelimg) {
                                value.modelimg = "null"
                            }
                            if(!value.headPortraits) {
                                value.headPortraits = "null"
                            }
                            return value
                        })
                        this.lists = resData.data;
                        if(resData.data.length < 15) {
                            this.isAll = false;
                        }else{
                            this.isAll = true;
                        }
                    }
                    
                }else if(resData.errmsg) {
                    this.Message(resData.errmsg,'error')
                }
            }else{
                this.Message(resData.errmsg,'error')
            }
        });
      }

  }
}

</script>
<style lang="less" scoped>
    #twoD {
        width: 100%;
        margin: 0 auto;
        // height: 500px;
        margin-bottom: 2px;
        background-color: #f5f5f5;
        .mainNav{
            width: 100%;
            height: 58px;
            background: #fff;
            margin-top: 70px;
            .subMainNavBox{
                // padding: 0 140px;
                width: 1200px;
                margin: 0 auto;
                .mainNav-left{
                    width: 260px;
                    height: 36px;
                    margin-top: 11px;
                    margin-left: 20px;
                    // .el-input__inner{
                    //     border-radius: 20px;
                    //     background: rgb(217,217,217);
                    // }
                }
                .mainNav-middle{
                    font-size: 18px;
                    color: #333333;
                    margin-left: 414px;
                    ul{
                        li{
                            height: 58px;
                            line-height: 58px;
                            float: left;
                            margin-left: 10px;
                            margin-right: 60px;
                            &:active{
                                color: #5BC4EA;
                            }
                        }
                    }
                }
                .mainNav-right{
                    .el-submenu__title{
                        padding: 0;
                        padding-right: 20px;
                    }
                    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
                        padding: 0;
                        margin: 0;
                        min-width: 100px!important;
                    }
                    // .el-menu--popup{
                    //     top: -5px;
                    //     margin: 0;
                    //     padding: 0;
                    //     min-width: 100px;
                    //     left: 16px;

                    // }
                    >div{
                        float: left;
                    }
                    ul{
                        border: none;
                    }
                    // li,>div,:hover{
                    //     height: 58px;
                    //     border: none;
                    // }
                    label{
                        height: 58px;
                        line-height: 58px;
                    }
                }
            }
        }
        .container{
            width: 1200px;
            margin: 0 auto;
            margin-top: 10px;
            @size:100%;
            box-sizing: border-box;
            .el-row--flex {
                flex-wrap:wrap;
                .img_single{
                    width: 387px;
                    height: 242px;
                    margin-top: 7px;
                    margin-bottom: 7px;
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
                        bottom: 0;
                        padding: 10px;
                        height: 50px;
                        position: absolute;
                        box-sizing: border-box;
                        display: none;
                        .author_avatar{
                            width: 30px;
                            height: 30px;
                            margin-right: 10px;
                            img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        .author_name{
                            color: #5BC4EA;
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
            .more{
                width: 100%;
                height: 32px;
                line-height: 32px;
                background:rgb(189,189,189);
                color: #fff;
                text-align: center;
                margin-bottom: 30px;
                margin-top: 20px;
                border-radius: 5px;
                clear: both;
                cursor: pointer;
            }
        }
    }
</style>
<style lang="less">
    #twoD .el-menu--horizontal>.el-submenu .el-submenu__title{
        padding-left: 0;
        padding-right: 105px;
        height: 58px;
        line-height: 58px;
    }
    #twoD .el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
        border-bottom:0;
    }
    .el-submenu.is-active .el-submenu__title{
        border-bottom-color:#fff;
    }
    .el-menu--popup-bottom-start{
        margin-top: 0;
    }
    .el-menu--horizontal .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
        min-width: 100px!important;
    }
    .el-menu--popup-right-start{
        margin-left: 0;
    }
    .el-submenu .el-menu-item{
        min-width: 100px;
    }
    /* .el-checkbox__inner :hover{
        height: 13px;
        border: #409EFF;
    } */
    .show{
        display: block!important;  
        transition: display 10s; 
    }
    
    
</style>
