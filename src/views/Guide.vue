<template>
    <GuideMarkdown class="guideBlock"></GuideMarkdown>
</template>

<script>
    import GuideMarkdown from "@/components/GuideMarkdown";
    export default {
        name: "Guide",
        components: {GuideMarkdown},
    }
</script>

<style scoped>
    .guideBlock {
        margin-left: 30%;
    }
</style>