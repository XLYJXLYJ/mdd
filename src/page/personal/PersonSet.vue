<!-- 个人设置 -->
<template>
  <div id="person-set">
      <!-- 头像区域 -->
      <aside class="fl">
          <!-- <img :src="headimg" alt=""> -->
          <div class="large-headportrait">
              <div><img :src="headimg" alt="" onerror="javascript:this.src=window.errorImg"></div>
              <div class="upload-headportrait">
                  <span>更换头像</span>
                  <el-upload
                    class="upload-demo"
                    ref="uploadHead"
                    :action="uploadSrc"
                    :data = "fileInfo"
                    :show-file-list="false"
                    :on-preview="handlePictureCardPreview"
                    :on-change="changeFile"
                    :auto-upload="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadError">
                    <el-button size="small" type="primary" style="line-height:2px;">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
              </div>
              <div class="info-text">支持PNG,JPG,GIF,文件小于1M</div>
          </div>
          <div class="middle-headportrait">
              <div><img :src="headimg" alt="" onerror="javascript:this.src=window.errorImg"></div>
              <div class="info-text">120*120</div>
          </div>
          <div class="small-headportrait">
              <div><img :src="headimg" alt="" onerror="javascript:this.src=window.errorImg"></div>
              <div class="info-text">60*60</div>
          </div>
      </aside>
      <section class="fl">
          <div class="row clear">
              <label class="fl">昵称</label>
              <input type="text" :value="username" disabled="true">
          </div>
          <!-- <div class="row clear">
              <label class="fl">账号绑定</label>
              <div>绑定个人微信账号</div>
          </div> -->
          <div class="row clear">
              <label class="fl">一句话介绍</label>
              <span class="fr">请输入1-40个字符的介绍</span>
              <input type="text" v-model="aboutme">
          </div>
          <!-- <div class="row clear">
              <label class="fl">所在地区</label>
              <span class="fr">请输入1-40个字符的介绍</span>
              <select name="" id="">
                  <option value="">请选择地区</option>
              </select>
          </div> -->
          <div class="row clear">
              <label class="fl">擅长领域&技能</label>
              <!-- <div class="tag-inputbox">
                  <ul class="clear">
                      <li v-for="(tag,index) in tags" :key="index">
                          <span>{{tag}}</span>
                      </li>
                  </ul>
                  <input type="text" placeholder="输入标签,回车确认" @keydown.enter="addTag" v-model="tag">
              </div> -->
              <div class="el-input">
                    <div :class="[{'getFocus':isFouce},'tag_box']">
                        <div class="tag" v-for='(tag,index) in tags' :key="index">
                            <span>{{tag}}</span>
                            <span class="iconfont icon-cuowu" @click="deleteTag(index)"></span>
                        </div>
                        <input type="text" class="tagInput" v-model="tag" placeholder="输入标签,回车确认" @keydown.enter="addTag">
                    </div>
                </div>
          </div>
          <div class="row clear">
              <ul class="tag-list clear">
                  <li class="li-tag" v-for="(tag,index) in taglist" :key="index" @click="subAddTag(tag)">{{tag}}</li>
              </ul>
          </div>
          <!-- <div class="row clear">
              <div class="pay-qrcode-upload">
                  <div class="qrcode-title">
                      <label>微信打赏</label>
                      <span><img src="../../assets/img/workshow/logo.png" alt=""></span>
                  </div>
                  <div class="weixin-pay">
                      <div class="help-info">
                          <div class="help-info-icon"><img src="../../assets/img/workshow/logo.png" alt=""></div>
                          <div>
                              <div class="help-info-one">添加收款二维码</div>
                              <div class="help-info-two">如何上传</div>
                          </div>
                      </div>
                      <div class="upload-qrcode">
                          <div><img src="../../assets/img/workshow/logo.png" alt=""></div>
                          <p>上传图片</p>
                      </div>
                      <span class="upload-btn">更换图片: <button>选择文件</button></span>

                  </div>
              </div>

          </div> -->
          <div class="row clear">
              <button class="save-btn fl cur" @click="saveSet">保存</button>
          </div>
      </section>
  </div>
