import BaseApi from './BaseApi'

class KamekaApi extends BaseApi {
    updateTodo(data) {
        let url = `/api/update_todo/${data.id}`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    updateSession(data) {
        let url = `/api/update_session/${data.id}`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    createVisitorsDeposits(data) {
        let url = `/api/create_visitors_deposits`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    createSomeVisitors(data) {
        let url = `/api/create_some_visitors`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }

    updateVisitors(visitorUpdateData, visitorsId) {
        let url = `/api/update_visitors`
        return this._request({
            method: 'post',
            url: url,
            data: { visitorUpdateData, visitorsId: visitorsId }
        })
    }
    useDeponents(data) {
        let url = `/api/use_deponent`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    createVisitorDeposits(data) {
        let url = `/api/create_visitor_deposits`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    createVisitorService(visitorService) {
        let url = `/api/create_visitor_service`
        return this._request({
            method: 'post',
            url: url,
            data: visitorService
        })
    }
    createBookingSession(session) {
        let url = `/api/create_session`
        return this._request({
            method: 'post',
            url: url,
            data: session
        })
    }
    createVisitor(visitor, session_id) {
        let url = `/api/create_visitor/${session_id}`
        return this._request({
            method: 'post',
            url: url,
            data: visitor
        })
    }
    getVisitorsServices(visitorsId) {
        let url = `/api/visitors_services`
        return this._request({
            method: 'post',
            url: url,
            data: visitorsId
        })
    }
    getVisitorsDeposit(visitorsId) {
        let url = `/api/visitors_deposits`
        return this._request({
            method: 'post',
            url: url,
            data: visitorsId
        })
    }
    getVisitorsDeponent(visitorsId) {
        let url = `/api/visitors_deponents`
        return this._request({
            method: 'post',
            url: url,
            data: visitorsId
        })
    }
    updateStartTimeVisitors(data) {
        let url = `/api/update_visitors`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })

    }
    updateEndTimeVisitors(data) {
        let url = `/api/update_visitors`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    updateStartTimeSession(sessionId) {
        let url = `/api/update_start_time_session/${sessionId}`
        return this._request({
            url: url,
        })

    }
    updateEndTimeSession(sessionId) {
        let url = `/api/update_end_time_session/${sessionId}`
        return this._request({
            url: url,
        })

    }

    getSession(sessionId) {
        let url = `/api/get_session/${sessionId}`
        return this._request({
            url: url
        })
    }
    getVisitors() {
        let url = `/api/get_visitors`
        return this._request({
            url: url
        })
    }
    getVisitorsBySession(session_id) {
        let url = `/api/get_visitors/${session_id}`
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
    getServices() {
        let url = `/api/get_services`
        return this._request({
            url: url
        })
    }
    getPaymentTypes() {
        let url = `/api/get_payment_types`
        return this._request({
            url: url
        })
    }
    getTodos() {
        let url = `/api/get_todos`
        return this._request({
            url: url
        })
    }
    //deletes
    deleteVisitorService(serviceId) {
        let url = `/api/delete_visitor_service/${serviceId}`
        return this._request({
            method: 'delete',
            url: url,
        })
    }
    deleteVisitorById(visitorId) {
        let url = `/api/delete_visitor/${visitorId}`
        return this._request({
            method: 'delete',
            url: url,
        })
    }
}

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.MAIN_URL_KAMENKA2 : 'https://croospost.pro100quiz.ru'
const KamekaAPI = new KamekaApi(BASE_URL)
export default KamekaAPI