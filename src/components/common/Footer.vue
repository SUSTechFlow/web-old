<template>
  <v-footer
    color="white"
    height="auto"
    class="hidden-sm-and-down"
    style="padding: 0 0 0 0"
  >
    <v-container
      fluid
      style="border-color:#e0e0e0;border-width: 1px;border-style: solid;border-bottom: 0"
    >
      <v-row align="center" justify="center" fill-height class="my-0 py-0">
        <v-col xs="12" md="10" sm="10" lg="10" class="py-0 my-0">
          <span class="google-font">
            Follow Us at
          </span>
          <v-btn text icon color="black" @click="navigateToGithub">
            <v-icon>mdi-github-circle</v-icon>
          </v-btn>
          <span>
            <a class="google-font" href="http://www.beian.miit.gov.cn">
              粤ICP备20009314号
            </a>
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      ChapterDetails: {},
      FooterData: {}
    };
  },
  methods: {
    navigateToGithub() {
      window.open("https://github.com/SUSTechFlow/web", "_blank");
    }
  }
};
</script>
