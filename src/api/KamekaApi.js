import BaseApi from './BaseApi'

class KamekaApi extends BaseApi {
    getSession(sessionId) {
        let url = `/api/get_session/${sessionId}`
        return this._request({ url: url })
    }
    getUsers() {
        let url = `/api/users`
        return this._request({ url: url })
    }
    getVisitors() {
        let url = `/api/get_visitors`
        return this._request({ url: url })
    }
    getVisitorsBySession(session_id) {
        let url = `/api/get_visitors/${session_id}`
        return this._request({ url: url })
    }
    getRooms() {
        let url = `/api/get_rooms`
        return this._request({ url: url })
    }
    getRoles() {
        let url = `/api/roles`
        return this._request({ url: url })
    }
    getSessions() {
        let url = `/api/get_sessions`
        return this._request({ url: url })
    }
    getSessionsByDays(days) {
        let url = `/api/get_sessions/${days}`
        return this._request({ url: url })
    }
    getTarrifs() {
        let url = `/api/get_tariffs`
        return this._request({ url: url })
    }
    getServices() {
        let url = `/api/get_services`
        return this._request({ url: url })
    }
    getPaymentTypes() {
        let url = `/api/get_payment_types`
        return this._request({ url: url })
    }
    getTodos() {
        let url = `/api/get_todos`
        return this._request({ url: url })
    }
    getCategoriesInventory() {
        let url = `/api/categories`
        return this._request({ url: url })
    }
    getInventorySubCategoriesByCategoryId(categoryId) {
        let url = `/api/sub_categories/${categoryId}`
        return this._request({ url: url })
    }
    getInventorySubCategories() {
        let url = `/api/sub_categories`
        return this._request({ url: url })
    }
    getProducts() {
        let url = `/api/products`
        return this._request({ url: url })
    }
    getProductsByCategoryId(categoryId) {
        let url = `/api/products_by_category/${categoryId}`
        return this._request({ url: url })
    }
    getProductsBySubCategoryId(subCategoryId) {
        let url = `/api/products_by_sub_category/${subCategoryId}`
        return this._request({ url: url })
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
    createUser(data) {
        let url = `/api/create_user`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    updateTodo(data) {
        let url = `/api/update_todo/${data.id}`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    updateUser(data) {
        let url = `/api/update_user/${data.id}`
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
        return this._request({ url: url })

    }
    updateEndTimeSession(sessionId) {
        let url = `/api/update_end_time_session/${sessionId}`
        return this._request({ url: url })

    }

    //deletes
    deleteUser(userId) {
        let url = `/api/delete_user/${userId}`
        return this._request({
            method: 'delete',
            url: url,
        })
    }
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



    ///////////
    // Rooms //
    ///////////
    getRooms() {
        let url = `/api/get_rooms`
        return this._request({
            method: 'get',
            url: url
        })
    }
    createRoom(data) {
        let url = `/api/create_room`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    deleteRoom(item_id) {
        let url = `/api/delete_room/${item_id}`
        return this._request({
            method: 'delete',
            url: url
        })
    }
    
    /////////////
    // Tariffs //
    /////////////
    getTariffs() {
        let url = `/api/get_tariffs`
        return this._request({
            method: 'get',
            url: url
        })
    }
    createTariff(data) {
        let url = `/api/create_tariff`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    deleteTariff(item_id) {
        let url = `/api/delete_tariff/${item_id}`
        return this._request({
            method: 'delete',
            url: url
        })
    }
    
    //////////////
    // Services //
    //////////////
    createService(data) {
        let url = `/api/create_service`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    deleteService(item_id) {
        let url = `/api/delete_service/${item_id}`
        return this._request({
            method: 'delete',
            url: url
        })
    }
    
    //////////////
    // Services //
    //////////////
    createPaymentType(data) {
        let url = `/api/create_payment_type`
        return this._request({
            method: 'post',
            url: url,
            data: data
        })
    }
    deletePaymentType(item_id) {
        let url = `/api/delete_payment_type/${item_id}`
        return this._request({
            method: 'delete',
            url: url
        })
    }

    

}
// MAIN_URL_KAMENKA2 = http://127.0.0.1:1234

const BASE_URL = process.env.NODE_ENV === 'development' ? process.env.MAIN_URL_KAMENKA2 : 'http://127.0.0.1:1234' || process.env.MAIN_URL_KAMENKA2
const KamekaAPI = new KamekaApi(BASE_URL)
export default KamekaAPI