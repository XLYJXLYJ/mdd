<!-- 作品展示 -->
<template>
  <div id="show-work">
      <!-- 视频播放 -->
      <section class="fl">
          <model :childModelInfo="modelInfo"></model>
      </section>
      <!-- 右侧边栏 -->
      <aside class="fr">
          <!-- 个人信息区域 -->
          <section>
              <!-- 个人信息 -->
              <div class="author-detail clear">
                  <router-link :to="{path:'/author/'+info.authid}">
                    <div class="author-headportrait fl"><img :src="info.headportrait" alt="" onerror="javascript:this.src=window.errorImg"></div>
                  </router-link>
                  <div class="author-middle fl">
                      <router-link :to="{path:'/author/'+info.authid}">
                        <div class="author-name">{{info.name}}</div>
                    </router-link>
                    <div v-if="this.$store.state.userid == info.authid">
                        <span>{{info.attentionme}}粉丝</span>
                    </div>
                    <div v-else>
                        <el-button type="primary" class="author-attention" v-if="info.isAttention" @click="quitAttention">已关注</el-button>
                        <el-button type="primary" class="author-attention" v-else @click="attention">关注</el-button>
                    </div>
                      
                  </div>
                  <div class="author-right fr" v-if="this.$store.state.userid == info.authid">
                        <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link img icon8"></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="delete">删除</el-dropdown-item>
                                <el-dropdown-item command="soldout">下架</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                  </div>
              </div>
              <hr>
              <!-- 个人操作 -->
              <div class="person-oprate">
                  <button :class="[{hasDone:info.isPraise},'praise']" @click="praise">
                      <span class="iconfont icon-dianzan"></span>
                      <span>{{info.praisetotal}}</span>
                  </button>
                  <button :class="[{hasDone:info.isCollect},'collect']" @click="collect">
                      <span class="iconfont icon-shoucang"></span>
                      <span v-if="info.isCollect">已收藏</span>
                      <span v-else>收藏</span>
                  </button>
                  <button class="down">
                      <span class="iconfont icon-xiazai"></span>
                      <a :href="info.modelsrc" download><span>下载</span></a>
                      
                  </button>
                  <button class="share">
                      <span class="iconfont icon-31fenxiang"></span>
                      <span>分享</span>
                  </button>
                  
              </div>
              <hr>
              <!-- 作品描述 -->
              <div class="work-describle">
                  <div class="work-name">{{info.title}}</div>
                  <div>{{info.publishtime}}发布</div>
                  <div class="work-introduce ellipsis">{{info.desc}}</div>
                  <div>
                      <span class="img icon7"></span>
                      <strong>作品版权归作者所有，他人不得以任何方式使用</strong>
                    </div>
                  <!-- <div>
                      <span class="img icon5"></span>
                      <span>4.84k <span>面点数</span></span>
                  </div>
                  <div>
                      <span class="img icon1"></span>
                      <span>4.84k <span>面点数</span></span>
                  </div> -->
                  <div>
                      <div class="inB">
                          <span class="img icon4"></span>
                          <span>{{fileTypeO}}</span>
                      </div>
                      <div class="inB">
                          <span class="img icon2"></span>
                          <span>{{fileTypeT}}</span>
                      </div>
                  </div>
                  <div>
                      <div class="work-num inB">
                          <span class="img icon9"></span>
                          <span>{{info.praisetotal}}</span>
                      </div>
                      <div class="work-num inB">
                          <span class="img icon10"></span>
                          <span>{{info.collecttotal}}</span>
                      </div>
                      <div class="work-num inB">
                          <span class="img icon3"></span>
                          <span>{{info.looktotal}}</span>
                      </div>
                  </div>
              </div>
              <hr>
              <!-- 打赏 -->
              <!-- <div class="give-reward">
                  <div>赏</div>
                  <p>点赞是鼓励,打赏是动力</p>
              </div> -->
          </section>
          <comment :commentinfo="commentinfo"></comment>
      </aside>
  </div>
</template>

