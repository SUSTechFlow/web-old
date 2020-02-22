<template>
    <Card dis-hover>
        <Row slot="title">
            <Col span="8">
                <p>
                    <Icon type="ios-apps"></Icon>
                    学分情况统计
                </p>
            </Col>
            <Col span="8">
                年份
                <Select v-model="grade" size="small" style="width: 100px">
                    <Option v-for="item in [2015,2016,2017,2018,2019]" :value="item" :key="item">{{ item }}</Option>
                </Select></Col>
            <Col span="8">
                专业
                <Select v-model="major" size="small" style="width: 100px">
                    <Option v-for="item in majorList" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </Col>
        </Row>
        <List border>
            <ListItem>总学分：{{ totalCredit }}</ListItem>
            <ListItem>通识通修：{{ commonCredit }}</ListItem>
            <ListItem>专业基础课：{{ basicCredit }}</ListItem>
            <ListItem>专业必修课：{{ compulsoryCredit }}</ListItem>
            <ListItem>专业选修课：{{ optionalCredit }}</ListItem>
            <ListItem>社科中心：{{ ssCredit }}</ListItem>
            <ListItem>人文中心：{{ humCredit }}</ListItem>
            <ListItem>艺术中心：{{ artCredit }}</ListItem>
        </List>
    </Card>
</template>

<script>
    import util from "@/libs/util";

    export default {
        name: "CreditCard",
        props: ['learntCourseDetailPromise'],
        data() {
            return {
                grade: 2017,
                major: '',
                majorList: [],
            }
        },
        methods: {
            async getMajorList() {
                if (localStorage.temp_token) {
                    const res = await util.http.get('/major');
                    if (res.status !== 200)
                        this.$Message.error('HTTP请求失败');
                    else {
                        const data = res.data;
                        if (data.success) {
                            this.majorList = data.data;
                        } else {
                            this.$Message.error(data.msg)
                        }
                    }
                }
            },
            creditCountDetail() {
                const creditCountDetail = JSON.parse(JSON.stringify(this.learntCourseDetail));
                creditCountDetail.forEach(c => {
                    c.plan = c.plan.filter(p => parseInt(p.grade) === this.grade).map(p => p.gradePlan);
                });
                return creditCountDetail
            },
            majorCreditCountDetail() {
                const creditCountDetail = JSON.parse(JSON.stringify(this.learntCourseDetail));
                creditCountDetail.forEach(c => {
                    c.plan = c.plan.filter(p => parseInt(p.grade) === this.grade).map(p => p.gradePlan).filter(p => p.major === this.major);
                });
                return creditCountDetail
            },
        },
        created() {
            this.getMajorList();
        },
        computed: {
            commonCredit() {
                return this.creditCountDetail().filter(p => p.plan.length > 0 && p.plan[0].category.includes('通识')).map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            basicCredit() {
                return this.majorCreditCountDetail().filter(p => p.plan.length > 0 && p.plan[0].category.includes('专业基础')).map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            compulsoryCredit() {
                return this.majorCreditCountDetail().filter(p => p.plan.length > 0 && (p.plan[0].category.includes('专业核心') || p.plan[0].category.includes('专业必修'))).map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            optionalCredit() {
                return this.majorCreditCountDetail().filter(p => p.plan.length > 0 && p.plan[0].category.includes('专业选修')).map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            ssCredit() {
                return this.learntCourseDetail.filter(d => d.openBy === '社科中心').map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            artCredit() {
                return this.learntCourseDetail.filter(d => d.openBy === '艺术中心').map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            humCredit() {
                return this.learntCourseDetail.filter(d => d.openBy === '人文中心').map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            },
            learntCourseDetail() {
                return this.learntCourseDetailPromise
            },
            totalCredit() {
                return this.learntCourseDetail.map(c => parseFloat(c.credit)).reduce((a, b) => a + b, 0)
            }
        }
    }
</script>

<style scoped>

</style>