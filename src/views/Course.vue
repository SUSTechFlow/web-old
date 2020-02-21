<template>
    <Row type="flex">
        <Col offset="4" span="12">
            <CourseList>
            </CourseList>
        </Col>
        <Col offset="1" span="6">
            <FilterCard></FilterCard>
        </Col>
    </Row>
</template>

<script>
    import CourseList from "../components/CourseList";
    import FilterCard from "@/components/FilterCard";

    export default {
        name: "Course",
        components: {
            FilterCard: FilterCard,
            CourseList: CourseList
        },
    }
</script>

<style scoped>
</style>