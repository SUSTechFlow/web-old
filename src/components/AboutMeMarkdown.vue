<template>
    <VueShowdown flavor="vanilla" :markdown="aboutus">
    </VueShowdown>
</template>

<script>
    import aboutus from 'raw-loader!../../markdown/Aboutus.md'
    export default {
        name: 'Markdown',
        data() {
            return {
                aboutus:aboutus
            }
        },
    }
</script>
