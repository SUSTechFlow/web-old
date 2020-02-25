<template lang="pug">
v-card
  v-card-title
    | Courses
    v-spacer
    v-text-field(
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    )
  v-data-table.elevation-1(
    loading-text="Loading... Please wait"
    hide-default-footer=""
    item-key="cid"
    sort-by="learnt"
    :sort-desc="true"
    :headers="headers"
    :items="courses"
    :page.sync="page"
    :search="search"
    :items-per-page="itemsPerPage"
    :loading="loading"
    @page-count="pageCount=$event"
  )
    template(v-slot:header.likes="{ header }")
      v-icon(color="red") fa-heart
      span  {{ header.text }}
    template(v-slot:header.useful="{ header }")
      v-icon(color="blue") fa-tools
      span  {{ header.text }}
    template(v-slot:header.easy="{ header }")
      v-icon(color="green") fa-fish
      span  {{ header.text }}
    template(v-slot:item.name="{ item }")
      router-link(:to="`/courses/${item.cid}`") {{ item.name }}
    template(v-slot:item.learnt="{ item }")
      v-simple-checkbox(
        v-model="item.learnt"
        :ripple="false"
        color="primary"
      )
  div.text-center.pt-2
    v-pagination(
    :total-visible="7"
      v-model="page"
      :length="pageCount"
    )
</template>
<script>
import { get } from "@/api/rate";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      rawCourses: [],
      learntCourses: [],
      search: "",
      loading: false
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("course.learnt"),
          value: "learnt",
          align: "center",
          width: "100px"
        },
        { text: this.$t("course.cid"), value: "cid", width: "150px" },
        { text: this.$t("course.name"), value: "name", width: "380px" },
        {
          text: this.$t("course.ratings"),
          value: "ratings",
          align: "center",
          width: "200px"
        },
        {
          text: this.$t("course.likes"),
          value: "likes",
          align: "center",
          width: "100px"
        },
        {
          text: this.$t("course.usefuls"),
          value: "useful",
          align: "center",
          width: "100px"
        },
        {
          text: this.$t("course.esays"),
          value: "easy",
          align: "center",
          width: "100px"
        }
      ];
    },
    courses() {
      return this.rawCourses.map(course => ({
        ...course,
        learnt: this.learntCourses.indexOf(course.cid) > -1
      }));
    }
  },
  methods: {
    async fetch() {
      this.loading = true;
      try {
        const res = await get();
        this.rawCourses = res.data;
        console.log(this.courses);
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    },
    select(event) {
      console.log(event);
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="stylus">
table
  font-family: google-sans
tbody tr:nth-of-type(odd)
  background-color: rgba(0, 0, 0, .05)
tr th
  font-size: 18px !important;
td
  font-size: 16px !important;
a
  text-decoration: none;
</style>
