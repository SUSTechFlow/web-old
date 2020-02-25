<template>
  <v-card max-width="344" class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">Our Changing </v-list-item-title>
        <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text class="body-1 black--text">
      {{ comment.content }}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ comment.commentBy }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <v-icon small class="mr-1" color="red">fa-heart</v-icon>
          <span class="subheading mr-2">{{ comment.rate.likes }}</span>
          <span class="mr-1"> · </span>
          <v-icon small class="mr-1" color="blue">fa-tools</v-icon>
          <span class="subheading">{{ comment.rate.useful }}</span>
          <span class="mr-1"> · </span>
          <v-icon small class="mr-1" color="green">fa-fish</v-icon>
          <span class="subheading">{{ comment.rate.easy }}</span>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  computed: {
    description() {
      if (this.comment.willing) {
        return `Ta在 ${this.comment.term} 季学期学习了该课程，取得了 ${this.comment.gpa} 的成绩。`;
      }
      return `Ta在 ${this.comment.term} 季学期学习了该课程`;
    }
  }
};
</script>
