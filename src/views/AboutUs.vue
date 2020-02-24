<template>
    <AboutUsMarkdown class="aboutUsBlock"></AboutUsMarkdown>
</template>

<script>
    import AboutUsMarkdown from "@/components/AboutUsMarkdown";
    export default {
        name: "AboutUs",
        components: {AboutUsMarkdown},
    }
</script>

<style scoped>
    .aboutUsBlock {
        margin-left: 30%;
    }
</style>