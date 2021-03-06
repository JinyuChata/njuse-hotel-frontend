import Vue from 'vue'
import router from '@/router'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { message } from 'ant-design-vue'
import {
    loginAPI,
    registerAPI,
    getUserInfoAPI,
    updateUserInfoAPI,
    investCreditAPI,
    creditAPI
} from '@/api/user'

import {
    getUserOrdersAPI,
    getCreditDataAPI,
    cancelOrderAPI,
} from '@/api/order'

// const getDefaultState = () => {
//     return {
//         userId: '',
//         userInfo: {
//
//         },
//         userOrderList: [
//
//         ]
//     }
// }
//原来state:getDefaultState  ()；
const user = {
    state : {
        userId: '',
        creditInfo:[],
        userInfo: {

        },
// private String email;
// private String password;
// private String userName;
// private String phoneNumber;
// private Double credit;
// private UserType userType;

// 要求加上 memberType：string 和isMember：bool
        userOrderList: [

        ],
        registeredMemberVisible: false,
//为了显示出来注册组件
    },

    mutations: {
        reset_state: function(state) {
            state.token = '';
            state.userId = '';
            state.userInfo = {

            };
            state.creditData=[];
            state.userOrderList = []
        },
        //改变注册会员是否显示
        set_registeredMemberVisible: function(state, data) {
            state.registeredMemberVisible = data
        },

        set_token: function(state, token){
            state.token = token
        },
        set_email: (state, data) => {
            state.email = data
        },
        set_userId: (state, data) => {
            state.userId = data
        },
        set_userInfo: (state, data) => {
            state.userInfo = {
                ...state.userInfo,
                ...data
            }
        },
        set_userOrderList: (state, data) => {
            state.userOrderList = data
        },
        set_creditInfo: (state, data) => {
            state.creditInfo = data
        },
    },

    actions: {
        login: async ({ dispatch, commit }, userData) => {
            const res = await loginAPI(userData)
            if(res){
                setToken(res.id)
                commit('set_userId', res.id)
                dispatch('getUserInfo')
                if(res.id==12){
                    router.push('/admin/manageUser')
                }
                else
                router.push('/hotel/hotelList')
            }
        },
        register: async({ commit }, data) => {
            const res = await registerAPI(data)
            if(res){
                message.success('注册成功')
            }
        },
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
              getUserInfoAPI(state.userId).then(response => {
                const data = response
                if (!data) {
                  reject('登录已过期，请重新登录')
                }
                commit('set_userInfo', data)
                commit('set_userId', data.id)
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
        },
        updateUserInfo: async({ state, dispatch }, data) => {
            const params = {
                id: state.userId,
                ...data,
            }
            const res = await updateUserInfoAPI(params)
            if(res){
                message.success('修改成功')
                dispatch('getUserInfo')
            }
        },
        getUserOrders: async({ state, commit }) => {
            const data = {
                userId: Number(state.userId)
            }
            const res = await getUserOrdersAPI(data)
            if(res){
                commit('set_userOrderList', res)
                console.log(state.userOrderList)
            }
        },
        getCreditInfo: async({ state, commit }) => {
            const data = {
                userId: Number(state.userId)
            }
            const res = await creditAPI(data.userId)
            if(res){
                console.log(res)
                commit('set_creditInfo', res)
            }
        },

        cancelOrder: async({ state, dispatch }, orderId) => {
            const res = await cancelOrderAPI(orderId)
            if(res) {
                dispatch('getUserOrders')
                message.success('撤销成功')
            }else{
                message.error('撤销失败')
            }
        },
        logout: async({ commit }) => {
            removeToken()
            resetRouter()
            commit('reset_state')
        },
          // remove token
        resetToken({ commit }) {
            return new Promise(resolve => {
                removeToken() // must remove  token  first
                commit('reset_state')
                resolve()
            })
        },
        investCredit: async({ state, dispatch }, data) => {
            const res = await investCreditAPI(data)
            if(res) {
                dispatch('getCreditInfo')
                message.success('充值成功')
            }else{
                message.error('充值失败')
            }
        },
    }
}

export default user
