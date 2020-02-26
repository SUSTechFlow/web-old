// profile/index.ts
import { Module, GetterTree, ActionTree, MutationTree } from "vuex";
import { RootState } from "../index";
import { signin } from "@/api/user";

interface User {
  username: string;
  token: string;
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
  }
};

const actions: ActionTree<UserState, RootState> = {
  // fetchData({ commit }): any {
  //   axios({
  //     url: "https://...."
  //   }).then(
  //     response => {
  //       const payload: User = response && response.data;
  //       commit("profileLoaded", payload);
  //     },
  //     error => {
  //       console.log(error);
  //       commit("profileError");
  //     }
  //   );
  // }
  async login({ commit }, { username, password }): Promise<void> {
    const res = await signin(username, password);
    if (res.success) {
      const user: User = {
        username: res.username,
        token: res.temp_token
      };
      commit("login", user);
    } else {
      throw new Error(res.msg);
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
