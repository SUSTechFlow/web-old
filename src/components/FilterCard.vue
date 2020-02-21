<template>
    <Card dis-hover>
        <p slot="title">
            <Icon type="ios-apps"></Icon>
            过滤器
        </p>
        <h3>搜索课程：</h3>
        <br>
        <AutoComplete search v-model="searchStr" :data="searchCandidate" @on-focus="handleSearch"
                      @on-change="handleSearch" @on-search="handleSearch"></AutoComplete>
        <Divider></Divider>
        <h3>专业筛选：</h3>
        <br>
        <Select @on-change="handleFacultyFilter" filterable multiple v-model="selectedFaculty">
            <Option v-for="faculty in this.$store.state.course.faculty" :label="faculty" :value="faculty" :key="faculty"></Option>
        </Select>
        <Divider></Divider>
        <h3>课程编号：</h3>
        <br>
        <CheckboxGroup size="default" v-model="cidLabels" @on-change="handleCidFilter">
            <Checkbox label="1XX" border></Checkbox>
            <Checkbox label="2XX" border></Checkbox>
            <Checkbox label="3XX" border></Checkbox>
            <Checkbox label="4XX" border></Checkbox>
            <Checkbox label="5XXX" border></Checkbox>
        </CheckboxGroup>
        <Divider></Divider>
        <h3>最低评分数：</h3>
        <p>只有评分人数不少于 {{requiredRatings}} 人的课程会被显示
            <Slider @on-input="handleRateFilter" v-model="requiredRatings"></Slider>
        </p>
        <Divider></Divider>
    </Card>
</template>

<script>
    export default {
        name: "FilterCard",
        data() {
            return {
                cidLabels: this.$store.state.course.cidLabels,
                requiredRatings: this.$store.state.course.requiredRatings,
                searchStr: this.$store.state.course.searchStr,
                searchCandidate: [],
                selectedFaculty:  this.$store.state.course.selectedFaculty
            }
        },
        methods: {
            handleCidFilter() {
                this.$store.commit('setCidLabels', this.cidLabels);
            },
            handleRateFilter() {
                this.$store.commit('setRequiredRatings', this.requiredRatings);
            },
            handleFacultyFilter() {
                this.$store.commit('setSelectedFaculty', this.selectedFaculty);
            },
            handleSearch() {
                this.$store.commit('setSearchStr', this.searchStr);
                this.searchCandidate = this.$store.getters.searchCandidate
            },
        },
    }
</script>

<style scoped>

</style>