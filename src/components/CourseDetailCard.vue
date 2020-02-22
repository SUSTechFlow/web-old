<template>
    <Card class="detailCard" dis-hover>
        <Row class="cardTitle" type="flex" slot="title" align="middle">
            <Col span="4">
                <Icon type="ios-paper-outline"/>
                {{ detail.cid }}
            </Col>
            <Col span="16">{{detail.name}}</Col>
            <Col span="4">{{ detail.credit }}学分</Col>
        </Row>
        <div class="rateDisplay">
            <Row type="flex">
                <Col span="8">
                    <ve-radar-chart :data="radarData" :legend="radarLegend" :settings="radarSettings"
                                    :textStyle="radarTextStyle" :height="300"/>
                </Col>
                <Col span="16">
                    <ve-bar-chart :data="barData()" :height="300"></ve-bar-chart>
                </Col>
            </Row>
        </div>
        <Divider></Divider>
        <div class="cardContent">
            <div v-if="detail.detail || detail.detail.length<10">
                {{ split_detail(detail.detail) }}
            </div>
            <div v-else>
                目前暂无介绍。
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "CourseDetailCard",
        props: ['courseDetail', 'courseCommentsPromise', 'commentStatisticPromise'],
        methods: {
            split_detail(detail) {
                let cnIndex = detail.lastIndexOf('。');
                const engIndex = detail.lastIndexOf('.');
                if (cnIndex < engIndex)
                    return detail.slice(0, cnIndex + 1);
                else if (engIndex <= cnIndex)
                    return detail.slice(engIndex + 1, cnIndex + 1);
            },
            barData() {
                let dimensions = {name:'评分', data:[]};
                let measures = [{name:'喜爱', data:[]}, {name:'简单',data:[]}, {name:'有用', data:[]}];
                for (let i = 0; i <= 5; i += 0.5) {
                    dimensions.data.push(i.toString());
                    measures[0].data.push(this.commentStatistic['likes'][i*2]);
                    measures[1].data.push(this.commentStatistic['easy'][i*2]);
                    measures[2].data.push(this.commentStatistic['useful'][i*2]);
                }
                return {
                    dimensions: dimensions,
                    measures:measures
                }
            },
        },
        data() {
            return {
                radarLegend: {show: false},
                radarSettings: {
                    shape: 'circle',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}}
                },
                radarTextStyle: {fontSize: 16, color: 'black'},
            }
        },
        computed: {
            radarData() {
                return {
                    dimensions: [{name: '喜爱', max: 100}, {name: '简单', max: 100}, {name: '有用', max: 100},],
                    measures: [{name: '评分', data: [this.likes_percent, this.easy_percent, this.useful_percent]}]
                }
            },

            commentStatistic() {
                return this.commentStatisticPromise
            },
            detail() {
                return this.courseDetail.detail
            },
            ratings() {
                return this.courseDetail.ratings
            },
            likes_percent() {
                return (this.courseDetail.likes / this.ratings * 100).toFixed(0)
            },
            useful_percent() {
                return (this.courseDetail.useful / this.ratings * 100).toFixed(0)
            },
            easy_percent() {
                return (this.courseDetail.easy / this.ratings * 100).toFixed(0)
            },
            taughtBy() {
                return this.courseDetail.taughtBy
            }
        }
    }
</script>

<style scoped>
    .detailCard .cardTitle {
        font-size: 20px;
    }

    .detailCard .cardContent {
        font-size: 18px;
    }

</style>