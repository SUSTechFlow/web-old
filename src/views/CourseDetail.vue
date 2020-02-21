<template>
    <div>
        <Row type="flex">
            <Col span="12" offset="4">
                <CourseDetailCard v-bind:courseDetail="courseDetail"
                                  v-bind:courseCommentsPromise="courseComments"
                                    v-bind:commentStatisticPromise="statistic"></CourseDetailCard>
                <CommentList v-bind:courseCommentsPromise="courseComments"></CommentList>
            </Col>

            <Col span="6" offset="1">
                <RateCard v-if="loggedUser" @updateStatistic="getCommentStatistics(cid)" @updateDetail="getCourseDetail(cid)"
                          @updateComments="getCourseComments(cid)"
                          v-bind:cid="cid" v-bind:courseDetail="courseDetail"></RateCard>
                <LoginCard disableJump="true" v-else></LoginCard>
                <PlanCard v-bind:courseDetailPromise="courseDetail" v-bind:planPromise="plan"></PlanCard>

            </Col>
        </Row>
    </div>
</template>

<script>
    import util from "@/libs/util";
    import CourseDetailCard from "@/components/CourseDetailCard";
    import RateCard from "@/components/RateCard";
    import LoginCard from "@/components/LoginCard";
    import CommentList from "@/components/CommentList";
    import PlanCard from "@/components/PlanCard";

    export default {
        name: "CourseDetail",
        components: {PlanCard, CommentList, LoginCard, RateCard, CourseDetailCard},
        data() {
            return {
                plan: [],
                courseDetail: {},
                courseComments: [],
                cid: this.$route.params.cid,
                statistic:{}
            }
        },
        methods: {
            async getCourseDetail(cid) {
                const response = await util.http.get('/course', {params: {cid: cid}});
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败');
                    return;
                }
                const data = response.data;
                if (data.success) {
                    this.courseDetail = data.data
                } else {
                    this.$Message.error(data.msg)
                }
            },
            async getCourseComments(cid) {
                const response = await util.http.get('/comment_list', {params: {cid: cid}});
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败');
                    return;
                }
                const data = response.data;
                if (data.success) {
                    this.courseComments = data.data
                } else {
                    this.$Message.error(data.msg)
                }
            },
            async getPlan(cid) {
                const response = await util.http.get('/plan', {params: {cid: cid}});
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败');
                    return;
                }
                const data = response.data;
                if (data.success) {
                    this.plan = data.data
                } else {
                    this.$Message.error(data.msg)
                }
            },
            async getCommentStatistics(cid) {
                const response = await util.http.get('/comment_statistic', {params: {cid: cid}});
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败');
                    return;
                }
                const data = response.data;
                if (data.success) {
                    this.statistic = data.data
                } else {
                    this.$Message.error(data.msg)
                }
            }
        },
        created() {
            this.getCourseDetail(this.$route.params.cid);
            this.getCourseComments(this.$route.params.cid);
            this.getPlan(this.$route.params.cid);
            this.getCommentStatistics(this.$route.params.cid);
        },
        computed: {
            loggedUser() {
                return this.$store.state.user.loggedUser;
            }
        }
    }
</script>

<style scoped>

</style>