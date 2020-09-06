<template>
  <v-content class="pa-0">
    <v-container fluid class="my-4">
      <v-row align="center" justify="center" fill-height>
        <v-col xs="12" sm="7" md="8" lg="8" xl="8" class="">
          <p
            class="google-font mb-1"
            style="font-weight: 350;color: #616161;font-size:300%"
          >
            <b
              >Make good things
              <span style="color: #1a73e8;">together</span>.</b
            >
          </p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" fill-height>
        <v-col xs="12" sm="7" md="8" lg="8" xl="8" class="ma-5">
          <p
            class="google-font mb-1"
            style="font-weight: 350;color: #616161;font-size:120%"
          >
            <b>SUSTech Flow</b> commits to enhance study & life experience in
            <span style="color: #28AEAA;">SUSTech</span>.
          </p>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" fill-height>
        <v-col xs="12" sm="7" md="8" lg="8" xl="8" class="">
          <p
            class="google-font mb-1"
            style="font-weight: 350;color: #616161;font-size:120%"
          >
            Maintainers
          </p>
        </v-col>
      </v-row>
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col
          xs="12"
          md="6"
          lg="4"
          xl="3"
          v-for="(maintainer, i) in maintainers"
          :key="i"
        >
          <GitCard :name="maintainer" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import GitCard from '@/components/GitCard';
export default {
  metaInfo: () => ({
    title: 'About SUSTech Flow',
  }),
  components: {
    GitCard,
  },
  data() {
    return {
      maintainers: ['wycers', 'JohnWestonNull'],
    };
  },
};
</script>
