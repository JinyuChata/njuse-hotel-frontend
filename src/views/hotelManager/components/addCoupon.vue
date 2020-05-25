<template xmlns:a-form="http://www.w3.org/1999/html">
    <a-modal
            :visible="addCouponVisible"
            title="添加优惠策略"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
    >
        <a-form :form="form" style="margin-top: 30px" v-bind="formItemLayout">
            <a-form-item label="优惠券类型" v-bind="formItemLayout">
                <a-select
                        v-decorator="
                    [ 'type',
                    { rules: [{ required: true, message: '请选择类型' }] }
                    ]"
                        @change="changeType"
                >
<!--                    <a-select-option value="1">生日特惠</a-select-option>-->
<!--                    <a-select-option value="2">多间特惠</a-select-option>-->
                    <a-select-option value="3">满减特惠</a-select-option>
                    <a-select-option value="4">限时特惠</a-select-option>
                    <a-select-option value="5">节日特惠</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="券名" v-bind="formItemLayout">
                <a-input
                        placeholder="请填写券名"
                        v-decorator="['name', { rules: [{ required: true, message: '请输入券名' }] }]"
                />
            </a-form-item>
            <a-form-item label="优惠简介" v-bind="formItemLayout">
                <a-input
                        type="textarea"
                        :rows="4"
                        placeholder="请填写优惠简介"
                        v-decorator="['description', { rules: [{ required: true, message: '请填写优惠简介' }] }]" />
            </a-form-item>
            <div v-if="couponType==3">
                <a-form-item label="达标金额">
                    <a-input
                            placeholder="请填写达标金额"
                            v-decorator="['targetMoney', { rules: [{ required: false, message: '请填写达标金额' }] }]"
                    />
                </a-form-item>
                <a-form-item label="优惠金额" v-bind="formItemLayout">
                    <a-input
                            placeholder="请填写优惠金额"
                            v-decorator="['discountMoney', { rules: [{ required: false, message: '请填写优惠金额' }] }]"
                    />
                </a-form-item>
            </div>
            <div v-if="couponType==4 || couponType==5">
                <a-collapse default-active-key="1" :bordered="false">
                    <a-collapse-panel key="1" header="使用满减优惠" class="collapse">
                        <a-form-item label="达标金额">
                            <a-input
                                    placeholder="请填写达标金额"
                                    v-decorator="['targetMoney', { rules: [{ required: false, message: '请填写达标金额' }] }]"
                            />
                        </a-form-item>
                        <a-form-item label="优惠金额" v-bind="formItemLayout">
                            <a-input
                                    placeholder="请填写优惠金额"
                                    v-decorator="['discountMoney', { rules: [{ required: false, message: '请填写优惠金额' }] }]"
                            />
                        </a-form-item>
                    </a-collapse-panel>
                    <a-collapse-panel key="2" header="使用折扣优惠" :disabled="false"  class="collapse">
                        <a-form-item label="折扣力度" v-bind="formItemLayout">
                            <a-input
                                    placeholder="请填写折扣大小"
                                    v-decorator="['discount', { rules: [{ required: false, message: '请填写折扣大小' }] }]"
                            />
                        </a-form-item>
                    </a-collapse-panel>
                </a-collapse>
            </div>

<!--            <a-form-item label="折扣力度" v-bind="formItemLayout">-->
<!--                <a-input-->
<!--                        placeholder="请填写折扣大小"-->
<!--                        v-decorator="['discountNumber', { rules: [{ required: false, message: '请填写折扣大小' }] }]"-->
<!--                />-->
<!--            </a-form-item>-->
            <a-form-item label="优惠时间" v-bind="formItemLayout" v-if="couponType!=3">
                <a-range-picker @change="onChange">
                <a-icon slot="suffixIcon" type="calendar" />
                 </a-range-picker>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'addCouponModal',
        data() {
            return {
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
                couponTime:Array,
                hasCouponTime:false,
                couponType:0,
            }
        },
        computed: {
            ...mapGetters([
                'activeHotelId',
                'addCouponVisible',
            ])
        },
        beforeCreate() {
            // 表单名默认为“form”
            this.form = this.$form.createForm(this, { name: 'addCouponModal' });
        },
        mounted() {

        },
        methods: {
            onChange(date, dateString) {
                this.hasCouponTime=true;
                this.couponTime=dateString;
            },
            //优惠卷日期产生数据
            ...mapMutations([
                // mutations  this.$store.commit(xxx) mapMutations
                'set_addCouponVisible'
            ]),
            ...mapActions([
                // addHotelCoupon：添加酒店策略接口
                //actions this.$store.dispatch(xxx)    mapActions
                'addHotelCoupon'
            ]),
            cancel() {
                this.set_addCouponVisible(false)
            },
            changeType(v){
                this.couponType=v;
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            // 这里添加接口参数
                            name: this.form.getFieldValue('name'),
                            description: this.form.getFieldValue('description'),
                            type: Number(this.form.getFieldValue('type')),
                            targetMoney: isNaN(Number(this.form.getFieldValue('targetMoney')))?null:Number(this.form.getFieldValue('targetMoney')),
                            discountMoney: isNaN(Number(this.form.getFieldValue('discountMoney')))?null:Number(this.form.getFieldValue('discountMoney')),
                            hotelId: Number(this.activeHotelId),
                            discount:isNaN(Number(this.form.getFieldValue('discount')))?null:Number(this.form.getFieldValue('discount')),
                            status: 1,
                            hasCouponTime:this.hasCouponTime,
                            startDate:this.hasCouponTime?this.couponTime[0]:null,
                            endDate:this.hasCouponTime?this.couponTime[1]:null,
                            // couponTime: this.hasCouponTime?this.couponTime:[],
                        };
                        console.log(data)
                        // this.addHotelCoupon(data);
                    }
                });
            },//响应按钮的按下，调用action方法
        }
    }
</script>
<style scoped lang="less">
    /*.ant-tabs-nav-scroll {*/
    /*    display: flex;*/
    /*    justify-content: center;*/
    /*}*/
    .collapse{
        border-radius: 4px;
        border: 0;
        margin-bottom: 0;
        margin-left: 10px;
    }
</style>