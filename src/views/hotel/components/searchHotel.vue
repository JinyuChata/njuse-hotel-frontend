<template>
    <div id="components-form-demo-advanced-search">
        <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch"
                style="padding-top: 30px; padding-bottom: 20px">
            <a-row :gutter="24" :style="{ display: 0 < count ? 'block' : 'none'}">
                <a-col :span="1"></a-col>
                <a-col
                        :span="7"
                >
                    <a-form-item  label="城市">
                        <a-cascader
                                v-decorator="[
                          'address',
                          {
                            // initialValue: ['zhejiang', 'hangzhou', 'xihu'],
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
                'roomDemandCnt',
                {
                  rules: [
                    {
                      required: true,
                      message: '请选择预定房间数',
                    },
                  ],
                },
              ]"
                                placeholder="房间数"
                        />
                    </a-form-item>
                </a-col>
                <a-col
                        :span="9"
                        :style="{ display: 0 < count ? 'block' : 'none'}"
                >
<!--                    <a-form-item :label="`入住退房日期`" style="margin-bottom:0;">-->
<!--                        <a-form-item-->
<!--                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"-->
<!--                        >-->
<!--                            <a-date-picker style="width: 100%"/>-->
<!--                        </a-form-item>-->
<!--                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-->
<!--            - -->
<!--                      </span>-->
<!--                        <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }">-->
<!--                            <a-date-picker style="width: 100%"/>-->
<!--                        </a-form-item>-->
<!--                    </a-form-item>-->
                    <a-form-item label="入住时间" v-bind="formItemLayout" style="margin-left: 40px">
                        <a-range-picker @change="selectedDate"
                                        v-decorator="[
                          'roomdate',
                          {
                            rules: [
                              {  required: true },
                            ],
                          },
                        ]">
                            <a-icon slot="suffixIcon" type="calendar" />
                        </a-range-picker>
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
                                placeholder="最低"
                                v-decorator="['lowerPrice']"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
                       </span>
                        <a-input
                                v-decorator="['higherPrice']"
                                placeholder="最高"
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
                                placeholder="最低"
                                v-decorator="['lowerRate']"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">
        -
                      </span>
                        <a-input
                                placeholder="最高"
                                v-decorator="['higherRate']"
                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="筛选已预订酒店">
                        <a-radio-group v-decorator="['radio-button']">
                            <a-radio-button value="a">
                                预订过酒店
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
                                        五星级
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="B">
                                        四星级
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="C">
                                        三星级
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="5">
                                    <a-checkbox value="D">
                                        二星级
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
<!--                <a-col-->
<!--                        :span="9"-->
<!--                        :style="{ display: 0 < count ? 'block' : 'none'}"-->
<!--                >-->
<!--                    <a-form-item :label="`价格区间`" style="margin-bottom:0;">-->
<!--                        <a-input-->
<!--                                placeholder="placeholder"-->
<!--                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"-->
<!--                        />-->
<!--                        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-->
<!--        - -->
<!--      </span>-->
<!--                        <a-input-->
<!--                                placeholder="placeholder"-->
<!--                                :style="{ display: 'inline-block', width: 'calc(50% - 12px)' }"-->
<!--                        />-->
<!--                    </a-form-item>-->
<!--                </a-col>-->
            <a-col :span="1"></a-col>
            </a-row>
            <a-row>
                <a-col :span="23" :style="{ textAlign: 'right' }">
                    <a-button type="primary" html-type="submit" >
                        确定
                    </a-button>
                    <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                        清空条件
                    </a-button>
                    <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
                        {{ collapseText }}
                        <a-icon :type="expand ? 'up' : 'down'"/>
                    </a>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
        </a-form>
        <a-menu id="range-menu" v-model="current" mode="horizontal">
            <a-menu-item disabled style="cursor: default; color: rgba(0, 0, 0, 0.55) !important;">
                排序
            </a-menu-item>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper">
                <a-icon :type="sortIcon.comment"/>
                    评价
                </span>
                <a-menu-item-group title="排序方式">
                    <a-menu-item key="c_up" @click="onSortComment('up')">
                        <a-icon type="caret-up" />
                        升序
                    </a-menu-item>
                    <a-menu-item key="c_down" @click="onSortComment('down')">
                        <a-icon type="caret-down"/>
                        降序
                    </a-menu-item>
                    <a-menu-item key="c_none" @click="onSortComment('none')">
                        <a-icon type="undo"/>
                        清除排序
                    </a-menu-item>

                </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper">
                <a-icon :type="sortIcon.pop"/>
                    人气
                </span>
                <a-menu-item-group title="排序方式">
                    <a-menu-item key="p_up" @click="onSortPop('up')">
                        <a-icon type="caret-up" />
                        升序
                    </a-menu-item>
                    <a-menu-item key="p_down" @click="onSortPop('down')">
                        <a-icon type="caret-down"/>
                        降序
                    </a-menu-item>
                    <a-menu-item key="p_none" @click="onSortPop('none')">
                        <a-icon type="undo"/>
                        清除排序
                    </a-menu-item>

                </a-menu-item-group>
            </a-sub-menu>
            <a-sub-menu>
                <span slot="title" class="submenu-title-wrapper">
                <a-icon :type="sortIcon.star"/>
                    星级
                </span>
                <a-menu-item-group title="排序方式">
                    <a-menu-item key="s_up" @click="onSortStar('up')">
                        <a-icon type="caret-up" />
                        升序
                    </a-menu-item>
                    <a-menu-item key="s_down" @click="onSortStar('down')">
                        <a-icon type="caret-down"/>
                        降序
                    </a-menu-item>
                    <a-menu-item key="s_none" @click="onSortStar('none')">
                        <a-icon type="undo"/>
                        清除排序
                    </a-menu-item>

                </a-menu-item-group>
            </a-sub-menu>
        </a-menu>
        <div class="search-result-list">
            <hotelList/>
        </div>
    </div>
