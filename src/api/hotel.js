import { axios } from '@/utils/request'
const api = {
    hotelPre: '/api/hotel'
}
export function getHotelsAPI() {
    return axios({
        url: `${api.hotelPre}/all`,
        method: 'get',
    })
}
export function getHotelByIdAPI(param) {
    return axios({
        url: `${api.hotelPre}/${param.hotelId}/detail`,
        method: 'GET',
    })
}

export function managedOrdersAPI(id) {
    return axios({
        url: `${api.hotelPre}/${id}/managedOrders`,
        method: 'GET',
    })
}

//发送酒店搜索的请求
export function submitHotelSearchParamsAPI(params){
    return axios({
        url: `${api.hotelPre}/hotel_search/detail`,
        method: 'POST',
        params,
    })
}
//不知道为啥，拦截不了这里的axios默认发8080干
//添加用户评论
// export function getUserCommentAPI(){
//     return axios.get('/mapi/userReview.json');
// }
//后期请求改成对GET /api/hotel/{hotelId}/UserComment！！！
