<template lang="pug">
v-menu(offset-y  open-on-hover )
  template(v-slot:activator="{ on }")
    v-avatar(
      v-on="on"
      :size="44"
    )
      v-icon mdi-account-circle
  v-list
    v-list-item(to="/profile")
      v-list-item-title {{ $t('nav.profile') }}
    v-divider
    v-list-item(@click="logout")
      v-list-item-title {{ $t('nav.logout') }}
</template>
<script>
export default {
  name: "ToolbarAvatar",
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
    }
  }
};
</script>
