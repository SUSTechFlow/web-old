<template>
    <div id="app">
        <Navbar class="navbar"></Navbar>
        <div class="content">
            <router-view></router-view>
        </div>
        <a style="position:fixed; top:auto; bottom: 0;" href="http://www.beian.miit.gov.cn">粤ICP备20009314号</a>
    </div>
</template>

<script>
    import Navbar from "./components/Navbar";

    export default {
        name: 'app',
        components: {Navbar},
        data() {
            return {}
        }
    }
</script>
<style>
    .navbar {
        top: 0;
        position: fixed;
        width: 100%;
    }
    .content {
        width: 100%;
        top: 64px;
        position: absolute;
    }
</style>