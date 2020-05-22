<template>
    <div>
        <a-modal
                :visible="couponVisible"
                title="优惠策略"
                width="900px"
                :footer="null"
                @cancel="cancel"
        >
            <div style="width: 100%; text-align: right; margin:20px 0">
                <a-button type="primary" @click="addCoupon"><a-icon type="plus" /> 添加优惠策略</a-button>
                <!--            click操作绑定addCoupon方法-->
            </div>
            <a-table
                    :columns="columns"
                    :dataSource="couponList"
                    bordered
            >
                <a-tag color="red" slot="couponName" slot-scope="text">
                    {{text}}
                </a-tag>
            </a-table>
        </a-modal>
        <AddCoupon></AddCoupon>
    </div>

</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import AddCoupon from './addCoupon'

    const columns = [
        // 这里定义列表头
        {
            title: '优惠类型',
            dataIndex: 'couponName',
            scopedSlots: {customRender: 'couponName'}
        },
        {
            title: '折扣',
            dataIndex: 'discount',
        },
        {
            title: '优惠简介',
            dataIndex: 'description',
        },
        {
            title: '优惠金额',
            dataIndex: 'discountMoney',
        },
    ];
    export default {
        name: 'coupon',
        data() {
            return {
                columns,
            }
        },
        components: {
            AddCoupon,
        },
        computed: {
            ...mapGetters([
                'couponVisible',
                'couponList',
            ])
        },
        methods: {
            ...mapMutations([
                'set_addCouponVisible',
                'set_couponVisible',
            ]),
            ...mapActions([
                'getHotelCoupon'
            ]),
            cancel() {
                this.set_couponVisible(false)
            },
            addCoupon() {// 改变状态，自动渲染
                this.set_addCouponVisible(true),
                    this.set_couponVisible(false)
            },
        },
    }
</script>
<style scoped>

</style>