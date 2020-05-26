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
                        :placeholder="record.name"
                        v-decorator="['name', {
                            rules: [
                                { required: true, message: '请输入酒店名称' }
                            ]
                        }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="地址商圈">
                <a-cascader
                        v-decorator="[
                          'biz_id',
          {
            // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [
              { type: 'array', required: true, message: '请选择酒店地理位置' },
            ],
          },
        ]"
                        :options="residences"
                />
            </a-form-item>
            <a-form-item label="酒店详细地址">
                <a-input
                        :placeholder="record.address"
                        v-decorator="['address', {
                            rules: [
                                { required: true, message: '请填写酒店详细地址' }
                            ]
                        }]"
                />
            </a-form-item>
            <a-form-item label="酒店星级">
                <a-radio-group initialvalue="a" v-decorator="['star', {
                    rules: [ {
                        required: true,message: '请选择酒店星级'
                    } ]
                }]">
                    <a-radio-button value="One">
                        一星
                    </a-radio-button>
                    <a-radio-button value="Two">
                        二星
                    </a-radio-button>
                    <a-radio-button value="Three">
                        三星
                    </a-radio-button>
                    <a-radio-button value="Four">
                        四星
                    </a-radio-button>
                    <a-radio-button value="FIve">
                        五星
                    </a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="酒店电话">
                <a-input
                        :placeholder="record.phoneNum"
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
                        :placeholder="record.description"

                        v-decorator="['desc', {
                    rules: [ {
                        required: true, message: '请填写酒店的描述信息'
                    } ]        }]"

                        v-if="true"

                />
                <span v-else>
                            {{}}
                        </span>
            </a-form-item>
        </a-form>
<!--        {{residences}}-->
    </a-modal>
</template>
<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'

    export default {
        name: 'manageHotelModal',
        props: {
          record:Object,
        },
        //
    // { "id": 1,
        // "name": "汉庭酒店",
        // "address": 南京市鼓楼区,
        // "biz_id": "js_nj_xianlin",
        // "hotelStar": "Four",
        // "rate": 4.8,
        // "description": "欢迎您入住",
        // "phoneNum": "1829373819",
        // "managerId": 6, "rooms": null }
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
            this.getResidences()
        },
        methods: {
            ...mapMutations([
                'set_manageHotelVisible'
            ]),
            ...mapActions([
                'submitManageHotelParams',
                'getResidences'
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
                            id:this.record.id,
                            name: this.form.getFieldValue('name'),
                            description: this.form.getFieldValue('desc'),
                            biz_id: this.form.getFieldValue('biz_id')[2],
                            address:this.form.getFieldValue('address'),
                            phoneNum: this.form.getFieldValue('phonenum'),
                            hotelStar: this.form.getFieldValue('star'),
                            rate:this.record.rate,
                            managerId:this.record.managerId,
                            rooms:this.record.rooms
                        }
                        // this.submitHotelSearchParams(data)
                        // console.log('weihu')
                        //
                        // console.log(data)

                        this.submitManageHotelParams(data)
                        //加到hotelmanager里面
                    }
                });
            },
        }
    }
</script>
