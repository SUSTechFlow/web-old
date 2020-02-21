<template>
    <Card dis-hover>
        <Row slot="title" align="middle">
            <Col span="4">
                <p>
                    <Icon type="ios-star-half"/>
                    评分
                </p>
            </Col>
            <Col span="4" offset="12" size="small">
                <i-switch v-model="comment.anonymous">
                    <span slot="open">匿</span>
                    <span slot="close">公</span>
                </i-switch>
            </Col>
            <Col span="4">
                <Button size="small" type="primary" @click="putRate()">提交</Button>
            </Col>
        </Row>
        <div>
            您的上课学期？：
            <RadioGroup v-model="comment.term" type="button">
                <Radio style="color:forestgreen" label="春"></Radio>
                <Radio style="color:red" label="夏"></Radio>
                <Radio style="color:orange" label="秋"></Radio>
                <Radio disabled style="color:white" label="冬"></Radio>

            </RadioGroup>
            <br/>
            您有多喜爱这门课：
            <Rate allow-half clearable v-model="comment.rate.likes"/> {{ comment.rate.likes }} 星
            <br/>
            这门课的有用程度：
            <Rate allow-half clearable v-model="comment.rate.useful"/> {{ comment.rate.useful }} 星
            <br/>
            这门课有多简单？：
            <Rate allow-half clearable v-model="comment.rate.easy"/> {{ comment.rate.easy }} 星
            <br/>
            <span v-if="(courseDetail.detail.test_method==='考试'||courseDetail.detail.test_method==='考查')">
            您愿意透露您在这门课的成绩吗？
            <i-switch v-model="comment.willing">
                <span slot="open">是</span>
                <span slot="close">否</span>
            </i-switch>
            <Select v-if="comment.willing" v-model="comment.gpa" style="width:50px">
                <Option v-if="courseDetail.detail.test_method==='考试'" v-for="item in gpaStep" :value="item" :key="item">{{ item }}</Option>
                <Option v-if="courseDetail.detail.test_method==='考查'" v-for="item in PFStep" :value="item" :key="item">{{ item }}</Option>
            </Select>
            </span>
            <br/>
            您的上课老师是？：
            <br/>
            <Select v-model="comment.taught">
                <Option v-for="teacher in taughtBy" :value="teacher.join(',')" :key="teacher.id">{{
                    teacher.join(',') }}
                </Option>
                <Option :value="'其他'">其他（欢迎提供我们缺失的信息）</Option>
            </Select>
        </div>
        <Divider></Divider>
        <Input v-model="comment.content" maxlength="1000" show-word-limit type="textarea" placeholder="写一段评论吧！(非必须)"/>
    </Card>
</template>

<script>
    import util from "@/libs/util";

    export default {
        name: "RateCard",
        props: ['cid', 'courseDetail'],
        data() {
            return {
                gpaStep :['A+', 'A', 'A-','B+', 'B', 'B-','C+', 'C', 'C-','D+', 'D', 'D-','F'],
                PFStep:['P','F'],
                comment: {
                    willing:false,
                    gpa: 'P',
                    cid: this.cid,
                    anonymous: true,
                    taught: '其他',
                    commentBy: this.loggedUser,
                    content: '',
                    rate: {
                        likes: 0,
                        useful: 0,
                        easy: 0,
                    },
                    term: '春'
                }
            }
        },
        methods: {
            async putRate() {
                if (!this.loggedUser) {
                    this.$Message.error('你必须先登录！');
                    return;
                }
                this.comment.cid = this.cid;
                this.comment.commentBy = this.loggedUser;
                const response = await util.http.put('/comment', this.comment);
                if (response.status !== 200) {
                    this.$Message.error('HTTP请求失败。');
                    return;
                }
                const data = response.data;
                this.$Message.success(data.msg);
                this.$emit('updateDetail');
                this.$emit('updateComments');
                this.$emit('updateStatistic')
            }
        },
        async created() {
            const res = await util.http.get('/comment', {
                params: {
                    cid: this.cid,
                    commentBy: this.loggedUser
                }
            });
            if (res.status !== 200) {
                this.$Message.error('HTTP请求失败');
                return
            }
            const data = res.data;
            if (data.success && data.data) {
                this.comment = data.data;
                this.comment.taught = data.data.taught.join(',');
            } else if (data.msg)
                this.$Message.error(data.msg)
        },
        computed: {
            taughtBy() {
                return this.courseDetail.taughtBy
            },
            loggedUser() {
                return this.$store.state.user.loggedUser;
            }
        }
    }
</script>

<style scoped>

</style>