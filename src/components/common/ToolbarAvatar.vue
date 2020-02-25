<template lang="pug">
v-menu(offset-y  open-on-hover )
  template(v-slot:activator="{ on }")
    v-avatar(
      v-on="on"
      color="grey lighten-4"
      :size="44"
    )
      img(
        src="http://cdn.wycer.cn/0f2a8a4f-b69d-4331-b236-bd30293a8724"
        alt="avatar"
      )
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
      console.log("logout");
    }
  }
};
</script>
