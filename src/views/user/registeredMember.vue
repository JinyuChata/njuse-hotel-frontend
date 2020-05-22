<template>
    <a-modal
            :visible="registeredMemberVisible"
            title="预定详情"
            cancelText="取消"
            okText="注册"
            @cancel="cancelRegist"
            @ok="handleSubmit"
    >
        <!--        里面是两个标签页-->
        <a-tabs default-active-key="2">
            <a-tab-pane key="1">
              <span slot="tab">
                <a-icon type="crown" />
                普通会员
              </span>

                <a-form :form="form">
                    <a-form-item
                            :label-col="formItemLayout.labelCol"
                            :wrapper-col="formItemLayout.wrapperCol"
                            label="生日"
                    >
                        <a-date-picker :default-value="moment('2000/01/01', dateFormat)"  :format="dateFormat"
                                       @change="selectedBirthday"
                                       v-decorator="[
                                        'birthday',
                                        { rules: [{ required: true, message: 'Please select your birthday' }] },
                                         ]"
                                       placeholder="Please input your birthday"
                        />
                    </a-form-item>
                    <a-form-item
                            :label-col="formItemLayout.labelCol"
                            :wrapper-col="formItemLayout.wrapperCol"
                            label="姓名"
                    >
                        <a-input
                                v-decorator="[
                                 'nickname',
                               { rules: [{ required: checkNick, message: 'Please input your nickname' }] },
                                   ]"
                                placeholder="Please input your nickname"
                        />
                    </a-form-item>
                </a-form>

            </a-tab-pane>
            <a-tab-pane key="2">
             <span slot="tab">
                <a-icon type="sketch" />
                企业会员
             </span>

                <a-form :form="form">
                    <a-form-item
                            :label-col="formItemLayout.labelCol"
                            :wrapper-col="formItemLayout.wrapperCol"
                            label=" 企业名称"
                    >
                        <a-input
                                v-decorator="[
                                  'BusinessName',
                                  { rules: [{ required: true, message: 'Please input your BusinessName' }] },
                                ]"
                                placeholder="Please input your BusinessName"
                        />
                    </a-form-item>
                    <a-form-item
                            :label-col="formItemLayout.labelCol"
                            :wrapper-col="formItemLayout.wrapperCol"
                            label="姓名"
                    >
                        <a-input
                                v-decorator="[
                        'nickname',
                            { rules: [{ required: checkNick, message: 'Please input your nickname' }] },
                            ]"
                                placeholder="Please input your nickname"
                        />
                    </a-form-item>
                </a-form>

            </a-tab-pane>
        </a-tabs>


    </a-modal>
</template>

<script>
    import {mapMutations} from "vuex";
    import moment from 'moment';
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };

    export default {
        name: "registeredMember",
        props:['registeredMemberVisible'],
        data() {

            return {
                checkNick: false,
                formItemLayout,
                formTailLayout,
                //上面是两个表单要用的样式
                form: this.$form.createForm(this, { name: 'dynamic_rule' }),
                //日期选择器要用
                dateFormat: 'YYYY/MM/DD',

            };
        },
        methods: {
            moment,
            selectedBirthday(dates, dateStrings){
                console.log('From: ', dates[0], ', to: ', dates[1]);
                console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
            },//获取到生日
            //日期要用
            ...mapMutations([
                'set_registeredMemberVisible'
            ]),
            //控制本组件显示与否
            check() {

            },
            handleChange(e) {
                this.checkNick = e.target.checked;
                this.$nextTick(() => {
                    this.form.validateFields(['nickname'], { force: true });
                });
            },
            //下面两个按钮的点击动作
            handleSubmit(e) {
                this.form.validateFields(err => {
                    if (!err) {
                        console.info('success');
                        this.set_registeredMemberVisible(false);
                    }
                });
                //上面是检查？？
                // this.set_registeredMemberVisible(false);
            },
            cancelRegist() {
                this.set_registeredMemberVisible(false);
            },

        },

        // 计算属性的 getter


    }
</script>

<style scoped>

</style>
