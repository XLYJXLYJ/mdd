import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    dialogLogin:false,
    dialogSignup:false,
    dialogForgetPassword:false,
    dialogUpload: false,
    isShowNews:false,
    isLogin:false,
    publicKey:'',
    username:'',
    userid:'',
    userheadportrait:'',
    // header导航栏状态
    headerStatus: 1,
    //搜索结果
    searchList: [],
    //用户提交的评论
    replyInfo: {
        resourceid: '',
        commentatorid: '',
        bycommentatorid: '',
        type:1,
        index:'',
        oindex:0,
        tindex:0,
        resourcetitle:'',
        authid:'',
    },
    //评论列表
    commentList:[]
}
const mutations = {
    changedialogLogin(state) {
        state.dialogLogin = !state.dialogLogin;
        state.dialogSignup = false;
        state.dialogForgetPassword = false
    },
    changedialogSignup(state) {
        state.dialogLogin = false,
        state.dialogSignup = !state.dialogSignup;
        state.dialogForgetPassword = false
    },
    changedialogForgetPassword(state) {
        state.dialogLogin = false,
        state.dialogSignup = false;
        state.dialogForgetPassword = !state.dialogForgetPassword
    },
    changedialogUpload(state) {
        state.dialogUpload = !state.dialogUpload
    },
    changeisShowNews(state) {
        state.isShowNews = !state.isShowNews
    },
    setPublicKey (state,key) {
        state.publicKey = key
    },
    setisLogin(state) {
        state.isLogin = !state.isLogin;
    },
    setusername (state,username) {
        state.username = username
    },
    setuserid(state, userid) {
      state.userid = userid
    },
    setuserheadportrait(state, userheadportrait) {
      state.userheadportrait = userheadportrait
    },
    setcommentContent(...arr) {

    },
    setReplyInfo(state, replyInfo) {
        state.replyInfo.bycommentatorid = replyInfo.bycommentatorid;
        state.replyInfo.type = replyInfo.type;
        state.replyInfo.index = replyInfo.index;
    },
    setResourceid(state, id) {
      state.replyInfo.resourceid = id;
    },
    setResourcetitle(state, title) {
      state.replyInfo.resourcetitle = title;
    },
    setResourceAuthid(state, authid) {
      state.replyInfo.authid = authid;
    },
    
    resetReplyInfo(state) {
        state.replyInfo.bycommentatorid = '';
        state.replyInfo.type = 1;
        state.replyInfo.index = 0;
        state.replyInfo.oindex = 0;
        state.replyInfo.tindex = 0;
    }

}

const getters = {
    // dialogLogin(state) {
    //     return !state
    // }
}

const actions = {
    // addAction(context) {
    //     context.commit('change');
    // }
}

const moduleA = {
    state, mutations, getters, actions
}

export default new Vuex.Store({
    state, mutations, getters,actions,
    // modules: {
    //     a:moduleA
    // }
})