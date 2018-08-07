<!-- search -->
<template>
  <div id="search" v-loading="loading">
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
        <div class="more" v-if="isAll">加载更多</div>
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
          loading:true,
          searchvalue:this.$route.params.value,
          lists:[],
          isAll:false,
          pagenum:1,
          pagesize:15
      }
  },
  mounted () {
        func.ajaxPost(
            api.modulelist, 
            {
                sortstate:4,
                searchname:this.searchvalue,
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
            }else{
                this.Message(resData.errmsg,error)
            }
        });
    
      
  },
  watch:{
      $route(to,from) {
          let oldValue = from.params.value;
          let newValue = to.params.value;
          if(oldValue !== newValue) {
              func.ajaxPost(
                api.modulelist, 
                {
                    sortstate:4,
                    searchname:newValue,
                    pagenum:this.pagenum,
                    pagesize:this.pagesize
                },
                res => {
                this.loading = false;
                let resData = res.data;
                if(resData.status == 200){
                    if(resData.data) {
                        console.log(resData);
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
                        this.Message(resData.errmsg,error)
                    }
                }else{
                    this.Message(resData.errmsg,error)
                }
            });
          }else{
              this.loading = false;
          }
      }
  }
}

</script>
<style lang="less" scoped>
    #search {
        width: 100%;
        margin: 0 auto;
        // height: 500px;
        margin-bottom: 2px;
        background-color: #f5f5f5;
       margin-top: 70px;
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
            }
        }
    }
</style>
<style>
    .el-submenu__title{
        padding-left: 0;
        padding-right: 105px;
        height: 58px;
        line-height: 58px;
    }
    .el-menu--popup-bottom-start{
        margin-top: 0;
    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup{
        min-width: 100px;
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
