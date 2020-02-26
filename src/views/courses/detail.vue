<template lang="pug">
  <v-content class="pa-0">
    <v-container fluid class="my-4">
      <v-row wrap align="center" justify="center" row fill-height class="">
        <v-col xs="12" md="10">
          <CourseCard :cid="cid" :name="name" :credit="credit" :ename="ename" :description="description" :plan="plan"/>
          <Poster></Poster>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import CourseCard from "@/components/courses/CourseCard";
import CourseCommentPoster from "@/components/courses/CourseCommentPoster";
import { get } from "@/api/course";
export default {
  metaInfo() {
    return {
      title: this.title
    };
  },

  components: {
    CourseCard,
    Poster: CourseCommentPoster
  },

  data() {
    return { name: "", ename: "", credit: "0", description: "", plan: [] };
  },

  watch: {
    $route() {
      this.name = "";
      this.ename = "";
      this.credit = "0";
      this.description = "";
      this.plan = [];
      this.fetch();
    }
  },

  computed: {
    title() {
      return `${this.cid} | SUSTech Flow`;
    },
    cid() {
      return this.$route.params.cid;
    }
  },

  methods: {
    async fetch() {
      try {
        const res = await get(this.cid);
        this.name = res.data.name;
        this.ename = res.data.detail.english_name || "";
        this.credit = res.data.detail.credit;
        this.description = res.data.detail.detail;
        this.plan = res.data.plan;
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.fetch();
  }
};
</script>
