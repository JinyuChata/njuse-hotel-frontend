import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'

//permission还没弄懂
import '@/permission'

Vue.config.productionTip = false;
const options = {
    namespace: 'pro__',
    name: 'ls',
    storage: 'local'
};
Vue.use(Antd);
//是一个自定义组件叫title
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})
new Vue({
    router,//引入router
    store,//引vuex
    render: h => h(App)
}).$mount('#app');
//挂在到app,进行渲染