<script>
import store from '@/vuex/store'
import func from '@/public/func';
import api from '@/public/api';
import comment from '@/components/comment/Index'
import model from '@/components/model/Model'
import {mapState,mapMutations} from 'vuex';
export default {
  name:'WorkShow',
  data () {
      return {
          info:{
          },
          modelInfo:{

          },
          fileTypeO:'',
          fileTypeT:'',
          isAuth:false,
            commentinfo:{
                id:'',
                authid:'',
            }
            
      }
  },
  store,
  components: {
      comment,model
  },
  methods:{
        ...mapMutations(["setResourceid","setResourcetitle","setResourceAuthid"]),
      handleCommand(command) {
          let id = this.info.id;
          let userid = this.$store.state.userid;
          let self = this;
          if(command === 'delete') {
              this.Confirm('是否确认确认删除?','提示',{
                  confirmmessage:'删除成功',
                  isShowMessage:false,
                  confirmCb() {
                        func.ajaxPost(
                            api.dealmodule,
                            {
                                "id":id,
                                "state":2,
                                "userid":userid
                            },
                            res => {
                                console.log(res.data);
                                if(res.data.status === 200) {
                                    if(res.data.data) {
                                        self.$router.push(`/mine/${userid}`);
                                        self.Message('删除成功','success');
                                    }
                                }
                            }
                        )
                  }
              })
          }else if(command === 'soldout') {
              this.Confirm('是否确认确认下架?','提示',{
                  confirmmessage:'下架成功',
                  isShowMessage:false,
                  confirmCb() {
                        func.ajaxPost(
                            api.dealmodule,
                            {
                                "id":id,
                                "state":4,
                                "userid":userid
                            },
                            res => {
                                console.log(res.data);
                                if(res.data.status === 200) {
                                    if(res.data.data) {
                                        self.$router.push(`/mine/${userid}`);
                                        self.Message('下架成功','success');
                                    }
                                }
                            }
                        )
                  }
              })
          }
      },
      attention() {
        let authid = this.info.authid;
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
                        this.info.isAttention = true;
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
        let authid = this.info.authid;
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
                        this.info.isAttention = false;
                    }else{
                        this.Message(res.data.errmsg,'warning')
                    }
                } else{
                    this.Message(res.data.errmsg,'warning')
                }
            }
        )
      },
      praise() {
          let [status,userid,id,state] = [this.info.isPraise,this.$store.state.userid,this.info.id];
          if(status) {
              state = 4;
          }else{
              state = 3;
          }
          func.ajaxPost(
            api.useropreate,
            {
                id,
                state,
                userid
            },
            res => {
                if(res.data.status === 200) {
                    if(res.data.data) {
                        if(state=== 3) {
                            this.Message('点赞成功','success');
                            this.info.isPraise = true;
                            this.info.praisetotal = parseInt(this.info.praisetotal) +1;
                        }else{
                            this.Message('取消点赞成功','success');
                            this.info.isPraise = false;
                            this.info.praisetotal = parseInt(this.info.praisetotal) -1;
                        }
                        
                    }else{
                        this.Message(res.data.errmsg,'warning')
                    }
                } else{
                    this.Message(res.data.errmsg,'warning')
                }
            }
        )
      },
      collect() {
          let [status,userid,id,state] = [this.info.isCollect,this.$store.state.userid,this.info.id];
          if(status) {
              state = 2;
          }else{
              state = 1;
          }
          func.ajaxPost(
            api.useropreate,
            {
                id,
                state,
                userid
            },
            res => {
                if(res.data.status === 200) {
                    if(res.data.data) {
                        if(state=== 1) {
                            this.Message('收藏成功','success');
                            this.info.isCollect = true;
                        }else{
                            this.Message('取消收藏成功','success');
                            this.info.isCollect = false;
                        }
                        
                    }else{
                        this.Message(res.data.errmsg,'warning')
                    }
                } else{
                    this.Message(res.data.errmsg,'warning')
                }
            }
        )
      },
  },
  mounted () {
    let id = this.$route.params.id;
    let userid;
    if(localStorage) {
        userid = localStorage.getItem("modelUserid")
    }else{
        userid = this.$store.state.userid;
    }
    if(!id) {
        this.$route.push('/404');
        return false;
    }
    func.ajaxPost(
        api.getmodule,
        {
            id:id,
            state:1,
            type:3,
            userid:userid
        },
        res => {
            this.modelInfo = {
                "modelsrc" : res.data.data.modelsrc,
                "mimetype" : res.data.data.mimetype,
            }
            this.info = res.data.data;
            this.info.filetype = this.info.filetype.split("-");
            this.fileTypeO = this.info.filetype[0];
            this.fileTypeT = this.info.filetype[1];
            this.commentinfo.id = this.info.id;
            this.commentinfo.authid = this.info.authid;
            this.setResourceid(this.info.id);
            this.setResourcetitle(this.info.title);
            this.setResourceAuthid(this.info.authid);
        }
    )
  }
}
</script>

