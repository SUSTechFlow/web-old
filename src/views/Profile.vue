<template>
    <div>
        <Row>
            <Col offset="4" span="12">
                <LearntCourseList v-bind:learntCourseDetailPromise="learntCourseDetail"></LearntCourseList>
            </Col>
            <Col offset="1" span="6">
                <CreditCard v-bind:learntCourseDetailPromise="learntCourseDetail"></CreditCard>
            </Col>
        </Row>
    </div>
</template>

<script>
    import LearntCourseList from "@/components/LearntCourseList";
    import CreditCard from "@/components/CreditCard";
    import util from "@/libs/util";

    export default {
        data() {
            return {
                learntCourseDetail: []
            }
        },
        name: "Profile",
        components: {CreditCard, LearntCourseList},
        created() {
            this.getLearntCourseDetail()
        },
        methods: {
            async getLearntCourseDetail() {
                const res = await util.http.get('/learnt_course_detail');
                if (res.status !== 200)
                    this.$Message.error('HTTP请求失败');
                else {
                    const data = res.data;
                    if (data.success) {
                        this.learntCourseDetail = data.data;
                        this.learntCourseDetail.forEach(course => {
                            course.credit = course.detail.credit;
                            course.openBy = course.detail.openBy;
                        });
                    } else {
                        this.$Message.error(data.msg)
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>