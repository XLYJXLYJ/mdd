// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/vuex/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import $ from 'jquery'
import func from '@/public/func.js'
import api from '@/public/api.js'
Vue.config.productionTip = false
Vue.use(ElementUI)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    func,
    api,
    components: { App },
    template: '<App/>'
})

Vue.prototype.Message = function(txt, type) {
    this.$message({
        // showClose: true,
        message: txt,
        type: type
    });
}

Vue.prototype.Alert = function (message,title,options) {
    this.$alert(message,title,{
        confirmButtonText:options.text,
        lockScroll:false,
        modal: false,
        callback:action => {
            this.$message({
                type:options.type,
                message:options.message
            })
        }
    })
}

Vue.prototype.Confirm = function (message, title, options) {
  this.$confirm(message, title, {
    confirmButtonText: '确定',
    cancelButtonText:'取消',
    lockScroll: false,
    modal:false,
    type: 'warning',
  }).then(() => {
      options.confirmCb();
      if (options.isShowMessage) {
        this.$message({
          type: 'success',
          message: options.confirmmessage
        })
      } 
  }).catch((err) => {
    //   this.$message({
    //     type: 'info',
    //     message: options.cancelmessage
    //   })
    console.log(err);

  })
}

Vue.directive('moduleHover',{
    inserted:(el) => {
        $(el)
            .on("mouseover",() => {
                $(el).next('.moduleAuthor').show();
            })
            .on("mouseout",() => {
                $(el).next('.moduleAuthor').hide();
            })
    }
})

Vue.directive('moduleShow',{
    inserted: (el) => {
        $(el)
            .on("mouseover", () => {
                $(el).show();
            })
    }
})

Vue.directive('moduleQuit', {
    inserted: (el,binding) => {
        let userid = binding.value.userid;
        $(el)
            .on("click",() => {
                router.push(`/mine/${userid}`)
            })
    }
})

Vue.directive('reply', {
  inserted: (el, binding) => {
    let replyIndex = binding.value.replyIndex;
    let replyInfo = binding.value.replyInfo;
    $(el)
      .on("click", () => {
          store.state.replyInfo.oindex = replyIndex[0];
          store.state.replyInfo.tindex = replyIndex[1];
        binding.value.set(replyIndex, replyInfo, true)
      })
  }
})

Vue.directive('commnent', {
  inserted: (el, binding) => {
    $(el)
      .on("click", () => {
        console.log(store.state);
      })
  }
})

Vue.directive('imgerror', {
    inserted: (el) => {
        $(el).onerror = () => {
            console.log(1111)
            console.log($(el).src)
        }
    }
})

const img = {
    "errorImg": "data:image/jpeg;base64,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"
}
window.errorImg = img.errorImg;











