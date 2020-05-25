<template>
    <div>
        <a-table :columns="columns" :data-source="data" :pagination="pagination">
            <span slot="action" slot-scope="text, record">
              <a @click="onClickManage(record.id)">管理</a>
              <a-divider type="vertical"/>
              <a @click="onModifyPrice(record.id)">修改价格</a>
            </span>
        </a-table>
    </div>

</template>
<script>
    const columns = [
        {
            title: '# 房型编号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '房间类型',
            dataIndex: 'roomType',
            key: 'roomType',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {customRender: 'action'},
        },
    ];
    const data = [
        {
            id: '1',
            roomType: '大床房',
            price: '199',
        },
        {
            id: '2',
            roomType: '大床房',
            price: '199',
        },
        {
            id: '3',
            roomType: '大床房',
            price: '199',
        },

    ];

    export default {
        data() {
            return {
                data,
                columns,
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                },
            };
        },
        methods: {
            onClickManage(id) {

            },
            onModifyPrice(id) {

            }
        }
    };
</script>
