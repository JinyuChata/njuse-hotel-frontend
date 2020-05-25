<template>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="searchedHotelList">
        <div slot="footer">from <b>NJU-SE</b> hotel search</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <template slot="actions">
              <span :key="star">
                        <a-icon type="star" style="margin-right: 8px"/>
                      {{ item.hotelStar }}
                    </span>
                <span :key="like-o">
                      <a-icon type="like-o" style="margin-right: 8px"/>
                      {{ item.rate }}
                    </span>
                <span :key="tag" v-if="item.isOrdered">
                      <a-icon type="tag" style="margin-right: 8px"/>
                       "曾经预定过"
                </span>

            </template>

            <img
                    slot="extra"
                    width="272"
                    height="190"
                    style="border-radius:12px"
                    alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
            <!--                 先顶一下   :src="item.hotelPic"-->
            <!--            先限制一下，等到之后再处理拉伸变形问题-->
            <a-list-item-meta :description="item.address"  >
                <a slot="title" @click="jumpToDetails(item.id)">{{ item.name }}</a>
                <a-button shape="circle" icon="search" slot="title" type="dashed"  @click.native="jumpToDetails(item.id)" style="margin-left: 12px">
                </a-button>
                <!--                <a-avatar slot="avatar" :src="item.avatar"/>-->
            </a-list-item-meta>
            {{ item.description }}
            <!--            <h4 >{{item.lowestprice}}</h4>-->
        </a-list-item>
    </a-list>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['searchedHotelList'])
        },
        data() {
            return {
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 7,
                },

            };
        },
        methods:{
            jumpToDetails(id) {
                this.$router.push({name: 'hotelDetail', params: {hotelId: id}})
            }
        }
    };
</script>
<style>
    @import "//at.alicdn.com/t/font_1132913_kay1khsleei.css";
</style>
