<template>
    <AboutusMarkdown class="aboutmeBlock"></AboutusMarkdown>
</template>

<script>
    import AboutusMarkdown from "@/components/AboutMeMarkdown";
    export default {
        name: "AboutMe",
        components: {AboutusMarkdown},
    }
</script>

<style scoped>
    .aboutmeBlock {
        margin-left: 30%;
    }
</style>