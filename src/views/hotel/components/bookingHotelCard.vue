<template>
    <div>



        <a-list item-layout="vertical" size="large" :pagination="pagination" :data-source="listData">
            <div slot="footer"><b>ant design vue</b> footer part</div>
<!--            上面是页脚描述-->
            <a-list-item slot="renderItem" key="item.title"  slot-scope="item">
<!--               slot-scope 上面删了一个 index-->
                <template v-for="{ type, text} in actions" slot="actions">
                    <span :key="type">
                      <a-icon :type="type" style="margin-right: 8px" />
                      {{ text }}
                    </span>
                </template>
<!--                上面这个是下面的小图标和东西-->

                <img
                        slot="extra"
                        width="272"
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />

                <a-list-item-meta :description="item.description">
                    <a slot="title" :href="item.href">{{ item.title+" 这个是酒店标题（点击查看详情）" }}</a>
                    <a-avatar slot="avatar" :src="item.avatar" />
                </a-list-item-meta>

                {{ item.content }}
                这个是主题内容
                <a-button type="dashed" icon=form class="orderbut">
                    点击预订
                </a-button>
            </a-list-item>
        </a-list>
<!--        <ul>-->
<!--            <li class="item " v-for="item of recommendList" :key='item.id'>-->
<!--                <img class="item-img"   :src="item.imgUrl">-->
<!--                <div class="item-inof">-->
<!--                    <p class="item-title">{{item.title}}</p>-->
<!--                    <p class="item-desc">{{item.desc}}</p>-->
<!--                    <a-button type="dashed" class="iforder">-->
<!--                        曾经预定过-->
<!--&lt;!&ndash;                        v-if 通过数据驱动&ndash;&gt;-->
<!--                    </a-button>-->
<!--                    <a-button type="dashed" class="iforder">-->
<!--                        曾经取消订单-->
<!--&lt;!&ndash;                        v-if 通过数据驱动&ndash;&gt;-->
<!--                    </a-button>-->
<!--                </div>-->
<!--                <div class="item-tag">-->
<!--                    <P>{{item.star}}</P>-->
<!--                    <p>{{item.score}}</p>-->
<!--                    <p>{{item.price}}</p>-->
<!--                    <a-button  type="dashed" class="item-button"> 查看详情<a-icon type="right" /> </a-button>-->
<!--                </div>-->
<!--            </li>-->
<!--        </ul>-->
    </div>

</template>



<script>
    const listData = [];//好像是从ant design里面弄出来了23页数据
    for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'https://www.antdv.com/',
            title: `ant design vue part ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            content:
                'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        });
    }
//上面是一种很好的异步调用数据并且组件使用方式！！
    export default {
        name: "bookingHotelCard",
        data() {
            return {
                listData,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                },
                actions: [
                    { type: 'star-o', text: '5' },
                    { type: 'like-o', text: '4.7' },
                    { type: 'message', text: '3' },
                    { type: 'tag', text: '曾经预定过' },
                ],
            };
        },
        // data() {
        //     return {
        //         recommendList: [{
        //             id: '0001',
        //             imgUrl: 'https://images.bthhotels.com/homeinns/0210M6_a.jpg',
        //             title: '如家商旅',
        //             desc: '地铁二号线 丨地址：上海市黄浦区浙江中路379号（靠近南京路）',
        //             price: '265起',
        //             score: '4.7',
        //             star: '5'
        //         }, {
        //             id: '0002',
        //             imgUrl: 'https://images.bthhotels.com/homeinns/0210M6_a.jpg',
        //             title: '如家商旅',
        //             desc: '地铁二号线 丨地址：上海市黄浦区浙江中路379号（靠近南京路）',
        //             price: '265起',
        //             score: '4.7',
        //             star: '5'
        //         }, {
        //             id: '0003',
        //             imgUrl: 'https://images.bthhotels.com/homeinns/0210M6_a.jpg',
        //             title: '如家商旅',
        //             desc: '地铁二号线 丨地址：上海市黄浦区浙江中路379号（靠近南京路）',
        //             price: '265起',
        //             score: '4.7',
        //             star: '5'
        //         }, {
        //             id: '0004',
        //             imgUrl: 'https://images.bthhotels.com/homeinns/0210M6_a.jpg',
        //             title: '如家商旅',
        //             desc: '地铁二号线 丨地址：上海市黄浦区浙江中路379号（靠近南京路）',
        //             price: '265起',
        //             score: '4.7',
        //             star: '5'
        //         }]
        //     }

    }
</script>

<style scoped lang="less">
.orderbut{
    display: flex;
    position: absolute;
    right: 300px;
}
/*.item{*/
/*    overflow: hidden;*/
/*    display: flex;*/
/*    height: 200px;*/
/*    margin: 10px 0 10px 50px;*/
/*    background-color:rgba(0,0,0,0);//背景透明*/
/*    border-bottom: 1px solid #eaeaea;*/
/*    .item-img{*/
/*        width: 200px;*/
/*        height: 200px;*/
/*        padding: 10px;*/
/*    }*/
/*    .item-tag{*/
/*             width: 200px;*/
/*             height: 200px;*/
/*             padding: 10px;*/
/*     }*/
/*    .item-inof{*/
/*        flex: 1;//撑开屏幕宽度？？*/
/*        padding: 10px;*/
/*        min-width: 0 ;*/
/*        .item-title{*/
/*            line-height: 30px;*/
/*            font-size: 20px;*/
/*            color: rgb(66, 32, 32);*/
/*        }*/
/*        .item-desc{*/
/*            overflow: hidden; // 溢出隐藏*/
/*            white-space: nowrap;!*规定文本不进行换行*!*/
/*            text-overflow: ellipsis;!*当对象内文本溢出时显示省略标记（...）*!*/
/*        }*/
/*        .iforder{*/
/*           margin: 40px 5px;*/
/*        }*/
/*    }*/
/*}*/

</style>