<style lang="less" scoped>
    #show-work{
        width: 1200px;
        // height: 500px;
        margin: 0 auto;
        height: 500px;
        margin-top: 95px;
        margin-bottom: 2px;
        >section{
            width: 800px;
            video{
                width: 800px;
                height: 500px;
                background: bisque;
            }
        }
        >aside{
            width: 375px;
            .img{
                background:url(./../../assets/img/workshow/img.png)  no-repeat;
                display: inline-block;
                vertical-align: middle;
                padding-top: 4px;
                margin-right: 6px;
            }      
            section{
                width: 373px;
                background-color: #fff;
                border: 1px solid #eee;
            }
            .author-detail{
                height: 90px;
                .author-headportrait{
                    width: 50px;
                    height: 50px;
                    margin:20px;
                    img{
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                    }
                }
                .author-middle{
                    margin-top: 20px;
                    .author-name{
                        font-size: 18px;
                        line-height: 26px;
                        color:#616161
                    }
                    .author-attention{
                        width: 52px;
                        height: 24px;
                        text-align: center;
                        line-height: 24px;
                        background-color: #00b8d4;
                        color: #fff;
                        padding: 0;
                    }
                }
                .author-right{
                    position: relative;
                    margin-top: 27px;
                    margin-right: 21px;
                    .icon8{height:5px;width:19px;background-position:-103px 0;}
                }

            }
            .person-oprate{
                height: 76px;
                font-size: 0;
                padding-left: 20px;
                .iconfont{
                    font-size: 16px;
                }
                button{
                    width: 72px;
                    height: 34px;
                    text-align: center;
                    line-height: 32px;
                    font-size: 15px;
                    margin-right: 12px;
                    margin-top: 20px;
                    border-radius: 5px;
                    outline: none;
                    a{
                        color: #00b8d4
                    }
                }
                .praise,.collect,.down,.share{
                    border: 1px solid #00b8d4;
                    background-color: #fff;
                    color: #00b8d4;
                    &:hover{
                        background-color: #00b8d4;
                        color: #fff;
                        a{
                        color: #fff;
                            
                        }
                    }
                    &：focus{
                        border: 1px solid #fff;
                    }
                }
            }
            .work-describle{
                padding: 22px 20px;
                >div{
                    text-align: left;
                    line-height: 24px;
                    color: #444;
                    font-size: 13px;
                }
                .work-name{
                    font-size: 18px;
                }
                .work-introduce{
                    max-height: 90px;
                    text-overflow:ellipsis;
                    margin-bottom: 20px;
                }
                strong{
                    color: #F8B923;
                }
                .work-num{
                    margin-right: 10px;
                }
                .icon2{height:12px;width:7px;background-position:0 0;}
                .icon4{height:12px;width:12px;background-position:-7px 0;}
                .icon9{height:13px;width:13px;background-position:-19px 0;}
                .icon7{height:14px;width:14px;background-position:-32px 0;}
                .icon10{height:13px;width:14px;background-position:-46px 0;}
                .icon1{height:12px;width:14px;background-position:-60px 0;}
                .icon5{height:13px;width:14px;background-position:-74px 0;}
                .icon3{height:11px;width:15px;background-position:-88px 0;}
            }
            .give-reward{
                height: 95px;
                padding-top: 20px;
                div{
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #F5A623;
                    font-size: 20px;
                    color: #fff;
                    line-height: 50px;
                    text-align: center;
                    font-weight: bold;
                    margin: 0 auto;
                }
                p{
                    line-height: 30px;
                    font-size: 12px;
                    margin: 0 auto;
                }
            }
            

        }
    }
</style>