</template>
<script>
    import hotelList from "./hotelListForSearch";
    import { mapGetters, mapMutations, mapActions } from 'vuex'

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
                sort: {
                    // up down none
                    comment: 'none',
                    star: 'none',
                    pop: 'none',
                },
                current: ['mail'],
                expand: false,
                form: this.$form.createForm(this, {name: 'advanced_search'}),
                residences,
                roomdate:Array,
                stars:Array,
            };
        },
        computed: {
            sortIcon() {
                return {
                    comment: this.sort.comment === 'none' ? 'like' : ('caret-'+this.sort.comment),
                    star: this.sort.star === 'none' ? 'star' : ('caret-'+this.sort.star),
                    pop: this.sort.pop === 'none' ? 'solution' : ('caret-'+this.sort.pop),
                }
            },
            collapseText() {
                return this.expand ? '收起更多' : '展开更多';
            },
            count() {
                return this.expand ? 10 : 2;
            },
        },
        updated() {
            console.log('updated');
        },
        methods: {
            ...mapMutations([
                // mutations  this.$store.commit(xxx) mapMutations
                'set_searchedHotelList'
            ]),
            //通过排序直接修改state里面的数据从而完成排序显示
            ...mapActions([
                // addHotelCoupon：添加酒店策略接口
                //actions this.$store.dispatch(xxx)    mapActions
                'submitHotelSearchParams'
            ]),
            selectedDate(date, dateString){
                this.roomdate=dateString;
            },
            //上面是获取一下选择的日期
            onSortComment(actionProp) {
                this.sort.comment = actionProp;
            },
            onSortPop(actionProp) {
                this.sort.pop = actionProp;
            },
            onSortStar(actionProp) {
                this.sort.star = actionProp;
            },
            //排序先搁置：：目前既然酒店列表仅用来显示在这里，直接改变酒店state的数据就可！！
            handleSearch(e) {
                e.preventDefault();
                this.form.validateFields((error, values) => {
                    // console.log('error', error);
                    if (!error) {
                        const data = {
                            address: {
                                province:this.form.getFieldValue('address')[0],
                                city:this.form.getFieldValue('address')[1],
                                bizRegion:this.form.getFieldValue('address')[2],
                            },
                            roomDemandCnt: this.form.getFieldValue('roomDemandCnt'),
                            beginDate:this.roomdate[0],
                            endDate:this.roomdate[1],
                            lowerPrice: this.form.getFieldValue('lowerPrice')==""? null:this.form.getFieldValue('lowerPrice'),
                            higherPrice: this.form.getFieldValue('higherPrice')==""? null: this.form.getFieldValue('higherPrice'),
                            lowerRate:this.form.getFieldValue('lowerRate')==""?null:this.form.getFieldValue('lowerRate'),
                            higherRate:this.form.getFieldValue('higherRate')==""?null:this.form.getFieldValue('higherRate'),
                            stars:this.form.getFieldValue('checkbox-group'),
                        }
                        this.submitHotelSearchParams(data)
                        // console.log(data)
                        //在modules/hotel.js里面添加一个submitHotelSearchParams(data)
                        //api/hotel.js里面对应着会有一个submitHotelSearchParamsAPI(data)
                        //modules/hotel.js 里面set_searchedHotelList// 同时添加了一个 searchedHotelList
                        //getter里面有一条getter

                        // console.log('Received values of form: ', values);
                    }

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
        padding: 14px;
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

    #components-form-demo-advanced-search {
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

    .search-result-list {
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

    #range-menu {
        margin-top: 16px;
        border: 1px solid #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;

    }


    /*#components-form-demo-advanced-search {*/
    /*    padding-top: 40px;*/
    /*}*/
</style>