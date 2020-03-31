<template lang="pug">
v-container(grid-list-xl align="center")
  v-row(row wrap)
    v-hover(slot="offset")
      template(v-slot="{ hover }")
        v-avatar(:class="`elevation-${hover ? 12 : 6}`" class="mx-auto d-block transition-swing" size="130" )
          img(:src="avatar")
    v-card(width="90%" max-width="1024" class="mx-auto mt-10 v-card-profile")
      v-card-text.text-xs-center
        h6(class="category text-gray font-weight-light mb-3") CEO / CO-FOUNDER - Astroworld
        h4(class="card-title") Travis Scott
        p.card-description.font-weight-light {{ biograph }}
        v-btn(
          color="general"
          rounded
          class="font-weight-light"
        ) Follow
</template>
<script>
export default {
  data: () => ({
    avatar: "http://cdn.wycer.cn/0f2a8a4f-b69d-4331-b236-bd30293a8724",
    biograph: `You wrote that yourself? wow congrats dude, really, that's very
          cool. i just told everyone in my family about it, everybody thinks
          that's very impressive and asked me to congratulate you. they want
          to speak to you in person, if possible, to give you their regards.
          they also said they will tell our distant relatives in christmas
          supper and in NYE they will ignite fireworks that spell your name.
          i also told about this enormous deed to closer relatives, they had
          the same reaction. they asked for your address so they can send
          congratulatory cards and messages. my friends didn't believe me
          when i told them i knew the author of this gigantic feat, really,
          they were dumbstruck, they said they will make your name echo
          through years and years to come. when my neighbour found out about
          what you did, he was completely dumbstruck too, he wanted to know
          who you are and he asked (if you have the time, of course) if you
          could stop by to receive gifts, congratulations and handshakes.
          with the spreading of the news, a powerful businessman of the area
          decided to hire you as the CEO of his company because of this
          tremendous feat and at the same time an important international
          shareholder wants to sponsor you to give speeches and teach
          everybody how to do as you did so the world becomes a better
          place. you have become famous not only here but also everywhere,
          everybody knows who you are. the news spread really fast and
          mayors of all cities are setting up porticos, ballons, colossal
          boom speakers, anything that can make your name stand out more and
          see which city can congratulate you the hardest for this
          magnificent feat.`
  }),
  created() {
    // const uid = this.$route.params.uid;
    // console.log(uid);
    // this.fetchUser(uid);
  }
};
</script>
