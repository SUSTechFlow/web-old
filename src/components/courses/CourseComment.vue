<template>
  <v-row justify="center" align="center">
    <v-col
      v-for="(item, i) in comments"
      :key="i"
      cols="12"
      xs="12"
      sm="8"
      md="6"
      lg="4"
      xl="3"
    >
      <comment :comment="item"></comment>
    </v-col>
  </v-row>
</template>
<script>
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import { mapGetters } from "vuex";
import { get } from "@/api/comment";
export default {
  components: {
    comment: CourseCommentCard
  },
  props: {
    cid: {
      type: String,
      required: true,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      learnt: "user/learnt"
    })
  },
  watch: {
    learnt() {
      this.fetch();
    }
  },
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      try {
        const res = await get(this.cid);
        this.comments = res.data;
      } catch (error) {
        alert(error);
      }
    }
  }
};
</script>
