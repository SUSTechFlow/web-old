import VueRouter from 'vue-router'
import Login from "@/views/Login";
import Course from "@/views/Course";
import CourseDetail from "@/views/CourseDetail";
import Aboutme from "@/views/AboutMe";
import Vue from 'vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/aboutme',
        name: 'aboutme',
        component: Aboutme
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
