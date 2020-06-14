<template>
  <v-app-bar app color="white" height="55px">
    <v-app-bar-nav-icon
      class="hidden-md-and-up"
      @click="toggleDrawer"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="ml-0 pl-1 mr-1">
      <router-link
        :to="{ name: 'home' }"
        class="google-font"
        style="text-decoration:none; color: rgba(0,0,0,.87);"
      >
        SUSTech Flow
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      v-for="(link, i) in links"
      :key="i"
      :to="link.to"
      class="ml-0 google-font hidden-sm-and-down"
      style="text-transform: capitalize;"
      text
      @click="onClick($event, link)"
    >
      {{ $t(link.text) }}
    </v-btn>
    <ToolbarAvatar v-if="!!token" />
    <v-btn
      v-else
      class="ml-0 google-font hidden-sm-and-down"
      style="text-transform: capitalize;"
      text
      to="/u/signin"
    >
      Sign In
    </v-btn>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";
import ToolbarAvatar from "@/components/common/ToolbarAvatar.vue";
export default {
  name: "CoreToolbar",
  components: {
    ToolbarAvatar
  },
  computed: {
    ...mapGetters({
      links: "links",
      token: "user/token"
    })
  },
  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    }
  },
  created() {
    this.$store.dispatch("user/recover");
  }
};
</script>
