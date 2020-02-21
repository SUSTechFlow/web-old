import Vuex from 'vuex'
import Vue from 'vue'
import user from './user'
import course from './course';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules :{
        user:user,
        course:course,
    }
});
export default store