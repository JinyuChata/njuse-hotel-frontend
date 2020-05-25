import { axios } from '@/utils/request'
const api = {
    orderPre: '/api/order'
}
export function reserveHotelAPI(data) {
    return axios({
        url: `${api.orderPre}/addOrder`,
        method: 'POST',
        data,
    })
}
export function getAllOrdersAPI() {
    return axios({
        url: `${api.orderPre}/getAllOrders`,
        method: 'GET',
    })
}
export function getUserOrdersAPI(data) {
    return axios({
        url: `${api.orderPre}/${data.userId}/getUserOrders`,
        method: 'GET',
    })
}
export function cancelOrderAPI(orderId) {
    return axios({
        url: `${api.orderPre}/${orderId}/annulOrder`,
        method: 'GET',
    })
}
export function deleteOrderAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/deleteOrder`,
        method: 'POST',
    })
}
export function checkInAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/checkin`,
        method: 'GET',
    })
}
export function checkOutAPI(id) {
    return axios({
        url: `${api.orderPre}/${id}/checkout`,
        method: 'GET',
    })
}

export function abnormalOrdersOfTheDayAPI(hotelId) {
    console.log(hotelId)
    return axios({
        url: `${api.orderPre}/${hotelId}/abnormalOrdersOfTheDay`,
        method: 'GET',
    })
}
