<template>
    <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch"
                style="padding-top: 30px; padding-bottom: 20px">
            <a-row :gutter="24" :style="{ display: 0 < count ? 'block' : 'none'}">
                <a-col :span="1"></a-col>
                <a-col
                        :span="7"
                >
                    <a-form-item v-bind="formItemLayout" label="城市">
                        <a-cascader
                                v-decorator="[
          'residence',
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
                </a-col>
                <a-col
                        :span="6"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="`间数`">
                        <a-input
                                v-decorator="[
                `rooms`,
                {
                  rules: [
                    {
                      required: true,
                      message: 'Input something!',
                    },
                  ],
                },
              ]"
                                placeholder="placeholder"
                        />
                    </a-form-item>
                </a-col>
                <a-col
                        :span="9"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="`入住退房日期`" style="margin-bottom:0;">
                        <a-form-item
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        >
                            <a-date-picker style="width: 100%"/>
                        </a-form-item>
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
      </span>
                        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">
                            <a-date-picker style="width: 100%"/>
                        </a-form-item>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24" :style="{ display: 1 < count ? 'block' : 'none'}">
                <a-col :span="1"></a-col>
                <a-col
                        :span="7"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="`价格区间`" style="margin-bottom:0;">
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
      </span>
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                    </a-form-item>
                </a-col>
                <a-col
                        :span="8"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="`评分区间`" style="margin-bottom:0;">
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
      </span>
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="筛选已预订酒店">
                        <a-radio-group v-decorator="['radio-button']">
                            <a-radio-button value="a">
                                已预订过酒店
                            </a-radio-button>
                            <a-radio-button value="b">
                                显示全部酒店
                            </a-radio-button>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24" :style="{ display: 2 < count ? 'block' : 'none'}">
                <a-col :span="1"></a-col>
                <a-col
                        :span="13"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="` 星级`">
                        <a-checkbox-group
                                v-decorator="['checkbox-group', { initialValue: ['A', 'B'] }]"
                                style="width: 100%; display: inline-block; padding-top: 10px"
                        >
                            <a-row>
                                <a-col :span="5">
                                    <a-checkbox value="A">
                                        五星级/豪华型
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="B">
                                        四星级/高档型
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="C">
                                        三星级/舒适性
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="D">
                                        二星级/快捷
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="4">
                                    <a-checkbox value="E">
                                        一星级
                                    </a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                    </a-form-item>
                </a-col>
                <a-col
                        :span="9"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
                    <a-form-item :label="`价格区间`" style="margin-bottom:0;">
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
      </span>
                        <a-input
                                placeholder="placeholder"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
            <a-row>
                <a-col :span="23" :style="{ textAlign: 'right' }">
                    <a-button type="primary" html-type="submit">
                        Search
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        Clear
                    </a-button>
                    <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                        Collapse
                        <a-icon :type="expand ? 'up' : 'down'"/>
                    </a>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
        </a-form>
        <div class="search-result-list">
            <hotelList/>
        </div>
    </div>
</template>
<script>
    import hotelList from "./new-hotelList";

    const residences = [
        {
            value: 'zhejiang',
            label: 'Zhejiang',
            children: [
                {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                        {
                            value: 'xihu',
                            label: 'West Lake',
                        },
                    ],
                },
            ],
        },
        {
            value: 'jiangsu',
            label: 'Jiangsu',
            children: [
                {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                        {
                            value: 'zhonghuamen',
                            label: 'Zhong Hua Men',
                        },
                    ],
                },
            ],
        },
    ];

    export default {
        components: {
            hotelList
        },
        data() {
            return {
                expand: false,
                // form: this.$form.createForm(this, {name: 'advanced_search'}),
                residences
            };
        },
        computed: {
            count() {
                return this.expand ? 10 : 2;
            },
        },
        updated() {
            console.log('updated');
        },
        methods: {
            handleSearch(e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    console.log('error', error);
                    console.log('Received values of form: ', values);
                });
            },

            handleReset() {
                this.form.resetFields();
            },

            toggle() {
                this.expand = !this.expand;
            },
        },
    };
</script>
<style>
    .ant-advanced-search-form {
        padding: 24px;
        background: #fbfbfb;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }

    .ant-advanced-search-form {
        padding-top: 100px;
    }

    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }



    #components-form-demo-advanced-search .ant-form {
        max-width: none;
    }

    #components-form-demo-advanced-search .search-result-list {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        /*text-align: center;*/
        padding-top: 35px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 40px;
    }



    /*#components-form-demo-advanced-search {*/
    /*    padding-top: 40px;*/
    /*}*/
</style>