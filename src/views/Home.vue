<template>
  <v-content class="pa-0">
    <v-container fluid class="my-4">
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col xs="12" md="10">
          <HomeStartScreen />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import HomeStartScreen from '@/components/Home';

export default {
  metaInfo: () => ({
    title: 'SUSTech Flow',
  }),
  components: {
    HomeStartScreen,
  },
};
</script>
