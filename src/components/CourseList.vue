<template>
  <div>
    <Table
      :loading="loading"
      height="1000px"
      size="large"
      stripe
      :columns="header"
      :data="courseList"
      @on-sort-change="sort"
    >
      <template slot-scope="{ index }" slot="learnt">
        <Checkbox
          type="primary"
          :value="courseList[index].learnt"
          @on-change="changeLearnt(index)"
        >
        </Checkbox>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          show-total
          :total="end"
          :page-size="numEachPage"
          :current.sync="currentPage"
          show-elevator
        ></Page>
      </div>
    </div>
  </div>
</template>

<script>
import util from "../libs/util";

export default {
  data() {
    return {
      loading: false,
      currentPage: 1,
      numEachPage: 15,
      header: [
        {
          title: "已修读",
          slot: "learnt",
          width: 100,
          align: "center"
        },
        {
          title: "课程编号",
          key: "cid",
          sortable: false,
          render: (h, params) => {
            return h(
              "router-link",
              {
                props: {
                  to: "course/" + params.row.cid
                }
              },
              params.row.cid
            );
          }
        },
        {
          title: "课程名称",
          key: "name",
          sortable: false,
          render: (h, params) => {
            return h(
              "router-link",
              {
                props: {
                  to: "course/" + params.row.cid
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "评分总数",
          key: "rate_number",
          align: "center",
          sortable: "custom",
          render: (h, params) => {
            return h("strong", {}, params.row.rate_number);
          }
        },
        {
          title: "喜爱",
          key: "likes_percent",
          align: "center",
          sortable: "custom",
          render: (h, params) => {
            return h("strong", {}, params.row.likes_percent + "%");
          }
        },
        {
          title: "有用",
          key: "useful_percent",
          align: "center",
          sortable: "custom",
          render: (h, params) => {
            return h("strong", {}, params.row.useful_percent + "%");
          }
        },
        {
          title: "简单",
          key: "easy_percent",
          align: "center",
          sortable: "custom",
          render: (h, params) => {
            return h("strong", {}, params.row.easy_percent + "%");
          }
        }
      ]
    };
  },
  name: "CourseList",
  methods: {
    sort(data) {
      const key = data.key;
      const order = data.order;
      const column = data.column;
      this.loading = true;
      this.currentPage = 1;
      const compareFn = (a, b) => {
        if (parseFloat(a[key]) > parseFloat(b[key])) return -1;
        if (parseFloat(a[key]) < parseFloat(b[key])) return 1;
        return 0;
      };
      let courseList = this.$store.state.course.courseList;
      if (order === "desc") courseList.sort(compareFn);
      else if (order === "asc") courseList.sort((a, b) => -compareFn(a, b));
      this.$store.commit("setCourseList", courseList);
      this.loading = false;
    },
    async changeLearnt(index) {
      const row = this.courseList[index];
      if (!row.learnt) {
        const res = await util.http.post("/learnt_course", { cid: row.cid });
        if (res.status !== 200) {
          this.$Message.error("HTTP请求失败");
        } else if (!res.data.success) {
          this.$Message.error(res.data.msg);
        } else {
          this.$Message.success(res.data.msg);
          row.learnt = !row.learnt;
        }
      } else {
        const res = await util.http.delete("/learnt_course", {
          params: { cid: row.cid }
        });
        if (res.status !== 200) {
          this.$Message.error("HTTP请求失败");
        } else if (!res.data.success) {
          this.$Message.error(res.data.msg);
        } else {
          this.$Message.success(res.data.msg);
          row.learnt = !row.learnt;
        }
      }
    },
    async getLearntCourseList() {
      let learntCourse = [];
      if (localStorage.temp_token) {
        const res = await util.http.get("/learnt_course");
        if (res.status !== 200) this.$Message.error("HTTP请求失败");
        else {
          const data = res.data;
          if (data.success) {
            learntCourse = data.data;
          } else {
            this.$Message.error(data.msg);
          }
        }
      }
      return learntCourse;
    },
    async getCourseList() {
      this.loading = true;
      const learntCourse = await this.getLearntCourseList();
      const courseResponse = await util.http.get("/rate");
      const faculty = [];
      if (courseResponse.status !== 200) {
        this.$Message.error("HTTP请求失败");
        return;
      }
      const courseData = courseResponse.data;
      if (courseData.success) {
        courseData.data.forEach(course => {
          course.learnt = learntCourse.includes(course.cid);
          course.rate_number = course.ratings / 5;
          if (course.ratings === 0)
            course.likes_percent = course.useful_percent = course.easy_percent = 0;
          else {
            course.likes_percent = (
              (course.likes / course.ratings) *
              100
            ).toFixed(0);
            course.useful_percent = (
              (course.useful / course.ratings) *
              100
            ).toFixed(0);
            course.easy_percent = (
              (course.easy / course.ratings) *
              100
            ).toFixed(0);
          }
          if (!faculty.includes(course.faculty)) faculty.push(course.faculty);
        });
        this.$store.commit("setCourseList", courseData.data);
        this.$store.commit("setFaculty", faculty);
        this.loading = false;
      } else {
        this.$Message.error(courseData.msg);
      }
    }
  },
  created() {
    this.getCourseList();
  },
  computed: {
    loggedUser() {
      return this.$store.state.user.loggedUser;
    },
    end() {
      return this.$store.getters.shownCourseList.length;
    },
    courseList() {
      return this.$store.getters.shownCourseList.slice(
        (this.currentPage - 1) * this.numEachPage,
        this.currentPage * this.numEachPage
      );
    }
  }
};
</script>

<style scoped>
.courseList {
  width: 100%;
}
</style>
