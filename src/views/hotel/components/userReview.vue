<template>
    <a-list
            class="comment-list"
            :header="`${data.length} replies`"
            item-layout="horizontal"
            :data-source="data"
    >
        <a-list-item slot="renderItem" slot-scope="item">
            <a-comment :author="item.author" :avatar="item.avatar">
                <template slot="actions">
                    <span>{{"评分： "+item.score}}</span>
                </template>
                <p slot="content">
                    {{ item.content }}
                </p>
                <a-tooltip slot="datetime" :title="item.datetime">
                    <span>{{ item.datetime}}</span>
                </a-tooltip>
            </a-comment>
        </a-list-item>
    </a-list>
</template>

<script>


    export default {
        name: "userReview",
        data() {
            return {
                data: [
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content:
                            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                        score: 4.5,
                        datetime: "2020.05.17",
                    },
                    {
                        author: 'Han Solo',
                        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                        content:
                            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                        score: 5.0,
                        datetime:"2020.05.18",
                    },
                ],

            };
        },
    }
</script>

<style scoped>

</style>