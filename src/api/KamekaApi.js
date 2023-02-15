import BaseApi from './BaseApi'

class KamekaApi extends BaseApi {

    getClients() {
        let url = `/api/get_clients`
        return this._request({
            url: url
        })
    }
    getRooms() {
        let url = `/api/get_rooms`
        return this._request({
            url: url
        })
    }
    getSessions() {
        let url = `/api/get_sessions`
        return this._request({
            url: url
        })
    }
    getSessionsByDays(days) {
        let url = `/api/get_sessions/${days}`
        return this._request({
            url: url
        })
    }
    getTarrifs() {
        let url = `/api/get_tariffs`
        return this._request({
            url: url
        })
    }
}

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.MAIN_URL_KAMENKA2 : 'https://croospost.pro100quiz.ru'
const KamekaAPI = new KamekaApi(BASE_URL)
export default KamekaAPI