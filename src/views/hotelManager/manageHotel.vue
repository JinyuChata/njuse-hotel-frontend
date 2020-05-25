<template>
    <div class="manageHotel-wrapper">
        <a-tabs>
            <a-tab-pane tab="酒店管理" key="1">

                <div style="width: 100%; text-align: right; margin:20px 0">
                    <a-button type="primary" @click="addHotel">
                        <a-icon type="plus"/>
                        添加酒店
                    </a-button>
                    <!--                    <div>{{userId}}</div>-->
                </div>
                <a-table

                        :columns="columns1"
                        :dataSource="mgrHotelList"
                        bordered
                >
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small" @click="showDrawer(record.id)">今日异常</a-button>
                        <a-divider type="vertical"></a-divider>

                        <a-button type="primary" size="small" @click="addRoom(record)">录入房间</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-button type="info" size="small" @click="showCoupon(record)">优惠策略</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-popconfirm
                                title="确定想删除该酒店吗？"
                                @confirm="deleteHotel(record)"
                                okText="确定"
                                cancelText="取消"
                        >
                            <a-button type="danger" size="small">删除酒店</a-button>
                        </a-popconfirm>
                    </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="订单管理" key="2">
                <a-table
                        :columns="columns2"
                        :dataSource="managedOrders"
                >
                    <span slot="price" slot-scope="text">
                        <span>￥{{ text }}</span>
                    </span>
                    <span slot="roomType" slot-scope="text">
                        <span v-if="text == 'BigBed'">大床房</span>
                        <span v-if="text == 'DoubleBed'">双床房</span>
                        <span v-if="text == 'Family'">家庭房</span>
                    </span>
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small" @click="checkin(record.id)">已入住</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-button type="primary" size="small" @click="checkout(record.id)">已退房</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-button type="primary" size="small"
                                  @click="showDetail(record)"

                        >取消异常</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-popconfirm
                                title="确定想删除该订单吗？"
                                @confirm="delOrder(record.id)"
                                okText="确定"
                                cancelText="取消"
                        >
                            <a-icon type="delete" theme="twoTone" twoToneColor="red" />
                        </a-popconfirm>
                    </span>
                </a-table>
            </a-tab-pane>
