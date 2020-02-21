<template>
    <div v-if="courseComments.length">
        <List border  item-layout="vertical">
            <ListItem v-for="comment in courseComments.slice((currentPage - 1) * commentEachPage, currentPage * commentEachPage)" :key="comment.id">
                <ListItemMeta v-if="comment.willing" :title="'一条来自于'+comment.year+'年的评论'"
                              :description="'由 '+comment.commentBy+' 评论，Ta在'+comment.term+'季学期学习了该课程，取得了'+comment.gpa+'的成绩'"/>
                <ListItemMeta v-if="!comment.willing" :title="'一条来自于'+comment.year+'年的评论'"
                              :description="'由 '+comment.commentBy+' 评论，Ta在'+comment.term+'季学期学习了该课程。'"/>
                {{ comment.content }}
                <template slot="extra">
                    喜爱：
                    <Rate show-text disabled allow-half v-model="comment.rate.likes"/>
                    <br/>
                    有用：
                    <Rate show-text disabled allow-half v-model="comment.rate.useful"/>
                    <br/>
                    简单：
                    <Rate show-text disabled allow-half v-model="comment.rate.easy"/>
                    <br/>
                </template>
            </ListItem>
        </List>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page show-total :total="courseComments.length" :page-size="commentEachPage"
                      :current.sync="currentPage" show-elevator></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['courseCommentsPromise'],
        name: "CommentList",
        data() {
            return {
                commentEachPage: 3,
                currentPage: 1,
            }
        },
        computed: {
            courseComments() {
                return this.courseCommentsPromise;
            }
        }
    }
</script>

<style scoped>

</style>