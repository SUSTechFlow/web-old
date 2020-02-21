<template>
    <div>
        <Table :loading="loading" height="825" size="large" stripe :columns="header" :data="courseList"
               @on-sort-change="sort"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page show-total :total="end" :page-size="numEachPage" :current.sync="currentPage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import util from '../libs/util'

    export default {
        data() {
            return {
                loading: false,
                currentPage: 1,
                numEachPage: 13,
                header: [
                    {
                        title: '课程编号', key: 'cid', sortable:'custom',render:
                            (h, params) => {
                                return h('router-link', {
                                    props: {
                                        to: 'course/' + params.row.cid
                                    }
                                }, params.row.cid,)
                            }
                    },
                    {
                        title: '课程名称', key: 'name', sortable:'custom',render:
                            (h, params) => {
                                return h('router-link', {
                                    props: {
                                        to: 'course/' + params.row.cid
                                    }
                                }, params.row.name,)
                            }
                    },
                    {
                        title: '评分总数', key: 'rate_number', align: 'center', sortable:'custom',render:
                            (h, params) => {
                                return h('strong', {}, params.row.rate_number)
                            }
                    },
                    {
                        title: '喜爱', key: 'likes_percent', align: 'center', sortable:'custom',render:
                            (h, params) => {
                                return h('strong', {}, params.row.likes_percent + '%')
                            }
                    },
                    {
                        title: '有用', key: 'useful_percent', align: 'center', sortable:'custom',render:
                            (h, params) => {
                                return h('strong', {}, params.row.useful_percent + '%')
                            }

                    },
                    {
                        title: '简单', key: 'easy_percent', align: 'center', sortable:'custom',render:
                            (h, params) => {
                                return h('strong', {}, params.row.easy_percent + '%')
                            }
                    }
                ]
            }
        },
        name: "CourseList",
        methods: {
            sort(data) {
                const key = data.key;
                const order = data.order;
                const column = data.column;
                this.loading = true;
                this.currentPage = 1;
                const compareFn = (a, b) => {
                    if (parseInt(a[key]) > parseInt(b[key])) return -1;
                    if (parseInt(a[key]) < parseInt(b[key])) return 1;
                    return 0;
                };
                let courseList = this.$store.state.course.courseList;
                if (order === 'desc')
                    courseList.sort(compareFn);
                else if (order === 'asc')
                    courseList.sort((a, b) => -compareFn(a, b));
                this.$store.commit('setCourseList', courseList);
                this.loading = false;
            },
            async getCourseList() {
                this.loading = true;
                const response = await util.http.get('/rate');
                const faculty = [];
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败');
                    return;
                }
                const data = response.data;
                if (data.success) {
                    data.data.forEach(course => {
                        course.rate_number = course.ratings / 5;
                        if (course.ratings === 0)
                            course.likes_percent = course.useful_percent = course.easy_percent = 0;
                        else {
                            course.likes_percent = (course.likes / course.ratings * 100).toFixed(0);
                            course.useful_percent = (course.useful / course.ratings * 100).toFixed(0);
                            course.easy_percent = (course.easy / course.ratings * 100).toFixed(0);
                        }
                        if (!faculty.includes(course.faculty))
                            faculty.push(course.faculty);
                    });
                    this.$store.commit('setCourseList', data.data);
                    this.$store.commit('setFaculty', faculty);
                    this.loading = false;
                } else {
                    this.$Message.error(data.msg)
                }
            }
        },
        created() {
            this.getCourseList();
        },
        computed: {
            end() {
                return this.$store.getters.shownCourseList.length;
            },
            courseList() {
                return this.$store.getters.shownCourseList.slice((this.currentPage - 1) * this.numEachPage, this.currentPage * this.numEachPage)
            }
        }
    }
</script>

<style scoped>
    .courseList {
        width: 100%;

    }
</style>