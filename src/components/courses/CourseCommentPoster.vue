// https://vuetifyjs.com/zh-Hans/components/item-groups
<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    :fullscreen="mobile"
    :hide-overlay="mobile"
    :transition="mobile ? 'dialog-bottom-transition' : ''"
  >
    <template v-slot:activator="{ on }">
      <v-card-text style="height: 100px; position: relative">
        <v-fab-transition>
          <v-btn v-on="on" color="primary" dark absolute top right fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <!-- <v-btn v-if="!username" text disabled>login to comment</v-btn>
        <v-btn v-else color="primary" dark v-on="on">Open Dialog</v-btn> -->
        </v-fab-transition>
      </v-card-text>
    </template>
    <v-card class="my-4">
      <v-toolbar flat color="blue-grey" dark>
        <v-toolbar-title>Submit a comment</v-toolbar-title>
      </v-toolbar>

      <template v-slot:progress>
        <v-progress-linear
          absolute
          color="green lighten-3"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-text>
        <v-row justify="space-around" align="center">
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <!-- <v-text-field  label="Title" value="My new post"></v-text-field> -->
            <div>
              <span class="google-font text-uppercase">您的上课学期：</span>
            </div>
            <v-btn-toggle v-model="term" class="ma-3">
              <v-btn>
                <v-icon class="mr-1" color="green">fa-seedling</v-icon>
                春
              </v-btn>

              <v-btn>
                <v-icon class="mr-1" color="red darken-2"
                  >fa-umbrella-beach</v-icon
                >
                夏
              </v-btn>

              <v-btn>
                <v-icon class="mr-1" color="orange darken-2"
                  >fa-apple-alt</v-icon
                >
                秋
              </v-btn>

              <v-btn disabled>
                <v-icon class="mr-1" color="blue lighten-3"
                  >fa-snowflake</v-icon
                >
                冬
              </v-btn>
            </v-btn-toggle>
            <v-autocomplete
              v-model="teacher"
              :items="teachers"
              label="Teacher"
            ></v-autocomplete>
            <rating
              v-model="comment.rate.likes"
              label="Like"
              color="red"
            ></rating>
            <rating
              v-model="comment.rate.useful"
              label="Useful"
              color="blue"
            ></rating>
            <rating
              v-model="comment.rate.easy"
              label="Easy"
              color="green"
            ></rating>
            <v-row justify="center" align="center">
              <v-col cols="6">
                <v-select
                  v-model="score"
                  :items="scores"
                  label="Your score (X for secret)"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <v-switch
                  v-model="anonymous"
                  class="mt-0"
                  color="green lighten-2"
                  hide-details
                  label="Anonymous"
                ></v-switch
              ></v-col>
            </v-row>
            <v-textarea
              v-model="comment.content"
              placeholder="留下客官您友好的评论吧QwQ（虽然不留也行的啦"
              label="评论"
              value=""
              filled
            ></v-textarea>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="12" lg="12">
            <span class="title google-font">Preview</span>
            <comment class="my-1" :comment="comment"></comment>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn text @click="submit"> submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import CourseCommentRating from "@/components/courses/CourseCommentRating";
import { mapGetters } from "vuex";
import { post } from "@/api/comment";
export default {
  props: {
    cid: {
      type: String,
      required: true
    },
    teachers: {
      type: Array,
      default: () => []
    },
    method: {
      type: String,
      default: "考查"
    }
  },
  components: {
    comment: CourseCommentCard,
    rating: CourseCommentRating
  },
  data() {
    return {
      comment: {
        username: "",
        gpa: "X",
        content: "",
        commentBy: "佚名",
        term: "春",
        willing: false,
        anonymous: true,
        rate: {
          likes: 3,
          useful: 4.5,
          easy: 3
        },
        taught: ["程然"],
        helpful: 0
      },
      title: "The summer breeze",
      anonymous: true,
      term: undefined,
      score: "X",
      dialog: false,
      teacher: ""
    };
  },

  watch: {
    anonymous() {
      this.comment.commentBy = this.anonymous
        ? this.$t("anonymous")
        : this.username;
    },
    term() {
      this.comment.term = ["春", "夏", "秋", "冬"][this.term];
    },
    score() {
      if (this.score === "X") {
        (this.comment.willing = false), (this.comment.gpa = "X");
      } else {
        (this.comment.willing = true), (this.comment.gpa = this.score);
      }
    }
  },

  computed: {
    ...mapGetters({
      username: "user/username"
    }),
    scores() {
      return [
        "X",
        "A+",
        "A",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D",
        "D-",
        "P",
        "F"
      ];
    },
    mobile() {
      return (
        this.$vuetify.breakpoint.name === "xs" ||
        this.$vuetify.breakpoint.name === "sm"
      );
    }
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    async submit() {
      try {
        const res = await post(
          this.cid,
          this.comment.rate,
          this.comment.willing,
          this.score,
          this.anonymous,
          this.comment.content,
          this.comment.term,
          this.teacher
        );
        if (res.success) {
          await this.$store.dispatch("user/addLearnt", this.cid);
        }
      } catch (err) {
        // console.log(err);
      } finally {
        this.dialog = false;
      }
    }
  }
};
</script>
