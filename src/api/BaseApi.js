import axios from 'axios'
import store from '@/store'
class BaseApi {
    constructor(BASE_URL = "") {
        this.BASE_URL = BASE_URL
    }
    _request(params) {
        if (!params.method) params.method = 'get'
        if (store.state.authToken) params.headers = { 'Authorization': `Token ${store.state.authToken}` }
        params.baseURL = this.BASE_URL
        return new Promise((resolve, reject) => {
            axios(params)
                .then(res => resolve(res.data))
                .catch(err => {
                    console.error(err)
                    let errMessage = null
                    if (err.response) {
                        if (err.response.data.detail) {
                            errMessage = err.response.data.detail
                        }
                        // if (err.response.status === 401) {
                        //     store.dispatch('LOGOUT')
                        // }
                    }
                    if (!errMessage) {
                        errMessage = err.toString()
                    }
                    toast.error(errMessage)
                    reject(err)
                })
        })
    }
}
export default BaseApi