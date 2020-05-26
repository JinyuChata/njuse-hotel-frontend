<template>
    <div class="manageHotel-wrapper" >
<!--        {{mgrHotelList}}-->
        <a-tabs >
            <a-tab-pane tab="酒店管理" key="1">
                <transition enter-active-class="animate__animated animated__fadeInRight"
                            leave-active-class=" animate__animated animated__fadeOutLeft">
                    <div v-if="!addRoomModalVisible">
                        <div style="width: 100%; text-align: right; margin:20px 0">
                            <a-button type="primary" @click="addHotel">
                                <a-icon type="plus"/>
                                添加酒店
                            </a-button>
                        </div>
<!--&lt;!&ndash;                        <a-table&ndash;&gt;-->

<!--                <div style="width: 100%; text-align: right; margin:20px 0">-->
<!--                    <a-button type="primary" @click="addHotel">-->
<!--                        <a-icon type="plus"/>-->
<!--                        添加酒店-->
<!--                    </a-button>-->
<!--                    &lt;!&ndash;                    <div>{{userId}}</div>&ndash;&gt;-->
<!--                </div>-->
                <a-table

                        :columns="columns1"
                        :dataSource="mgrHotelList"
                        bordered
                >
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small" @click="showDrawer(record.id)">今日异常</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-button type="primary" size="small" @click="manageRoom(record)">房间管理</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a-button type="info" size="small" @click="showCoupon(record)">优惠策略</a-button>
                        <a-divider type="vertical"></a-divider>
                        <a type="info" size="small" @click="manageHotel(record)">维护</a>
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
                    </div>
                </transition>
                <room-manage-panel></room-manage-panel>
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
        </a-tabs>
        <AddHotelModal></AddHotelModal>
        <Coupon></Coupon>
        <unusualOrder :hotelId="id" ></unusualOrder>
        <ManageHotelModal :record="clickedRecord"></ManageHotelModal>
    </div>
</template>
<!--private Integer id;-->
<!--private String name;-->
<!--private String address;-->
<!--private String biz_id;-->
<!--private String hotelStar;-->
<!--private Double rate;-->
<!--private String description;-->
<!--private String phoneNum;-->
<!--private Integer managerId;-->
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import AddHotelModal from './components/addHotelModal'
    import RoomManagePanel from './components/roomManagePanel'
    import Coupon from './components/coupon'
    import unusualOrder from "./components/unusualOrder";
    import ManageHotelModal from "./components/manageHotelModal";

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
                clickedRecord:{}
            }
        },
        components: {
            AddHotelModal,
            RoomManagePanel,
            Coupon,
            unusualOrder,
            ManageHotelModal
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
                'unusualOrderVisible',
                'currentHotelInfo'
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
                'set_unusualOrderVisible',
                'set_manageHotelVisible'
            ]),
            ...mapActions([
                'getMgrHotelList',
                'getAllOrders',
                'getHotelCoupon',
                'deleteOrder',
                'getManagedOrders',
                'getHotelById',
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
            manageRoom(record) {
                this.set_activeHotelId(record.id)
                this.set_addRoomModalVisible(true)
                this.set_manageHotelVisible(false)
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
<style>
</style>
