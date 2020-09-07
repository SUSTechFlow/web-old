<template>
  <v-sheet :color="`grey lighten-4`" class="px-3 pt-3 pb-3">
    <v-skeleton-loader
      class="mx-auto"
      max-width="300"
      type="card"
      transition="fade-transition"
      :loading="!profile"
    >
      <div>
        <v-card v-if="profile">
          <v-img
            class="white--text align-end"
            height="300px"
            :src="profile.avatar_url"
          >
            <v-card-title class="headline white--text">{{
              profile.bio
            }}</v-card-title>
          </v-img>
          <v-card-text>
            <span class="body-1 mr-4">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              {{ profile.name }}
            </span>
            <span class="body-1 mr-4">
              <i class="fa fa-location-arrow" aria-hidden="true"></i>
              {{ profile.location }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-chip>
              <i class="fa fa-users" aria-hidden="true">
                Followers: {{ profile.followers }}
              </i>
            </v-chip>
            <!-- <v-chip>
              <i class="fa fa-list" aria-hidden="true">
                Repos: {{ profile.public_repos }}
              </i>
            </v-chip> -->
            <v-spacer></v-spacer>
            <v-btn text @click="snackbar = !snackbar" color="primary"
              >点赞</v-btn
            >
            <v-btn text :href="href" target="_blank" color="primary"
              >跳转</v-btn
            >
          </v-card-actions>
        </v-card>
      </div>
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      profile: null,
      href: `https://github.com/${this.name}`,
      repos: [],
    };
  },
  computed: {
    content() {
      return this.$site.themeConfig;
    },
  },
  created() {
    this.$nextTick(() => {
      this.getInfo();
    });
  },
  methods: {
    async getInfo() {
      const res = await axios.get(`https://api.github.com/users/${this.name}`);
      this.profile = res.data;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
