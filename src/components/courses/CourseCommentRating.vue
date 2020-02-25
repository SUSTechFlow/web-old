<template>
  <div>
    <div>
      <span class="google-font text-uppercase">{{ label }}</span>
      <span>
        {{ rating }}
      </span>
    </div>
    <v-rating
      v-model="rating"
      :color="color"
      background-color="grey darken-1"
      empty-icon="$ratingFull"
      half-increments
      hover
    ></v-rating>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number
    },
    label: {
      type: String,
      required: true,
      default: ""
    },
    color: {
      type: String,
      required: true,
      default: "primary"
    }
  },
  data() {
    return {
      rating: ""
    };
  },
  watch: {
    rating() {
      this.$emit("input", this.rating);
    }
  }
};
</script>
