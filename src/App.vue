<template>
  <v-app>
    <CoreDrawer />
    <CoreToolbar />
    <CoreView />
    <!-- <BottomNav /> -->
    <CoreFooter />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CoreDrawer from "@/components/common/Drawer.vue";
import CoreView from "@/components/common/View.vue";
import CoreToolbar from "@/components/common/Toolbar.vue";
import CoreFooter from "@/components/common/Footer.vue";
// import BottomNav from "@/components/common/BottomNav.vue";

export default Vue.extend({
  name: "App",
  components: {
    CoreDrawer,
    CoreView,
    CoreToolbar,
    CoreFooter
    // BottomNav
  }
});
</script>
