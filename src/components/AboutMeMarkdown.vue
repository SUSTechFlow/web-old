<template>
  <VueShowdown flavor="vanilla" :markdown="aboutus"> </VueShowdown>
</template>

<script>
import aboutus from "@/markdown/Aboutus.md";
export default {
  name: "AboutusMarkdown",
  data() {
    return {
      aboutus: aboutus
    };
  }
};
</script>
