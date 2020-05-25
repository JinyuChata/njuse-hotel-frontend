import {
    getManagerListAPI,
    addManagerAPI,
    updateAccountAPI,
    getUnusualOrderListAPI,
    deleteAccountAPI,
    getClientListAPI,
    bindManagerAPI
} from '@/api/admin'

import { message } from 'ant-design-vue'

const admin = {
    state: {
        managerList: [

        ],
        clientList:[

        ],
        addManagerModalVisible: false,
        updateAccountVisible:false,
        addManagerParams: {
            email:'',
            password:''
        },

    },
    mutations: {
        set_managerList: function(state, data) {
            state.managerList = data
        },
        set_clientList: function(state, data) {
            state.clientList = data
        },
        set_addManagerModalVisible: function(state, data) {
            state.addManagerModalVisible = data
        },
        set_updateAccountVisible: function(state, data) {
            state.updateAccountVisible = data
        },
        set_addManagerParams: function(state, data) {
            state.addManagerParams = {
                ...state.addManagerParams,
                ...data,
            }
        },
        set_updateAccountParams: function(state, data) {
            state.updateAccountParams = {
                ...state.updateAccountParams,
                ...data,
            }
        },

    },
    actions: {
        getManagerList: async({ commit }) => {
            const res = await getManagerListAPI()
            // console.log(res)
            if(res){
                commit('set_managerList', res)
            }
        },
        getClientList: async({ commit }) => {
            const res = await getClientListAPI()
            // console.log(res)
            if(res){
                commit('set_clientList', res)
            }
        },

        addManager: async({ state, commit, dispatch }) => {
            const res = await addManagerAPI(state.addManagerParams)
            if(res) {
                commit('set_addManagerParams',{
                    email:'',
                    password:''
                })
                commit('set_addManagerModalVisible', false)
                message.success('添加成功')
                dispatch('getManagerList')
            }else{
                message.error('添加失败')
            }
        },
        updateAccount: async({ state, dispatch }, data) => {
            //console.log(data)
            const res = await updateAccountAPI(data)
            if(res){
                message.success('修改成功')
                dispatch('getManagerList')
            }
        },
        deleteAccount: async({ state, dispatch }, id) => {
            const res = await deleteAccountAPI(id)
            if(res){
                message.success('删除成功')
                dispatch('getClientList')
                dispatch('getManagerList')
            }
        },

        bindManager: async({ state, dispatch }, data) => {

            const res = await bindManagerAPI(data)
            if(res){
                message.success('绑定成功')
                dispatch('getHotelList')
            }
        },

    }
}
export default admin
