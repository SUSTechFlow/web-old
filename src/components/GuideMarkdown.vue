<template>
  <VueShowdown flavor="vanilla" :markdown="guide"> </VueShowdown>
</template>

<script>
import guide from "@/markdown/Guide.md";
export default {
  name: "GuideMarkdown",
  data() {
    return {
      guide: guide
    };
  }
};
</script>
