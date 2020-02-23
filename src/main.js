import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Util from './libs/util'
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
import store from './store'
import infiniteScroll from 'vue-infinite-scroll'
import VeCharts from 've-charts'
import VueShowdown from 'vue-showdown'
Vue.use(VueShowdown);
Vue.use(VeCharts);
Vue.use(infiniteScroll);
Vue.use(ViewUI);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    ViewUI.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
