<template>
  <Row type="flex">
    <Col span="18">
      <CourseList> </CourseList>
    </Col>
    <Col span="6">
      <FilterCard></FilterCard>
    </Col>
  </Row>
</template>

<script>
import CourseList from "@/components/CourseList";
import FilterCard from "@/components/FilterCard";

export default {
  name: "Course",
  components: {
    FilterCard: FilterCard,
    CourseList: CourseList
  }
};
</script>
