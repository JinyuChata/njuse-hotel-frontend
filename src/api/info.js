import { axios } from '@/utils/request'

const api = {
    locPre: '/api/loc'
}

export function getResidentsAPI() {
    return axios({
        url: `${api.locPre}/all`,
        method: 'get',
    })
}
