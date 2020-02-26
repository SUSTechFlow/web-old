// profile/index.ts
import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "../index";
import { signin, recover } from "@/api/user";
import { getLearnt } from "@/api/course";
import { addLearnt, delLearnt } from "@/api/course";
import { getToken, setToken } from "@/utils/auth";

interface User {
  username: string;
  token: string;
  learntCourses: Array<string>;
}

export interface UserState {
  user?: User;
  error: boolean;
}

const namespaced = true;

const getters: GetterTree<UserState, RootState> = {
  username(state: UserState): string {
    const { user } = state;
    return (user && user.username) || "";
  },
  token(state: UserState): string {
    const { user } = state;
    return (user && user.token) || "";
  },
  learnt(state: UserState): Array<string> {
    const { user } = state;
    return (user && user.learntCourses) || [];
  }
};

const state: UserState = {
  user: undefined,
  error: false
};

const mutations: MutationTree<UserState> = {
  login(state, user: User) {
    state.error = false;
    state.user = user;
    setToken(user.token);
  },
  setLearnt(state, cids: Array<string>) {
    if (state.user) {
      state.user.learntCourses = cids;
    }
  },
  addLearnt(state, cid: string) {
    if (state.user) {
      state.user.learntCourses.push(cid);
    }
  },
  delLearnt(state, cid: string) {
    if (state.user) {
      const arr = state.user.learntCourses;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === cid) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
  }
};

const actions: ActionTree<UserState, RootState> = {
  async recover({ commit, dispatch }) {
    const res = await recover();
    if (res.success) {
      const user: User = {
        username: res.username,
        token: getToken(),
        learntCourses: []
      };
      commit("login", user);
      dispatch("refreshLearnt");
    } else {
      throw new Error(res.msg);
    }
  },
  async login({ commit, dispatch }, { username, password }): Promise<void> {
    const res = await signin(username, password);
    if (res.success) {
      const user: User = {
        username: res.username,
        token: res.temp_token,
        learntCourses: []
      };
      commit("login", user);
      dispatch("refreshLearnt");
    } else {
      throw new Error(res.msg);
    }
  },
  async refreshLearnt({ commit }) {
    const res = await getLearnt();
    if (res.success) {
      commit("setLearnt", res.data);
    } else {
      throw new Error(res.msg);
    }
  },
  async addLearnt({ commit }, cid: string): Promise<void> {
    const res = await addLearnt(cid);
    if (res.data.success) {
      commit("addLearnt", cid);
    }
  },
  async delLearnt({ commit }, cid: string): Promise<void> {
    const res = await delLearnt(cid);
    if (res.data.success) {
      commit("delLearnt", cid);
    }
  }
};

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  mutations,
  actions
};
