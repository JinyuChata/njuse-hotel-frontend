<template>
    <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
        <div slot="footer">from <b>NJU-SE</b> hotel search</div>
        <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <template slot="actions">
              <span :key="star">
                        <a-icon type="star" style="margin-right: 8px"/>
                      {{ item.hotelStar }}
                    </span>
                <span :key="like-o">
                      <a-icon type="like-o" style="margin-right: 8px" />
                      {{ item.rate }}
                    </span>
                <span :key="tag" v-if="item.isOrdered">
                      <a-icon type="tag" style="margin-right: 8px" />
                       "曾经预定过"
                </span>

            </template>

            <img
                    slot="extra"
                    width="272"
                    height="190"
                    style="border-radius:12px"
                    alt="logo"
                    :src="item.hotelPic"
            />
<!--            先限制一下，等到之后再处理拉伸变形问题-->
            <a-list-item-meta :description="'地址:'+item.address+' 商圈:'+item.bizRegion">
                <a slot="title" :href="item.href">{{ item.name }}</a>
                <!--                <a-avatar slot="avatar" :src="item.avatar"/>-->
            </a-list-item-meta>
            {{ item.description }}
<!--            <h4 >{{item.lowestprice}}</h4>-->
        </a-list-item>
    </a-list>
</template>
<script>
    const listData = [];
    for (let i = 0; i < 23; i++) {
        listData.push({
            id: 1,
            name: `酒店名称 酒店${i}`,
            address: '酒店地址',
            bizRegion:'商圈所在',
            hotelStar: 5,
            rate: 4.7,
            description:
                '酒店的简介，服务，等介绍',
            phoneNum:"13333217870",
            hotelPic: 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png',//目前没有
            lowestprice:200,//目前没有
            isOrdered: true,//目前没有
        });
    }
    //Integer id;
    //  String name;
    // String address;
    // String bizRegion;
    // String hotelStar;
    // Double rate;
    // String description;
    // String phoneNum;
    //Integer managerId;
    export default {
        data() {
            return {
                listData,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 7,
                },

            };
        },
    };
</script>
<style>
    @import "//at.alicdn.com/t/font_1132913_kay1khsleei.css";
</style>
