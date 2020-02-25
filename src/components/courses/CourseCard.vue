<template>
  <v-skeleton-loader
    :loading="name === ''"
    transition="fade-transition"
    type="article"
    :boilerplate="boilerplate"
    :tile="tile"
    class="mx-auto"
  >
    <v-card class="mx-auto">
      <v-card-title>
        <h2 class="display-1 google-font">{{ cid }} - {{ displayName }}</h2>
        <v-spacer></v-spacer>
        <span class="title google-font">{{
          $tc("count.credit", credits)
        }}</span>
      </v-card-title>

      <v-card-text>
        <p class="body-1">
          {{ description }}
        </p>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <span class="subheading">Relevant Education Plan</span>
        <CoursePlan :plan="plan"></CoursePlan>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-text>
        <span class="subheading">Statistics</span>
        <CourseChart :cid="cid"></CourseChart>
        <CourseComment :cid="cid"></CourseComment>
      </v-card-text>
    </v-card>
  </v-skeleton-loader>
</template>
<script>
import CoursePlan from "@/components/courses/CoursePlan";
import CourseChart from "@/components/courses/CourseChart";
import CourseComment from "@/components/courses/CourseComment";
export default {
  components: {
    CoursePlan,
    CourseChart,
    CourseComment
  },
  props: {
    cid: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    credit: {
      type: String,
      required: true
    },
    ename: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false,
      default: ""
    },
    plan: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    displayName() {
      if (this.$i18n.locale === "en") {
        return this.ename || this.name;
      }
      return this.name;
    },
    credits() {
      return parseFloat(this.credit) || 0.0;
    }
  },

  data: () => ({
    selection: 2
  })
};
</script>
