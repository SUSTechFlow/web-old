<template>
  <v-bottom-navigation
    height="60px"
    class="white hidden-sm-and-up elevation-2"
    :active.sync="bottomNav"
    :value="true"
    app
    color="white"
  >
    <v-btn color="#518FF5" text value="Home" router to="/home">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn color="#518FF5" text value="events" router to="/events">
      <span>Events</span>
      <v-icon>mdi-rounded_corner</v-icon>
    </v-btn>

    <v-btn color="#518FF5" text value="team" router to="/team">
      <span>Team</span>
      <v-icon>mdi-group</v-icon>
    </v-btn>

    <v-btn color="#518FF5" text value="about" router to="/about">
      <span>About</span>
      <v-icon>mdi-toc</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      bottomNav: "recent",
      items: [
        { title: "Home", icon: "dashboard", route: "/home" },
        { title: "Attending", icon: "rounded_corner", route: "/attending" },
        { title: "Sessions", icon: "toc", route: "/sessions" },
        { title: "Speakers", icon: "group", route: "/speakers" }
      ]
    };
  }
};
</script>
