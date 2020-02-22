<template>
    <Card dis-hover>
        <Row slot="title">
            <Col span="8">
                <p>
                    <Icon type="ios-planet"/>
                    培养方案查询
                </p>
            </Col>
            年级
            <Select clearable v-model="grade" size="small" style="width: 100px">
                <Option v-for="item in gradeList" :value="item" :key="item">{{ item }}</Option>
            </Select>
            专业
            <Select clearable v-model="major" size="small" style="width: 100px">
                <Option v-for="item in majorList" :value="item" :key="item">{{ item }}</Option>
            </Select>
        </Row>
        <List border size="small">
            <ListItem v-for="plan in planDetail.slice(0, 4)" :value="plan" :key="plan.id">{{plan.major +' '+ plan.category}}</ListItem>
            <ListItem v-if="planDetail.length>5">...最多显示5项，请添加筛选条件。</ListItem>
            <ListItem v-if="planDetail.length===0">暂时缺少此课程的信息，但此课程由<strong>{{ courseDetail.detail.openBy }}</strong>提供。</ListItem>
        </List>
    </Card>
</template>

<script>
    export default {
        name: "PlanCard",
        props: ['planPromise', 'courseDetailPromise'],
        data() {
            return {
                grade: '',
                major: '',
            }
        },
        computed: {
            courseDetail() {
                return this.courseDetailPromise;
            },
            plan() {
                return this.planPromise;
            },
            gradeList() {
                let filteredPlan = this.plan.filter((plan) => plan.major === this.major || !this.major);
                return new Set(filteredPlan.map((plan) => plan.grade))
            },
            majorList() {
                let filterPlan = this.plan.filter((plan) => plan.grade === this.grade || !this.grade);
                return new Set(filterPlan.map((plan) => plan.major))
            },
            planDetail() {
                return this.plan.filter((plan) => {
                    return (plan.grade === this.grade || !this.grade) &&
                        (plan.major === this.major || !this.major)
                }).sort((a, b) => {
                    if (a.major > b.major)
                        return -1;
                    else if (a.major < b.major)
                        return 1;
                    else
                        return 0;
                });
            }
        }
    }
</script>

<style scoped>

</style>