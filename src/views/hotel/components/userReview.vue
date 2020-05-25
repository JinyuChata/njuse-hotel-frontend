<template>
   <div>
<!--       {{userComment}}-->
    <a-list
            class="comment-list"
            :header="`${data.length} replies`"
            item-layout="horizontal"
            :data-source="userComment"
    >
        <a-list-item slot="renderItem" slot-scope="item">
            <a-comment :author="item.author" :avatar="item.avatar">
                <template slot="actions">
                    <span>{{"评分： "+item.rate}}</span>
                </template>
                <p slot="content">
                    {{ item.commentDetail }}
                </p>
                <a-tooltip slot="datetime" :title="item.datetime">
                    <span>{{ item.datetime}}</span>
                </a-tooltip>
            </a-comment>
        </a-list-item>
    </a-list>
   </div>
</template>

<script>
    //     {"success":true,
    //     "message":null,
    //     "content":
    //     [{"id":1,
    //     "commentDetail":"fuck",
    //     "orderId":14,
    //     "rate":4.85},
    //     {"id":2,
    //     "commentDetail":"fuck",
    //     "orderId":15,
    //     "rate":4.85},
    //     {"id":3,
    //     "commentDetail":"fuck",
    //     "orderId":16,
    //     "rate":4.85}]}
//评分数据目前还不完全
    import {mapGetters} from "vuex";

    export default {
        name: "userReview",
        data() {
            return {
                data: {}
            };
        },
        computed: {
            ...mapGetters([
                'userComment',
            ])
        },
    }
</script>

<style scoped>

</style>