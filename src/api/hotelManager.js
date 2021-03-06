import { axios } from '@/utils/request'
const api = {
    hotelPre: '/api/hotel'
}
export function addRoomAPI(data) {
    return axios({
        url: `${api.hotelPre}/roomInfo`,
        method: 'POST',
        data,
    })
}
export function addHotelAPI(data) {
    return axios({
        url: `${api.hotelPre}/addHotel`,
        method: 'POST',
        data,
    })
}
export function mgrHotelListAPI(id) {
    return axios({
        url: `/api/admin/${id}/hotelMgr/detail`,
        method: 'GET',
    })
}
export function submitManageHotelParamsAPI(data){
    return axios({
        url: `${api.hotelPre}/update`,
        method: 'POST',
        data,
    })
}
