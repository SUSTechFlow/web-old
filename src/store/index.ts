import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    links: [
      { text: "nav.home", to: "/", icon: "mdi-home" },
      { text: "nav.course", to: "/courses", icon: "mdi-puzzle" },
      // { text: "nav.group", to: "/g", icon: "mdi-account-group" },
      { text: "nav.about", to: "/about", icon: "mdi-feather" }
    ]
  },
  getters: {
    links: state => {
      return state.links;
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer)
  },
  actions: {},
  modules: {}
});
