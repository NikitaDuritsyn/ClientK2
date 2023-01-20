import BaseApi from './BaseApi'

class KamekaApi extends BaseApi {
    getClients() {
        let url = `/api/get_clients`
        return this._request({
            method: 'get',
            url: url
        })
    }
}

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.MAIN_URL_KAMENKA2 : 'https://croospost.pro100quiz.ru'
const KamekaAPI = new KamekaApi(BASE_URL)
export default KamekaAPI