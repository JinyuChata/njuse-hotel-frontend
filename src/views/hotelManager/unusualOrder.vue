<template>
    <a-table
            :columns="columns1"
            :dataSource="unusualOrderList"
            bordered
    >

    </a-table>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    const columns1 = [
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
        },
        {
            title: '入住时间',
            dataIndex: 'checkInDate',
        },
        {
            title: '离店时间',
            dataIndex: 'checkOutDate',
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
            filters: [{text: '已预订', value: '已预订'}, {text: '已撤销', value: '已撤销'}, {text: '已入住', value: '已入住'}],
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
    export default {
        name: "unusualOrder",
        data(){
            return{
                columns1
            }
        },
        mounted() {
            this.getUnusualOrderList()
        },
        computed: {
            ...mapActions([
                'getUnusualOrderList'
            ]),
            ...mapGetters([
                'unusualOrderList'
            ])
        },
    }
</script>

<style scoped>

</style>
