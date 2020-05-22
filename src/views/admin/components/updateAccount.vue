<template>
    <a-modal
            :visible="updateAccountVisible"
            title="更改信息"
            cancelText="取消"
            okText="确定"
            @cancel="cancel"
            @ok="handleSubmit"
            >
        <a-Form :form="form">
            <a-form-item v-bind="formItemLayout" label="用户名">
                <a-input
                        v-decorator="[
                        'username',
                        { rules: [{message: '请输入用户名', }] }
                    ]"
                />
            </a-form-item >
            <a-form-item v-bind="formItemLayout" label="密码">
                <a-input
                        v-decorator="[
                        'password',
                        { rules: [{required: true, message: '请输入密码', }] }
                    ]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="手机号">
                <a-input
                        v-decorator="[
                        'phonenumber',
                        { rules: [{message: '请输入手机号', }] }
                    ]"
                />
            </a-form-item>
        </a-Form>
    </a-modal>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'updateAccount',
        props:['id'],
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
            }
        },
        computed: {
            ...mapGetters([
                'updateAccountVisible',
                'managerList',
            ])
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'updateAccount' });
            setTimeout(() => {
                this.form.setFieldsValue({
                    'username': this.userInfo.userName,
                    'phonenumber': this.userInfo.phoneNumber,
                })
            }, 0)

        },
        mounted() {


        },
        methods: {
            ...mapMutations([
                'set_updateAccountVisible',
                'set_updateAccountParams',
            ]),
            ...mapActions([
                'getManagerList',
                'updateAccount',
            ]),

            cancel() {
                this.set_updateAccountVisible(false)
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFieldsAndScroll((err, values) => {
                    if (!err) {
                        const data = {
                            id: this.id,
                            userName: this.form.getFieldValue('username'),
                            password: this.form.getFieldValue('password'),
                            phoneNumber: this.form.getFieldValue('phonenumber')
                        }
                        this.updateAccount(data)
                    }
                });
                this.set_updateAccountVisible(false)

            },
        }
    }
</script>