</template>

<script>
import store from '@/vuex/store'
import func from '@/public/func';
import api from '@/public/api';
export default {
  name:'PersonSet',
  data () {
      return {
          fileInfo:{
              userid:this.$store.state.userid,
              state:1
          },
          fileList:[],
          uploadSrc:api.userinfo,
          headimg:'',
          isFouce:'',
          tag:'',
          aboutme:'',
          tags:[],
          username:'',
          userid:'',
          taglist:["Q版手绘","硬建模","日系风格","美漫风格","韩系风格","中国风","写实风格","二次元","中世纪","武侠风格","蒸汽朋克","赛博朋克","室内设计","工业设计","舞美设计","游戏设计","3ds_Max","Cinema-4D","Maya","Modo","Mudbox","Photoshop","Softimage","Substance","Unity","Unreal","VRay","ZBrush"]
      }
  },
  store,
  methods: {
        addTag() {
            if(['','undefind','null'].includes(this.tag)) {
                this.Message('标签不合法','warning');
                return false;
            }else if(this.tags.includes(this.tag)) {
                this.Message('标签已经存在','warning');
                return false;
            }else if(this.tags.length >=10) {
                this.Message('最多可以添加10个标签','warning');
                return false;
            }
            this.tags.push(this.tag);
            this.tag = '';
        },
        deleteTag(index) {
            this.tags.splice(index,1);
        },
        subAddTag(tag) {
            console.log(tag);
            if(this.tags.includes(tag)) {
                this.Message('标签已经存在','warning');
                return false;
            }else if(this.tags.length >=10) {
                this.Message('最多可以添加10个标签','warning');
                return false;
            }
            this.tags.push(tag);

        },
        saveSet() {
            let userid = this.$store.state.userid;
            this.fileInfo.aboutme = this.aboutme;
            this.fileInfo.tags = this.tags;
            if(this.fileList.length === 0) {
                let userid = this.$store.state.userid;
                func.ajaxPost(
                    api.userinfo,
                    {
                        state:1,
                        userid:userid,
                        aboutme:this.aboutme,
                        tags:this.tags,
                        headportrait:true
                    },
                    res => {
                        if(res.data.status === 200) {
                            if(res.data.data) {
                                this.Message('保存成功','success')
                            }else{
                                this.Message('保存失败','warning')
                            }
                        }else{
                            this.Message(res.data.errmsg,'warning')
                        }
                    }
                )
            }else{         
                this.$refs.uploadHead.submit();
            }
            
        },
        handlePictureCardPreview(file) {
            console.log(file)
            this.headimg  = file.url;
        },
        changeFile(file, fileList) {
            if(fileList.length>1) {
                fileList = fileList.splice(0,1)
            }
            this.fileList = fileList;
            this.headimg = URL.createObjectURL(file.raw);
            // this.headimg = file.url
        },
        uploadSuccess(res, file) {
            this.Message('保存成功','success')
        },
        uploadError() {
            this.Message('保存失败','warning');
        }

        
  },
  mounted () {
        let userid = this.$store.state.userid;
        func.ajaxPost(
            api.userinfo,
            {
                getinfostate:1,
                userid:userid
            },
            res => {
                this.aboutme = res.data.data.aboutme;
                if(res.data.data.tags) {
                    this.tags = res.data.data.tags;
                }
                this.username = res.data.data.username;
                this.userid = res.data.data.userid;
                console.log(res.data.data);
                if(res.data.data.headportrait) {
                    this.headimg = res.data.data.headportrait
                }
            }
        )
  }
}
</script>

