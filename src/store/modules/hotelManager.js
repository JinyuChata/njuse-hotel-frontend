import {
    addRoomAPI,
    addHotelAPI,
    mgrHotelListAPI,
    submitManageHotelParamsAPI
} from '@/api/hotelManager'
import {
    managedOrdersAPI
} from '@/api/hotel'
import {
    getAllOrdersAPI,
    deleteOrderAPI,
    checkInAPI,
    checkOutAPI,
    abnormalOrdersOfTheDayAPI,

} from '@/api/order'
import {
    hotelAllCouponsAPI,
    hotelTargetMoneyAPI,
    hotelFestivalAPI,
} from '@/api/coupon'
import { message } from 'ant-design-vue'

const hotelManager = {
    state: {
        unusualOrderList:[],
        managedOrders:[],
        mgrHotelList:[],
        orderList: [],
        // addHotelParams: {
        //     name: '',
        //     address: '',
        //     bizRegion:'XiDan',
        //     hotelStar:'',
        //     rate: 0,
        //     description:'',
        //     phoneNum:'',
        //     managerId:'',
        // },
        addHotelModalVisible: false,
        manageRoomVisible: true,
        addRoomParams: {
            roomType: '',
            hotelId: '',
            price: '',
            total: 0,
            curNum: 0,
        },
        addRoomModalVisible: false,
        couponVisible: false,
        addCouponVisible: false,
        unusualOrderVisible: false,
        manageHotelVisible: false,
        activeHotelId: 0,
        couponList: [],
    },
    mutations: {
        set_managedOrders: function(state, data) {
            state.managedOrders = data
        },
        set_orderList: function(state, data) {
            state.orderList = data
        },
        set_mgrHotelList: function(state, data) {
            state.mgrHotelList = data
        },
        set_addHotelModalVisible: function(state, data) {
            state.addHotelModalVisible = data
            console.log("Visible")
        },
        set_manageRoomVisible: function(state, data) {
            state.manageRoomVisible = data
        },
        set_unusualOrderVisible: function(state, data) {
            state.unusualOrderVisible = data

        },
        set_addHotelParams: function(state, data) {
            state.addHotelParams = {
                ...state.addHotelParams,
                ...data,
            }
        },
        set_addRoomModalVisible: function(state, data) {
            state.addRoomModalVisible = data
        },
        set_addRoomParams: function(state, data) {
            state.addRoomParams = {
                ...state.addRoomParams,
                ...data,
            }
        },
        set_couponVisible: function(state, data) {
            state.couponVisible = data
        },
        set_activeHotelId: function(state, data) {
            state.activeHotelId = data
        },
        set_couponList: function(state, data) {
            state.couponList = data
        },
        set_addCouponVisible: function(state, data) {
            state.addCouponVisible =data
        },
        set_unusualOrderList: (state, data) => {
            state.unusualOrderList = data
            console.log(state.unusualOrderList)
        },
        set_manageHotelVisible: function (state, data) {
            state.manageHotelVisible = data;
        }
    },
    actions: {
        getAllOrders: async({ state, commit }) => {
            const res = await getAllOrdersAPI()
            if(res){
                commit('set_orderList', res)
            }
        },
        getUnusualOrderList: async({ state,commit },id) => {
            console.log(id)
            const res = await abnormalOrdersOfTheDayAPI(id)
            if(res){
                commit('set_unusualOrderList', res)
            }
        },
        addHotel: async({ state, commit,dispatch},data) => {
            const res = await addHotelAPI(data)
            if(res){
                dispatch('getHotelList')
                // commit('set_addHotelParams', {
                //     name: '',
                //     address: '',
                //     bizRegion:'XiDan',
                //     hotelStar:'',
                //     rate: 0,
                //     description:'',
                //     phoneNum:'',
                //     managerId:'',
                // })
                commit('set_addHotelModalVisible', false)
                message.success('添加成功')
            }else{
                message.error('添加失败')
            }
        },
        addRoom: async({ state, dispatch, commit }) => {
            const res = await addRoomAPI(state.addRoomParams)
            console.log(state.addRoomParams.roomTime)
            if(res){
                commit('set_addRoomModalVisible', false)
                commit('set_addRoomParams', {
                    roomType: '',
                    hotelId: '',
                    price: '',
                    total: 0,
                    curNum: 0,
                })
                message.success('添加成功');
            }else{
                message.error('添加失败');
            }
        },
        getHotelCoupon: async({ state, commit }) => {
            const res = await hotelAllCouponsAPI(state.activeHotelId)
            if(res) {
                // 获取到酒店策略之后的操作（将获取到的数组赋值给couponList）
                commit('set_couponList', res)
            }
        },
        addHotelCoupon: async({ commit, dispatch }, data) => {
            // console.log(data);
            // console.log('优惠券类型')
            // console.log(data.type)
            let res={};
            if(data.type==3){
                 res= await hotelTargetMoneyAPI(data);
            }else if(data.type==4){
                // console.log('zhiixingl')
                 res= await hotelFestivalAPI(data);
            }else {
                // console.log('zhiixingl')
                 res= await hotelFestivalAPI(data);
            }
            if(res){
                // 添加成功后的操作（提示文案、modal框显示与关闭，调用优惠列表策略等）
                dispatch('getHotelCoupon');
                commit('set_addCouponVisible', false);
                commit('set_couponVisible',true);
                message.success('添加优惠劵成功');
            }else{
                // 添加失败后的操作
                commit('set_addCouponVisible', false);
                commit('set_couponVisible',true);
                message.error('添加失败');
            }
        },
        deleteOrder: async({ state, dispatch }, id) => {
            //console.log(id)
            const res = await deleteOrderAPI(id)
            if(res){
                message.success('删除成功')
                dispatch('getAllOrders')
            }
        },
        getMgrHotelList: async({ state, commit }, id) => {
            //console.log(id)
            const res = await mgrHotelListAPI(id)
            if(res){
                commit('set_mgrHotelList', res)
            }
        },
        getManagedOrders: async({ state, commit }, id) => {
            console.log(id)
            const res = await managedOrdersAPI(id)
            if(res){
                commit('set_managedOrders', res)
            }
        },
        checkIn:async({ state, dispatch }, id) => {
            const res = await checkInAPI(id)
            if (res) {
                message.success('入住成功')
                dispatch('getManageOrders')
            }
        },
        //提交酒店维护信息
        submitManageHotelParams:async({ commit, dispatch }, data) => {

            const res = await submitManageHotelParamsAPI(data)
            // console.log('修改失败')
            // console.log(res)
            if(res){//我很好奇请求成功以后会发什么回来？
                dispatch('getMgrHotelList')//应该是获取所有的酒店
                console.log('执行了这部分')
                commit('set_manageHotelVisible', false);
                message.success('修改成功')
            }else {
                message.error('修改失败');
            }
        },
        checkOut:async({ state, dispatch }, id) => {
            const res = await checkOutAPI(id)
            if(res){
                message.success('退房成功')
                dispatch('getManageOrders')
            }
        }
    }
}
export default hotelManager
