<template>
    <a-modal
            :visible="addRoomModalVisible"
            width="50%"
            title="客房管理"
            cancelText="取消"
            :cancelButtonProps="{ props: { disabled: true } }"
            okText="确定"
            @ok="onOk"
            @cancel="onOk"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <managed-room-list/>
        </a-form>
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import managedRoomList from "./managedRoomList";

    export default {
        name: 'addRoomModal',
        components: {
            managedRoomList
        },
        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: {span: 12},
                        sm: {span: 6},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 16},
                    },
                },
                roomTime: Array,
            }
        },
        computed: {
            ...mapGetters([
                'addRoomModalVisible',
                'activeHotelId'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'addRoomModal'});
        },
        mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addRoomModalVisible',
                'set_addRoomParams'
            ]),
            ...mapActions([
                'addRoom'
            ]),
            onChange(date, dateString) {
                // this.roomAvailable=true;
                this.roomTime = dateString;
            },
            onOk() {
                this.set_addRoomModalVisible(false)
            }
        }
    }
</script>
