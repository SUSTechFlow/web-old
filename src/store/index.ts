import Vue from 'vue';
import Vuex from 'vuex';
import { user } from './modules/user';

Vue.use(Vuex);

export interface RootState {
  drawer: boolean;
  links: Array<Record<string, string>>;
}

export default new Vuex.Store<RootState>({
  modules: {
    user,
  },
  state: {
    drawer: false,
    links: [
      { text: 'nav.home', to: '/', icon: 'mdi-home' },
      { text: 'nav.course', to: '/courses', icon: 'mdi-puzzle' },
      { text: 'nav.market', to: '/market', icon: 'mdi-account-group' },
      { text: 'nav.about', to: '/about', icon: 'mdi-feather' },
    ],
  },
  getters: {
    links: state => {
      return state.links;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {},
});
