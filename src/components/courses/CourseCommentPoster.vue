// https://vuetifyjs.com/zh-Hans/components/item-groups
<template>
  <v-card class="my-4">
    <v-toolbar flat color="blue-grey" dark>
      <v-toolbar-title>Submit a post</v-toolbar-title>
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
      <v-row justify="center" align="center">
        <v-col cols="12" xs="12" sm="12" md="4" lg="3">
          <span class="title google-font">Preview</span>
          <comment class="my-1" :comment="comment"></comment>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4" lg="3">
          <!-- <v-text-field filled label="Title" value="My new post"></v-text-field> -->

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
              <v-icon class="mr-1" color="orange darken-2">fa-apple-alt</v-icon>
              秋
            </v-btn>

            <v-btn disabled>
              <v-icon class="mr-1" color="blue lighten-3">fa-snowflake</v-icon>
              冬
            </v-btn>
          </v-btn-toggle>
          <v-textarea
            v-model="comment.content"
            placeholder="留下客官您友好的评论吧QwQ（虽然不留也行的啦"
            filled
            label="评论"
            value=""
          ></v-textarea>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="4" lg="3">
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
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-card-actions>
        <v-switch
          v-model="anonymous"
          class="mt-0"
          color="green lighten-2"
          hide-details
          label="Anonymous"
        ></v-switch>
        <v-spacer></v-spacer>
        <v-btn text>submit</v-btn>
      </v-card-actions>
    </v-card-actions>
  </v-card>
</template>
<script>
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import CourseCommentRating from "@/components/courses/CourseCommentRating";
import { mapGetters } from "vuex";
export default {
  components: {
    comment: CourseCommentCard,
    rating: CourseCommentRating
  },
  data() {
    return {
      comment: {
        username:
          "身体好轻，这样的体验从未有过，已经没有什么好害怕的了，因为！我不再是一个人了！",
        gpa: "B",
        cid: "CS203",
        content:
          "我给大家一个小建议，如果程然老师上课用中文建议可以选程然老师的课。习题课楼上说的对，沈老师的习题课非常的清楚明了，可以省下来很多时间。",
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
      term: undefined
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
    }
  },

  computed: {
    ...mapGetters({
      username: "user/username"
    })
  },
  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
