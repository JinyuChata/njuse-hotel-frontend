import { message } from 'ant-design-vue'
import store from '@/store'
import Vue from 'vue'
import {
    getHotelsAPI,
    getHotelByIdAPI,
    //
    getUserCommentAPI,
    submitHotelSearchParamsAPI
} from '@/api/hotel'
import {
    reserveHotelAPI
} from '@/api/order'
import {
    orderMatchCouponsAPI,
} from '@/api/coupon'

const hotel = {
    state: {

        hotelList: [

        ],
        hotelListParams: {
            pageNo: 0,
            pageSize: 12
        },
        hotelListLoading: true,
        currentHotelId: '',
        currentHotelInfo: {

        },
        orderModalVisible: false,
        currentOrderRoom: {

        },
        orderMatchCouponList: [
        ],
        //下面三个是酒店列表使用的
        searchedHotelList:[
        ],
        userComment:[
        ],
      //暂且先扔到这里，设置酒店位置也要用
        // //添加用户评论！！！
        // userComment:[],
    },
    mutations: {
        set_hotelList: function(state, data) {
            state.hotelList = data
        },
        set_hotelListParams: function(state, data) {
            state.hotelListParams = {
                ...state.hotelListParams,
                ...data,
            }
        },
        set_hotelListLoading: function(state, data) {
            state.hotelListLoading = data
        },
        set_currentHotelId: function(state, data) {
            state.currentHotelId = data
        },
        set_currentHotelInfo: function(state, data) {
            state.currentHotelInfo = {
                ...state.currentHotelInfo,
                ...data,
            }
        },
        set_orderModalVisible: function(state, data) {
            state.orderModalVisible = data
        },
        set_currentOrderRoom: function(state, data) {
            state.currentOrderRoom = {
                ...state.currentOrderRoom,
                ...data,
            }
        },
        set_orderMatchCouponList: function(state, data) {
            state.orderMatchCouponList = data
        },
        //搜索酒店后的设置
        set_searchedHotelList:function (state , data) {
            // state.searchedHotelList=data
            console.log("HHHHHH", data)
            Vue.set(state, 'searchedHotelList', data);
        },
    //    添加用户评论
        set_userComment: function (state,data) {
            state.userComment=data;
        }
    },

    actions: {
        getHotelList: async({commit, state}) => {
            const res = await getHotelsAPI()
            console.log(res)
            if(res){
                commit('set_hotelList', res)
                commit('set_hotelListLoading', false)
            }
        },
        getHotelById: async({commit, state}) => {
            const res = await getHotelByIdAPI({
                hotelId: state.currentHotelId
            })
            if(res){
                commit('set_currentHotelInfo', res)
            }
        },
        // 添加用户评论
        getUserComment: async({commit, state},id) => {
            // console.log('发出了请求')
            const res = await getUserCommentAPI(id);
            // console.log(res)
            if(res){
                commit('set_userComment', res)
            }
        },

        addOrder: async({ state, commit }, data) => {
            const res = await reserveHotelAPI(data)
            console.log(res)
            if(res){
                message.success('预定成功')
                commit('set_orderModalVisible', false)
            }
        },
        getOrderMatchCoupons: async({ state, commit }, data) => {
            const res = await orderMatchCouponsAPI(data)
            if(res){
                commit('set_orderMatchCouponList', res)
            }
        },
        submitHotelSearchParams:async({ state, commit }, data) =>{
            const res=await submitHotelSearchParamsAPI(data)
            if(res){
                console.log("res::::::")
                console.log(res)
                commit('set_searchedHotelList',res)
            }else {
                console.log("搜索失败")
            //    错误信息以后再说
            }
        }

        // bindManager: async({ state, commit }, data) => {
        //     const res = await orderMatchCouponsAPI(data)
        //     if(res){
        //         commit('', res)
        //     }
        // }

    }
}

export default hotel
