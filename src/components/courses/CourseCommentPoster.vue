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

    <comment class="my-1" :comment="comment"></comment>
    <v-card-text>
      <v-text-field filled label="Title" value="My new post"></v-text-field>

      <v-textarea
        v-model="comment.content"
        filled
        label="Text"
        value=""
      ></v-textarea>
      <rating v-model="comment.rate.likes" label="Like" color="red"></rating>
      <rating
        v-model="comment.rate.useful"
        label="Useful"
        color="blue"
      ></rating>
      <rating v-model="comment.rate.easy" label="Easy" color="green"></rating>
      <v-divider class="my-2"></v-divider>

      <v-item-group multiple>
        <v-subheader>Tags</v-subheader>
        <v-item v-for="n in 8" :key="n" v-slot:default="{ active, toggle }">
          <v-chip
            active-class="purple--text"
            :input-value="active"
            @click="toggle"
          >
            Tag {{ n }}
          </v-chip>
        </v-item>
      </v-item-group>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-card-actions>
        <v-switch
          v-model="autoUpdate"
          :disabled="isUpdating"
          class="mt-0"
          color="green lighten-2"
          hide-details
          label="Anonymous"
        ></v-switch>
      </v-card-actions>
    </v-card-actions>
  </v-card>
</template>
<script>
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import CourseCommentRating from "@/components/courses/CourseCommentRating";
export default {
  components: {
    comment: CourseCommentCard,
    rating: CourseCommentRating
  },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };

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
          easy: 3,
          ratings: 5
        },
        taught: ["程然"],
        helpful: 0,
        year: 2020,
        month: 2,
        day: 24
      },
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      people: [
        { header: "Group 1" },
        { name: "Sandra Adams", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] },
        { divider: true },
        { header: "Group 2" },
        { name: "Britta Holt", group: "Group 2", avatar: srcs[4] },
        { name: "Jane Smith ", group: "Group 2", avatar: srcs[5] },
        { name: "John Smith", group: "Group 2", avatar: srcs[1] },
        { name: "Sandra Williams", group: "Group 2", avatar: srcs[3] }
      ],
      title: "The summer breeze"
    };
  },

  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
