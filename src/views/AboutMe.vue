<template>
    <Markdown class="aboutmeBlock"></Markdown>
</template>

<script>
    import Markdown from "@/components/AboutMeMarkdown";
    export default {
        name: "AboutMe",
        components: {Markdown},
    }
</script>

<style scoped>
    .aboutmeBlock {
        margin-left: 30%;
    }
</style>