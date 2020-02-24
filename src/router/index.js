import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Course from "@/views/Course";
import CourseDetail from "@/views/CourseDetail";
import Aboutme from "@/views/AboutMe";
import Profile from "@/views/Profile";
import Vue from 'vue'
import Guide from "@/views/Guide";

Vue.use(VueRouter);

const routes = [
    {
        path: '/guide',
        name: 'guide',
        component: Guide
    },
    {
        path: '/aboutme',
        name: 'aboutme',
        component: Aboutme
    },
    {
        path: '/profile',
        name:'profile',
        component:Profile
    },
    {
        path: '/course/:cid',
        name: 'courseDetail',
        component: CourseDetail
    },
    {
        path: '/course',
        name: 'course',
        component: Course
    },
    {
        path: '/',
        name: 'index',
        component: Course
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
];

const router = new VueRouter({
    routes
});

export default router
