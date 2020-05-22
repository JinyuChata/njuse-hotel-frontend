import { axios } from '@/utils/request'
const api = {
    adminPre: '/api/admin'
}
export function getManagerListAPI(){
    return axios({
        url: `${api.adminPre}/getAllManagers`,
        method: 'POST'
    })
}
export function getClientListAPI(){
    return axios({
        url: `${api.adminPre}/getAllClients`,
        method: 'POST'
    })
}
export function getUnusualOrderListAPI(){
    return axios({
        url: `${api.adminPre}/getAllUnusualOrder`,
        method: 'POST'
    })
}
export function addManagerAPI(data) {
    return axios({
        url: `${api.adminPre}/addManager`,
        method: 'POST',
        data
    })
}
export function updateAccountAPI(data) {
    return axios({
        url: `${api.adminPre}/${data.id}/userInfo/update`,
        method: 'POST',
        data
    })
}

export function setAsMgrAPI(data) {
    return axios({
        url: `${api.adminPre}/${data.id}/hotelMgr/setAsMgr`,
        method: 'POST',
        data
    })
}
export function deleteAccountAPI(data) {
    return axios({
        url: `${api.adminPre}/deleteAccount/${data.id}`,
        method: 'POST',
  //      data
    })
}