<style lang="less" scoped>
    #person-set{
        width: 1200px;
        margin: 0 auto;
        margin-top: 60px;
        aside{
            width: 200px;
            margin: 0 auto;
            margin-left: 184px;
            padding-top: 60px;
            .large-headportrait{
                img{
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                    border-radius:50%
                }
                .upload-headportrait{
                    span{
                        font-size:13px;
                        color:#616161;
                        line-height: 50px;
                    }
                    button{
                        width:86px;
                        height:24px; 
                        background:#fff;
                        border:1px solid #E0E0E0;
                        border-radius: 3px;
                        font-size: 12px;
                        color: #262626;
                    }
                }

            }
            .middle-headportrait{
                img{
                    width: 120px;
                    height: 120px;
                    margin: 0 auto;
                    border-radius:50%
                }
            }
            .small-headportrait{
                img{
                    width: 60px;
                    height: 60px;
                    margin: 0 auto;
                    border-radius:50%
                }
            }
            .info-text{
                font-size: 12px;
                color: #9E9E9E;
                line-height: 30px;
            }
        }
        section{
            width: 640px;
            margin: 0 auto;
            margin-left: 70px;
            padding-top: 60px;
            .row{
                color: #9E9E9E;
                margin-bottom: 18px;
                label,span{
                    font-size: 13px;
                    line-height: 30px;
                }
                input,select{
                    width: 640px;
                    height: 54px;
                    border:1px solid #eee;
                    border-radius: 6px;
                    padding: 5px 10px;
                    color: #9E9E9E;
                    box-sizing: border-box;
                }
                .tagInput{
                    width:200px;
                    height: 54px;
                    border:none;
                    &:focus{
                        border:none;
                        outline:none;
                    }
                }
                div{
                    clear: both;
                    text-align: left;
                }
                .tag-list{
                    width: 640px;
                    text-align: left;
                    .li-tag{
                        padding: 5px 16px;
                        border-radius: 3px;
                        font-size: 14px;
                        color: #616161;
                        background-color: #E0E0E0;
                        box-sizing: border-box;
                        margin-bottom: 10px;
                        margin-right: 16px;
                        display: inline-block;
                        cursor: pointer;
                    }
                }
                .pay-qrcode-upload{
                    color: #616161;
                    font-size: 14px;
                    .qrcode-title{
                        
                        span{
                            width: 10px;
                            height: 10px;
                            display: inline-block;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .weixin-pay{
                        .help-info{
                            .help-info-icon{
                                width: 34px;
                                height: 34px;
                                margin-right: 10px;
                                margin-bottom: 10px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            >div{
                                display: inline-block;
                                .help-info-two{
                                    color: #0078D7;
                                }
                            }
                            
                        }
                        .upload-qrcode{
                            width: 120px;
                            height: 95px;
                            padding-top: 25px;
                            border:1px dashed #eee;
                            display: inline-block;
                            div{
                                width: 60px;
                                height: 45px;
                                border: 1px solid #eee;
                                margin: 0 auto 12px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            
                            p{
                                text-align: center;
                            }
                        }
                        .upload-btn{
                            color: #000;
                            display: inline-block;
                            button{
                                width: 86px;
                                height: 24px;
                                border: 1px solid #eee;
                                background-color: #fff;
                                line-height: 24px;
                                text-align: center;
                                outline: none;
                            }
                        }
                    }
                }
                .save-btn{
                    width: 90px;
                    height: 34px;
                    text-align: center;
                    line-height: 34px;
                    background-color: #0078D7;
                    border: none;
                    border-radius: 3px;
                    color: #E0E0E0;
                    margin-left: 0;

                }
            }
        }
    }
</style>

<style lang="less" scoped>
    .tag{
        display: inline-block;
        line-height: 24px;
        padding: 0px 5px;
        font-size: 14px;
        background-color: #eee;
        border-radius: 5px;
        margin-right: 10px;
        height: 30px;    
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
    
    .getFocus{
        border-color:#409EFF!important;
    }
</style>



