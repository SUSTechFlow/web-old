<template>
    <Menu class="navbar" mode="horizontal" theme="light" :active-name="activeItem">
        <MenuItem v-if="!this.loggedUser" to="/login" name="login">
            <Icon type="ios-people"/>
            登录
        </MenuItem>
        <Submenu v-else name="user">
            <template slot="title">
                <Icon type="ios-people"/>
                {{ loggedUser }}
            </template>
            <MenuItem name="profile" to="/profile">
                <Icon type="ios-person"/>
                个人页面
            </MenuItem>
            <MenuItem name="logout">
                <Icon type="ios-log-out"/>
                <Button type="default" to="/login" id="logout" name="logout" @click="logout()">登出</Button>
            </MenuItem>
        </Submenu>
        <MenuItem name="course" to="/course" >
            <Icon type="ios-calendar" />
            探索课程
        </MenuItem>
        <MenuItem name="guide" to="/guide" >
            <Icon type="md-build" />
            使用指南
        </MenuItem>
        <MenuItem name="aboutme" to="/aboutme" >
            <Icon type="logo-android" />
            关于开发者
        </MenuItem>
    </Menu>

</template>

<script>
    import {Menu, MenuItem} from "view-design";
    import util from '../libs/util'
    import {mapState} from 'vuex'

    export default {
        name: "Navbar",
        data(){
            return {
                activeItem:"course"
            }
        },
        components: {
            'Menu': Menu,
            'MenuItem': MenuItem
        },
        methods: {
            logout() {
                this.$store.commit('setLoggedUser', '');
                localStorage.removeItem('temp_token');
            },
            async getLoggedUser() {
                const res = await util.http.get('/user');
                if (res.data.username)
                    this.$store.commit('setLoggedUser', res.data.username);
                else
                    localStorage.removeItem('temp_token');
            }
        },
        created() {
            this.getLoggedUser();
        },
        computed: mapState({
            loggedUser: state => state.user.loggedUser
        }),
        watch:{
            '$route' (to){
                this.activeItem = to.name;
                if (to.name === 'courseDetail')
                    this.activeItem = 'course';
            }
        }
    }
</script>

<style scoped>
    #logout {
        position: relative;
        right: 0;
        left: 0;
    }
</style>