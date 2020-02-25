<template lang="pug">
v-app
  v-app-bar(app)
    v-toolbar-title
      router-link.headline(to="/" ,style="text-decoration-line:none;color : black") SUSTech Flow
    div.flex-grow-1
    v-toolbar-items
      v-btn(text to="/p") {{ $t("toolbar.problem") }}
      v-btn(text to="/s") {{ $t("toolbar.status") }}
      v-btn(text to="/c") {{ $t("toolbar.contest") }}
      v-btn(text to="/d") {{ $t("toolbar.discussion") }}
    v-spacer
    div(v-if="!!nickname")
      v-avatar(
        color="grey lighten-4"
        :size="44"
      )
        img(
          :src="avatar"
          alt="avatar"
        )
      v-menu(offset-y)
        template(v-slot:activator="{ on }")
          v-btn(
            v-on="on"
            text
          ) {{ nickname }}
        v-list
          v-list-item(to="/profile")
            v-list-item-title {{ $t('toolbar.profile') }}
          v-divider
          v-list-item(@click="logout")
            v-list-item-title {{ $t('toolbar.logout') }}

    v-toolbar-items.hidden-sm-and-down(v-else)
      v-btn(
        text
        to="/u/signin"
      ) Sign in
      v-btn(
        text
        to="/u/signup"
      ) Sign up
  v-content
    transition(name="fade" mode="out-in")
      router-view
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      avatar: state => state.user.avatar,
      token: state => state.user.token,
      locales: state => state.i18n.locales
    })
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/u/signin?redirect=${this.$route.fullPath}`);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
