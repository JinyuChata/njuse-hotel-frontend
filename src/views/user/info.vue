<template>
    <div class="info-wrapper">
        <a-tabs>
            <a-tab-pane tab="我的信息" key="1">
                <a-form :form="form" style="margin-top: 30px">

                    <a-form-item label="用户名" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1  }">
                        <a-input
                                placeholder="请填写用户名"
                                v-decorator="['userName', { rules: [{ required: true, message: '请输入用户名' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.userName }}</span>
                    </a-form-item>
                    <a-form-item label="邮箱" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.email }}</span>
                    </a-form-item>

                    <a-form-item label="手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <a-input
                                placeholder="请填写手机号"
                                v-decorator="['phoneNumber', { rules: [{ required: true, message: '请输入手机号' }] }]"
                                v-if="modify"
                        />
                        <span v-else>{{ userInfo.phoneNumber}}</span>
                    </a-form-item>
                    <a-form-item label="信用值" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">
                        <span>{{ userInfo.credit }}</span>
                    </a-form-item>
                    <!--            因为没数据，暂且搁置了   显示是否为会员！！-->
                    <!--                    <a-form-item label="会员类型"  v-if="userInfo.isMember" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }">-->
                    <!--                        <span>{{ userInfo.memberType}}</span>-->
                    <!--                    </a-form-item>-->
                    <a-form-item label="密码" :label-col="{ span: 3 }" :wrapper-col="{ span: 8, offset: 1 }"
                                 v-if="modify">
                        <a-input
                                placeholder="请输入新密码"
                                v-decorator="['password', { rules: [{ required: true, message: '请输入新密码' }] }]"
                        />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 12, offset: 5 }" v-if="modify">
                        <a-button type="primary" @click="saveModify">
                            保存
                        </a-button>
                        <a-button type="default" style="margin-left: 30px" @click="cancelModify">
                            取消
                        </a-button>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 8, offset: 4 }" v-else>
                        <a-button type="primary" @click="modifyInfo">
                            修改信息
                        </a-button>
                    </a-form-item>
                </a-form>
                <a-button type="link" @click="handleRegistere" style="margin-left: 90px">
                    注册会员
                </a-button>
            </a-tab-pane>
            <a-tab-pane tab="我的订单" key="2">
                <a-table
                        size="middle"
                        :columns="columns"
                        :dataSource="userOrderList"

                >
                    <span slot="price" slot-scope="text">
                        <span>￥{{ text }}</span>
                    </span>
                    <span slot="roomType" slot-scope="text">
                        <span v-if="text == 'BigBed'">大床房</span>
                        <span v-if="text == 'DoubleBed'">双床房</span>
                        <span v-if="text == 'Family'">家庭房</span>
                    </span>
                    <span slot="orderState" color="blue" slot-scope="text">
                        {{ text }}
                    </span>
                    <span slot="action" slot-scope="record">
                        <a-button type="primary" size="small">查看</a-button>
                        <a-divider type="vertical" v-if="record.orderState == '已预订'"></a-divider>
                        <a-popconfirm
                                title="你确定撤销该笔订单吗？"
                                @confirm="confirmCancelOrder(record.id)"
                                @cancel="cancelCancelOrder"
                                okText="确定"
                                cancelText="取消"
                                v-if="record.orderState == '已预订'"
                        >
                            <a-button type="danger" size="small">撤销</a-button>
                        </a-popconfirm>
                    </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="信用记录" key="3">
                <a-table
                        :columns="creditColumns"
                        :data-source="creditInfo"
                        size="middle"
                >
                    <span slot="action" slot-scope="text">
                    <a-tag color="green" v-if="text=='OrderExec'">
                        订单已执行
                    </a-tag>
                    <a-tag color="red" v-if="text=='OrderErr'">
                        订单异常
                    </a-tag>
                    <a-tag color="gray" v-if="text=='OrderRetreat'">
                        订单已取消
                    </a-tag>
                    <a-tag color="lightgreen" v-if="text=='AddFrc'">
                        信用充值
                    </a-tag>
                    </span>
                </a-table>
            </a-tab-pane>

            <a-tab-pane tab="信用充值" key="4">
                <div>
                    <br><br>
                    <a-form :form="form" @submit="handleOk" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }" >
                        <a-form-item label="客户ID：">
                            <a-input
                                    v-decorator="[ 'id',
                                { rules: [{required: true, message: '请输入客户ID', }] }]">
                            </a-input>
                        </a-form-item>
                        <a-form-item label="充值金额：">
                            <a-input
                                    :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                                    v-decorator="[ 'money',
                                { rules: [{required: true, message: '请输入金额', }] }]">
                            </a-input>
                        </a-form-item>
                        <a-form-item :wrapper-col="{ span: 1, offset: 11 }">
                            <a-button type="primary" html-type="submit">
                                Submit
                            </a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </a-tab-pane>
        </a-tabs>
        <registered-member :registeredMemberVisible="registeredMemberVisible"></registered-member>
    </div>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import registeredMember from "./registeredMember";

    const columns = [
        {
            title: '订单号',
            dataIndex: 'id',
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
            title: '状态',
            filters: [{text: '已预订', value: '已预订'}, {text: '已取消', value: '已取消'}, {text: '已入住', value: '已入住'}],
            onFilter: (value, record) => record.orderState.includes(value),
            dataIndex: 'orderState',
            scopedSlots: {customRender: 'orderState'}
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },

    ];

    const creditColumns = [
        {
            title: '时间',
            dataIndex: 'time',
        },
        {
            title: '订单号',
            dataIndex: 'orderId',
        },
        {
            title: '动作',
            dataIndex:'action',
            scopedSlots: {customRender: 'action'}
        },
        {
            title: '信用度变化',
            dataIndex: 'changeVal',
        },
        {
            title: '信用度结果',
            dataIndex: 'afterChange',
        },
    ];

    export default {
        name: 'info',
        data() {
            return {
                modify: false,
                formLayout: 'horizontal',
                pagination: {},
                columns,
                creditColumns,
                visible: false,
                data: [],
                form: this.$form.createForm(this, {name: 'coordinated'}),

            }
        },
        components: {
            registeredMember,
        },
        computed: {
            ...mapGetters([
                'userId',
                'creditInfo',
                'userInfo',
                'userOrderList',
                'registeredMemberVisible',
            ]),

        },
        async mounted() {
            await this.getUserInfo()
            await this.getUserOrders()
            await this.getCreditInfo()

        },
        methods: {
            ...mapActions([
                'getUserInfo',
                'getUserOrders',
                'updateUserInfo',
                'cancelOrder',
                'investCredit',
                'getCreditInfo'
            ]),
            ...mapMutations([
                'set_registeredMemberVisible',
            ]),
            handleOk() {
                const data = {
                    id: this.form.getFieldValue('id'),
                    investedMoney: this.form.getFieldValue('money')
                }
                console.log(data)
                this.investCredit(data)
                this.visible = false
            },
            saveModify() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        const data = {
                            userName: this.form.getFieldValue('userName'),
                            phoneNumber: this.form.getFieldValue('phoneNumber'),
                            password: this.form.getFieldValue('password')
                        }
                        this.updateUserInfo(data).then(() => {
                            this.modify = false
                        })
                    }
                });
            },
            modifyInfo() {
                setTimeout(() => {
                    this.form.setFieldsValue({
                        'userName': this.userInfo.userName,
                        'phoneNumber': this.userInfo.phoneNumber,
                    })
                }, 0)
                this.modify = true
            },
            handleRegistere() {
                this.set_registeredMemberVisible(true);
            },
            //改变注册会员页的显示
            cancelModify() {
                this.modify = false
            },
            confirmCancelOrder(orderId) {
                this.cancelOrder(orderId)
            },
            cancelCancelOrder() {

            }

        }
    }
</script>
<style scoped lang="less">
    .info-wrapper {
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
    .info-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