<!--            <a-tab-pane tab="维护酒店基本信息">-->
<!--                <a-form>-->
<!--                    <a-form-item label="酒店名称" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <span> 酒店名称的数据 不可改</span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="酒店地址" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <a-input-->
<!--                                placeholder="请填写酒店地址"-->
<!--                                v-decorator="['address' ]"-->
<!--                                v-if="true"-->
<!--                        />-->
<!--                        <span v-else>-->
<!--                            {{}}-->
<!--                        </span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="所属商圈" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <a-input-->
<!--                                placeholder="请填写酒店所属商圈"-->
<!--                                v-decorator="['' ]"-->
<!--                                v-if="true"-->
<!--                        />-->
<!--                        <span v-else>-->
<!--                            {{}}-->
<!--                        </span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="酒店星级" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <a-input-->
<!--                                placeholder="请填写酒店地址"-->
<!--                                v-decorator="['address' ]"-->
<!--                                v-if="true"-->
<!--                        />-->
<!--                        <span v-else>-->
<!--                            {{}}-->
<!--                        </span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="酒店评分" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <span>酒店评分的数据 不可改</span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="酒店电话" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <a-input-->
<!--                                placeholder="请填写酒店地址"-->
<!--                                v-decorator="['address' ]"-->
<!--                                v-if="true"-->
<!--                        />-->
<!--                        <span v-else>-->
<!--                            {{}}-->
<!--                        </span>-->
<!--                    </a-form-item>-->
<!--                    <a-form-item label="酒店描述" :label-col="{ span: 3,offset:5 }" :wrapper-col="{ span: 8, offset: 1  }">-->
<!--                        <a-textarea-->
<!--                                placeholder="请填写酒店描述"-->
<!--                                v-decorator="['address' ]"-->
<!--                                v-if="true"-->
<!--                        />-->
<!--                        <span v-else>-->
<!--                            {{}}-->
<!--                        </span>-->
<!--                    </a-form-item>-->
<!--                </a-form>-->
<!--            </a-tab-pane>-->
        </a-tabs>
        <AddHotelModal></AddHotelModal>
        <AddRoomModal></AddRoomModal>
        <Coupon></Coupon>
        <unusualOrder :hotelId="id" ></unusualOrder>
    </div>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import AddHotelModal from './components/addHotelModal'
    import AddRoomModal from './components/addRoomModal'
    import Coupon from './components/coupon'
    import unusualOrder from "./components/unusualOrder";

    const moment = require('moment')
    const columns1 = [
        {
            title: '酒店名',
            dataIndex: 'name',
        },
        {
            title: '商圈',
            dataIndex: 'bizRegion',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '酒店星级',
            dataIndex: 'hotelStar'
        },
        {
            title: '评分',
            dataIndex: 'rate',
        },
        {
            title: '简介',
            dataIndex: 'description',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    const columns2 = [
        {
            title: '订单号',
            dataIndex: 'id',
        },
        {
            title: '订单状态',
            dataIndex: 'orderState',
        },
        {
            title: '酒店名',
            dataIndex: 'hotelName',
        },
        {
            title: '房型',
            dataIndex: 'roomType',
            scopedSlots: {customRender: 'roomType'}
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
            scopedSlots: {customRender: 'checkInDate'}
        },
        {
            title: '离店时间',
            dataIndex: 'checkOutDate',
            scopedSlots: {customRender: 'checkOutDate'}
        },
        {
            title: '入住人数',
            dataIndex: 'peopleNum',
        },
        {
            title: '房价',
            dataIndex: 'price',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    const columns3 = [];
    export default {
        name: 'manageHotel',
        data() {
            return {
                id:'',
                formLayout: 'horizontal',
                pagination: {},
                columns1,
                columns2,
                visible: false,
                form: this.$form.createForm(this, {name: 'manageHotel'}),
            }
        },
        components: {
            AddHotelModal,
            AddRoomModal,
            Coupon,
            unusualOrder
        },
        computed: {
            ...mapGetters([
                'userId',
                'orderList',
                'unusualOrderList',
                'managedOrders',
                'mgrHotelList',
                'addHotelModalVisible',
                'addRoomModalVisible',
                'activeHotelId',
                'couponVisible',
                'unusualOrderVisible'
            ]),
        },
        async mounted() {
            await this.getMgrHotelList(this.userId)
            await this.getManagedOrders(this.userId)
            await this.getHotelById()
        },
        methods: {
            ...mapMutations([
                'set_addHotelModalVisible',
                'set_addRoomModalVisible',
                'set_couponVisible',
                'set_activeHotelId',
                'set_unusualOrderVisible'
            ]),
            ...mapActions([
                'getMgrHotelList',
                'getAllOrders',
                'getHotelCoupon',
                'deleteOrder',
                'getManagedOrders',
                'checkIn',
                'checkOut',
                'getUnusualOrderList'
            ]),
            showDrawer(id) {
                this.getUnusualOrderList(id)
                this.set_unusualOrderVisible(true);
            },
            checkin(id){
                this.checkIn(id)
            },
            checkout(id){
                this.checkOut(id)
            },
            addHotel() {
                this.set_addHotelModalVisible(true)
            },
            addRoom(record) {
                this.set_activeHotelId(record.id)
                this.set_addRoomModalVisible(true)
            },
            showCoupon(record) {
                this.set_activeHotelId(record.id)
                this.set_couponVisible(true)
                this.getHotelCoupon()
            },
            manageHotel(record) {
                this.clickedRecord=record;
                // console.log(record)
                this.set_activeHotelId(record.id)
                this.set_manageHotelVisible(true)
            },
            deleteHotel() {

            },
            delOrder(id) {
                this.deleteOrder(id)
            },
        }
    }
</script>
<style scoped lang="less">
    .manageHotel-wrapper {
        padding: 50px;

        .chart {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px
        }
    }
</style>
<style lang="less">
    .manageHotel-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
