<template>
    <transition enter-active-class="animate__animated animated__fadeInRight"
                leave-active-class="animate__animated animated__fadeOutLeft">
        <div v-if="addRoomModalVisible">
            <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
                <div style="width: 100%; text-align: left; margin:20px 0">
                    <a-button type="primary" shape="round" icon="left" @click="onOk">
                    </a-button>
                </div>
                <managed-room-list/>
            </a-form>
        </div>
    </transition>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import managedRoomList from "./managedRoomList";

    export default {
        name: 'manageRoomPanel',
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
                'activeHotelId',
                'addHotelModalVisible'
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
