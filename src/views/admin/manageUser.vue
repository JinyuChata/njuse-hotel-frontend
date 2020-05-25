<template>
    <div class="manageUser-wrapper">
        <a-tabs>
            <a-tab-pane tab="酒店工作人员账户管理" key="1">
                <div style="width: 100%; text-align: right; margin:20px 0">
                    <a-button type="primary" @click="addManager"><a-icon type="plus" />添加用户</a-button>
                </div>
                <a-table
                    size="middle"
                    :columns="columns"
                    :dataSource="managerList"
                >
                    <span slot="action" slot-scope="record">
                        <a-popconfirm
                                title="确定想删除该账户吗？"
                                @confirm="delAccount(record.id)"
                                okText="确定"
                                cancelText="取消"
                        >
                            <a-icon type="delete" theme="twoTone" twoToneColor="red" 删除用户/>
                        </a-popconfirm>

                        <a-divider type="vertical"></a-divider>
                        <a-icon type="form" @click="updateAccount(record.id)" />
<!--                        <a-button type="primary"  size="small">更改信息</a-button>-->
<!--                        <a-divider type="vertical"></a-divider>-->
<!--                        <a-button type="primary" @click="setAsManager(record.id)" size="small">设置为网站管理员</a-button>-->

                    </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="客户账号管理" key="2">
<!--                <div style="width: 100%; text-align: right; margin:20px 0">-->
<!--&lt;!&ndash;                    <a-button type="primary" @click="addHotelModal"><a-icon type="plus" />添加酒店</a-button>&ndash;&gt;-->
<!--                </div>-->
                <a-table
                        size="middle"
                        :columns="columns"
                        :dataSource="clientList"
                >
                    <span slot="action" slot-scope="record">
                        <a-popconfirm
                                title="确定想删除该账户吗？"
                                @confirm="delAccount(record.id)"
                                okText="确定"
                                cancelText="取消"
                        >
                            <a-icon type="delete" theme="twoTone" twoToneColor="red" 删除用户/>
                        </a-popconfirm>

                        <a-divider type="vertical"></a-divider>

                        <a-icon type="form" @click="updateAccount(record.id)" />
                        <!--                        <a-divider type="vertical"></a-divider>-->
                        <!--                        <a-button type="primary" @click="setAsManager(record.id)" size="small">设置为网站管理员</a-button>-->

                    </span>
                </a-table>
            </a-tab-pane>
            <a-tab-pane tab="酒店管理" key="3">
                <a-table
                        size="middle"
                        :columns="columns1"
                        :data-source="hotelList"
                        >
                    <span slot="action" slot-scope="record">
                            <a-form :form="form" v-show="record.managerId==null">
                                <a-form-item v-bind="formItemLayout" >
                                <a-input-number
                                        v-decorator="['managerId']"
                                />
                                    <a-button slot="enterButton">Custom</a-button>
                                    <a-divider type="vertical"></a-divider>
                                    <a-button type="primary" @click="bind(record.id)" size="small">绑定酒店管理人员</a-button>
                                </a-form-item>
                            </a-form>
                    </span>
                </a-table>
            </a-tab-pane>
        </a-tabs>
        <AddManagerModal></AddManagerModal>
        <update-account :id="id"></update-account>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import AddManagerModal from './components/addManagerModal'
import updateAccount from "./components/updateAccount";
const columns = [
    {
        title: '用户邮箱',
        dataIndex: 'email',
    },
    {
        title: '用户名',
        dataIndex: 'userName',
    },
    {
        title: '用户密码',
        dataIndex: 'password',
    },
    {
        title: '用户手机号',
        dataIndex: 'phoneNumber',
    },
    {
        title: '信用值',
        dataIndex: 'credit',
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ];
const columns1 = [
    {
        title: '酒店ID',
        dataIndex: 'id',
    },
    {
        title: '酒店名称',
        dataIndex: 'name',
    },
    {
        title: '管理员ID',
        dataIndex: 'managerId',
    },
    {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];
export default {
    name: 'manageUser',
    data(){
        return {
            id:'',
            formItemLayout: {
                labelCol: {
                    xs: { span: 12 },
                    sm: { span: 6 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 },
                },
            },
            pagination: {},
            columns,
            columns1,
            data: [],
            form: this.$form.createForm(this, { name: 'manageUser' }),
        }
    },
    components: {
        AddManagerModal,
        updateAccount
    },
    computed: {
        ...mapGetters([
            'addManagerModalVisible',
            'updateAccountVisible',
            'managerList',
            'clientList',
            'hotelList',
        ])
    },
    mounted() {
      this.getManagerList(),
      this.getClientList(),
      this.getHotelList()
    },
    methods: {
        ...mapActions([
            'getManagerList',
            'getClientList',
            'deleteAccount',
            'getHotelList',
            'bindManager'
        ]),
        ...mapMutations([
            'set_addManagerModalVisible',
            'set_updateAccountVisible',

        ]),

        bind(id) {
            const data = {
                hotelId: id,
                mgrId: this.form.getFieldValue('managerId')
            }
            this.bindManager(data)
        },
        addManager(){
            this.set_addManagerModalVisible(true)
        },
        updateAccount(id){
            this.id=id;
            this.set_updateAccountVisible(true);
        },

        delAccount(id){
            this.deleteAccount(id)
        }
    }
}
</script>
<style scoped lang="less">
    .manageUser-wrapper {
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
    .manageUser-wrapper {
        .ant-tabs-bar {
            padding-left: 30px
        }
    }
</style>
<style lang="less">

</style>
