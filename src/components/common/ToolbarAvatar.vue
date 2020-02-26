<template lang="pug">
v-menu(offset-y  open-on-hover )
  template(v-slot:activator="{ on }")
    v-avatar(
      v-on="on"
      color="grey lighten-4"
      :size="44"
    )
      img(
        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
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
