<template>
    <div>
        <Table :loading="loading" size="large" stripe :columns="header" :data="learntCourseDetailSlice"
               @on-sort-change="sort">
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page show-total :total="end" :page-size="numEachPage" :current.sync="currentPage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
    import util from "@/libs/util";

    export default {
        name: "LearntCourseList",
        props:['learntCourseDetailPromise'],
        data() {
            return {
                loading: false,
                currentPage: 1,
                numEachPage: 10,
                header: [
                    {
                        title: '已修编号', key: 'cid', sortable: false, render:
                            (h, params) => {
                                return h('router-link', {
                                    props: {
                                        to: 'course/' + params.row.cid
                                    }
                                }, params.row.cid,)
                            }
                    },
                    {
                        title: '已修名称', key: 'name', sortable: false, render:
                            (h, params) => {
                                return h('router-link', {
                                    props: {
                                        to: 'course/' + params.row.cid
                                    }
                                }, params.row.name,)
                            }
                    },
                    {title: '学分', key: 'credit', sortable: 'custom',},
                    {title: '开课单位', key: 'openBy', sortable: false}
                ]
            }
        },

        methods: {
            sort(data) {
                const key = data.key;
                const order = data.order;
                this.loading = true;
                this.currentPage = 1;
                const compareFn = (a, b) => {
                    if (parseFloat(a[key]) > parseFloat(b[key])) return -1;
                    if (parseFloat(a[key]) < parseFloat(b[key])) return 1;
                    return 0;
                };
                let courseList = this.learntCourseDetail;
                if (order === 'desc')
                    courseList.sort(compareFn);
                else if (order === 'asc')
                    courseList.sort((a, b) => -compareFn(a, b));
                this.$store.commit('setCourseList', courseList);
                this.loading = false;
            },

        },
        computed: {
            learntCourseDetailSlice() {
                return this.learntCourseDetailPromise.slice((this.currentPage - 1) * this.numEachPage, this.currentPage * this.numEachPage)
            },
            end() {
                return this.learntCourseDetailPromise.length;
            },
        }
    }
</script>

<style scoped>

</style>