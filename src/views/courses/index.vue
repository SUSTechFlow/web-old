<template>
  <v-content class="pa-0">
    <v-container fluid class="my-4">
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col xs="12" md="10">
          <CourseList />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import CourseList from "@/components/courses/CourseList.vue";
export default {
  metaInfo: () => ({
    title: "SUSTech Flow"
  }),
  components: {
    CourseList
  }
};
</script>
