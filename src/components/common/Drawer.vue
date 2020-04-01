<template>
  <v-navigation-drawer v-model="drawer" app temporary>
    <v-col xs="12" class="pl-3 pt-5 grey lighten-5 pb-2">
      <v-img
        src="https://cdn.wycer.cn/0f2a8a4f-b69d-4331-b236-bd30293a8724"
        lazy-src="https://cdn.wycer.cn/0f2a8a4f-b69d-4331-b236-bd30293a8724"
        width="10vh"
      >
        <v-row
          slot="placeholder"
          fill-height
          align="center"
          justify="center"
          ma-0
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </v-img>
      <p class="google-font mt-2" style="font-size:130%">
        SUSTech Flow
      </p>
    </v-col>
    <v-list shaped>
      <v-subheader>Links</v-subheader>
      <v-list-item-group color="primary">
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.to">
          <!-- <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon> -->

          <v-list-item-content>
            <v-list-item-title class="google-font"
              >{{ $t(link.text) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "CoreDrawer",
  computed: {
    ...mapGetters(["links"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      }
    }
  },
  methods: {
    ...mapMutations(["setDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to === "/") {
        this.$vuetify.goTo(0);
        this.setDrawer(false);
        return;
      }
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
      this.setDrawer(false);
    }
  }
};
</script>
