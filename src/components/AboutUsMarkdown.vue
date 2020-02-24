<template>
  <VueShowdown flavor="vanilla" :markdown="aboutUs"> </VueShowdown>
</template>

<script>
import aboutUs from "@/markdown/AboutUs.md";
export default {
  name: "AboutUsMarkdown",
  data() {
    return {
      aboutUs: aboutUs
    };
  }
};
</script>
