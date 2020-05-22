<template>
    <a-modal
            :visible="manageHotelVisible"
            title="酒店信息维护"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <a-form-item label="酒店名称">
                <a-input
                        placeholder="请填写酒店名称"
                        v-decorator="['name', {
                            rules: [
                                { required: true, message: 'Please input the name' }
                            ]
                        }]"
                        v-if="true"
                />
                <span v-else>
                            {{}}
                        </span>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="地址商圈">
                <a-cascader
                        v-decorator="[
          'address',
          {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: 'Please select your habitual residence!' },
            ],
          },
        ]"
                        :options="residences"
                />
            </a-form-item>
            <a-form-item label="酒店星级">
                <a-radio-group initialvalue="a" v-decorator="['star', {
                    rules: [ {
                        required: true
                    } ]
                }]">
                    <a-radio-button value="a">
                        一星
                    </a-radio-button>
                    <a-radio-button value="b">
                        二星
                    </a-radio-button>
                    <a-radio-button value="c">
                        三星
                    </a-radio-button>
                    <a-radio-button value="d">
                        四星
                    </a-radio-button>
                    <a-radio-button value="e">
                        五星
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="酒店电话">
                <a-input
                        placeholder="请填写酒店电话"
                        v-decorator="['phonenum', {
                    rules: [ {
                        required: true, message: 'Please input correct phone num'
                    } ]
                }]"
                        v-if="true"
                />
                <span v-else>
                            {{}}
                        </span>
            </a-form-item>
            <a-form-item label="酒店描述">
                <a-textarea
                        placeholder="请填写酒店描述"
                        v-decorator="['desc' ]"
                        v-if="true"
                />
                <span v-else>
                            {{}}
                        </span>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: 'manageHotelModal',
        data() {
            return {
                formItemLayout: {
                    labelCol: {
                        xs: {span: 12},
                        sm: {span: 6},
                    },
                    wrapperCol: {
                        xs: {span: 26},
                        sm: {span: 16},
                    },
                },
            }
        },
        computed: {
            ...mapGetters([
                'manageHotelVisible',
                'residences'
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'manageHotelModal'});
        },
        mounted() {

        },
        methods: {
            ...mapMutations([
                'set_addHotelParams',
                'set_addHotelModalVisible',
                'set_manageHotelVisible'
            ]),
            ...mapActions([
                'addHotel'
            ]),
            cancel() {
                this.set_manageHotelVisible(false)
            },
            changeStar(v) {

            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            name: this.form.getFieldValue('name'),
                            description: this.form.getFieldValue('desc'),
                            address: this.form.getFieldValue('address'),
                            phoneNum: this.form.getFieldValue('phonenum'),
                            hotelStar: this.form.getFieldValue('star')
                        }
                        console.log(data)
                    }
                });
            },
        }
    }
</script>
