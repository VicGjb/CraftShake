import axios from 'axios';

let baseURL = 'http://127.0.0.1:8000/api/';

export class NetworkManager{
	
	constructor(
	){
		this.access_token = localStorage.getItem('access_token')
		this.refresh_token = localStorage.getItem('refresh_token')
		this.axiosInstance = axios.create({
			baseURL: 'http://127.0.0.1:8000/api/',
			timeout: 5000,
			headers: {
				Authorization: this.access_token
					? 'JWT ' + this.access_token
					: null,
				'Content-Type': 'application/json',
				accept: 'application/json',
			}, 
		});
		this.SetUpInterceptorRequest()
		this.SetUpInterceptorsResponse()

	}
		

	// Set Up AXIOS
	SetUpInterceptorRequest(){
		let axiosInstance = this.axiosInstance
		let access_token = this.access_token
		let refresh_token = this.refresh_token
		
		return(
			axiosInstance.interceptors.request.use(
				async (request)=>{	
					if(access_token){
						let access_token_data = JSON.parse(atob(access_token.split('.')[1]));
						let now = Math.ceil(Date.now() / 1000);
			
						if (access_token_data.exp<now && request.url!='/token/refresh/') {
							await axiosInstance
								.post('/token/refresh/', { refresh: refresh_token})
								.then((response) => {
									console.log(response)
									localStorage.setItem('access_token', response.data.access);
									localStorage.setItem('refresh_token', response.data.refresh);
									access_token = localStorage.getItem('access_token')
									refresh_token = localStorage.getItem('refresh_token')
									return response
								})
								request.headers.Authorization = localStorage.getItem('access_token')
									? 'JWT ' + localStorage.getItem('access_token')
									: null
									return request
						} else {
							return request
						} 
					} else {
						return request
					}
				}	
			)
		)
	}


	SetUpInterceptorsResponse(){
		let axiosInstance = this.axiosInstance
		let refresh_token = this.refresh_token
		return(
			axiosInstance.interceptors.response.use(
				(response) => {
					return response;
				},
				async function (error) {
					const originalRequest = error.config;
					if (typeof error.response === 'undefined') {
						alert(
							'A server/network error occurred. ' +
								'Looks like CORS might be the problem. ' +
								'Sorry about this - we will get it fixed shortly. hui'
						);
						return Promise.reject(error);
					}
			
					if (error.response){
						if (error.response.status === 401 && !originalRequest._retry){
							originalRequest._retry = true;
			
							if (
								error.response.status === 401 &&
								originalRequest.url === baseURL + 'token/refresh/'
							) {
								window.location.href = '/login/';
								return Promise.reject(error);
							}
					
							if (
								error.response.data.code === 'token_not_valid' &&
								error.response.status === 401 &&
								error.response.statusText === 'Unauthorized'
							) {
												
								if (refresh_token) {
									const refresh_token_data = JSON.parse(atob(refresh_token.split('.')[1]));
					
									// exp date in token is expressed in seconds, while now() returns milliseconds:
									const now = Math.ceil(Date.now() / 1000);
									console.log(refresh_token_data.exp);
					
									if (refresh_token_data.exp < now) {
										console.log('Refresh token is expired', refresh_token_data.exp, now);
										window.location.href = '/login/';
									}
								} else {
									console.log('Refresh token not available.');
									window.location.href = '/login/';
								}
							}				
						}
					}
					// specific error handling done elsewhere
					return Promise.reject(error);
				}
			)
		)
	}


	// Product
	async create_product(form){
		return this.axiosInstance
			.post(`counter/product/create/`,form)
			.then(response => {
				return response
			})
	}


	async get_product_list(){
		return this.axiosInstance
			.get('counter/product/')
			.then(response =>{
				return response.data.results
			})
	}
	async get_products_by_name(name){
		return this.axiosInstance
			.get(`counter/product/by-name/${name}`)
			.then(response=>{
				return response.data.results
		})

	}
	async get_product_detaile(productId){
		return this.axiosInstance
			.get(`counter/product/${productId}`)
			.then(response =>{
				return response.data
			})
	}

	async delete_product(productId){
		return this.axiosInstance
			.post(`counter/product/${productId}/delete`)
			.then(response => {
				return response
			})
	}
	async change_product(productId, form){
		return this.axiosInstance
		.post(`counter/product/update/${productId}`, form)
		.then(response =>{
			return response
		})
	}

	async upload_photo_product(productId, uploadData){
		return this.axiosInstance
		.post(`counter/product/upload-photo/${productId}`, uploadData,{
			headers: {
				"Content-type": "multipart/form-data",
			  },
		})
		.then(response =>{
			return response
		})
	}

	async search_product(name){
		return this.axiosInstance
		.get(`counter/product/?name=${name}`)
		.then(response =>{
			return response.data.results
		})
	}


	// Place
	async create_place(form){
		return this.axiosInstance
			.post(`counter/place/create/`,form)
			.then(response => {
				return response
			})
	}
	
	async get_place_list(){
		return this.axiosInstance
			.get('counter/places/')
			.then(response =>{
				return response.data.results
			})
	}

	async get_place_detaile(placeId){
		return this.axiosInstance
			.get(`counter/place/${placeId}`)
			.then(response =>{
				return response.data
			})
	}

	async get_place_by_user_id(userId){
		console.log('Axios ',userId)
		return this.axiosInstance
			.get(`counter/places/?users=${userId}`)
			.then(response =>{
				return response.data.results[0]
			})
	}	

	async delete_place(placeId){
		return this.axiosInstance
			.post(`counter/place/delete/${placeId}`)
			.then(response => {
				return response
			})
	}

	async change_place(placeId, form){
		return this.axiosInstance
		.post(`counter/place/update/${placeId}`, form)
		.then(response => {
			return response
		})
	}


	//Orders
	async create_order(form){
		return this.axiosInstance
			.post(`counter/order/create/`,form)
			.then(response => {
				return response
			})
	}

	async delete_order(orderId){
		return this.axiosInstance
			.post(`counter/order/${orderId}/delete/`)
			.then(response=>{
				return response
			})
	}

	async update_order_total(orderId, total_sum){
		return this.axiosInstance
			.post(`counter/order/update/${orderId}/`, total_sum)
			.then(response=>{
				return response
			})
	}


	async get_orders_list(placeId){
		return this.axiosInstance
			.get(`counter/order/?place=${placeId}`)
			.then(response =>{
				return response.data.results
			})
	}
	
	async search_order(placeId, date_from, date_to){
		return this.axiosInstance
			.get(`counter/order/?place=${placeId}&date_after=${date_from}&date_before=${date_to}`)
			.then(response =>{
				return response.data.results
			})
	}

	async get_order_detaile(orderId){
		return this.axiosInstance
			.get(`counter/order/${orderId}/`)
			.then (response =>{
				return response.data
			})
		}

	//Order_item 
	async create_order_item(order_item){
		return this.axiosInstance
			.post(`counter/order-item/create/`,order_item)
			.then(response=>{
				return response
			})
	}

	async delete_order_item(itemId){
		return this.axiosInstance
			.post(`counter/order-item/${itemId}/delete/`)
			.then(response => {
				return response
			})
	}

	async get_order_item_volume_list(){
		return this.axiosInstance
			.post(`counter/order-item-volume/`)
			.then(response =>{
				return response.data.results
			})
	}


	// Menu
	async create_menu(form){
		return this.axiosInstance
			.post(`counter/menu/create/`,form)
			.then(response => {
				return response
			})
	}

	async delete_menu(menuId){
		return this.axiosInstance
			.post(`counter/menu/delete/${menuId}/`)
			.then(response => {
				return response
			})
	}

	async update_menu(menuId, form){
		// console.log('network_manager curren menu', {'data':form})
		return this.axiosInstance
			.post(`counter/menu/update/${menuId}`,form)
			.then(response => {
				// console.log('network',response)
				return response
			})
	}

	async get_menus_list(placeId){
		return this.axiosInstance
			.get(`counter/menu/?place=${placeId}`)
			.then(response=>{
				return response.data.results
			})
	}


	async get_menu_detaile(menuId){
		return this.axiosInstance
			.get(`counter/menu/${menuId}/`)
			.then (response =>{
				return response.data
			})
		}

	// Menu_position
	async create_menu_position(form){
		return this.axiosInstance
			.post(`counter/menu-position/create/`,form)
			.then(response => {
				return response
			})
	}

	async delete_menu_position(positionId){
		return this.axiosInstance
			.post(`counter/menu-position/delete/${positionId}/`)
			.then(response => {
				return response
			})
	}

	async get_menu_positions_list(menuId){
		return this.axiosInstance
			.get(`counter/menu-position/?menu=${menuId}`)
			.then(response =>{
				return response.data.results
			})
	}
	
	// Managers
	async create_manager(form){
		return this.axiosInstance
			.post(`counter/manager/create/`,form)
			.then(response => {
				return response
			})
	}

	async delete_manager(managerId){
		return this.axiosInstance
			.post(`counter/manager/delete/${managerId}`)
			.then(response => {
				return response
			})
	}


	async get_managers_list(placeId){
		return this.axiosInstance
			.get(`counter/manager/?place=${placeId}`)
			.then(response=>{
				return response.data.results
			})
	}


	//Invoice
	async create_invoice(form){
		return this.axiosInstance
			.post(`counter/invoice/create/`,form)
			.then(response => {
				return response
			})
	}

	async delete_invoice(invoiceId){
		return this.axiosInstance
			.post(`counter/invoice/delete/${invoiceId}/`)
			.then(response => {
				return response
			})
	}

	async update_invoice(invoiceId, form){
		console.log('form',form)
		return this.axiosInstance
			.post(`counter/invoice/update/${invoiceId}/`, form)
			.then(response => {
				return response
			})
	}	

	async get_invoice_list(placeId){
		return this.axiosInstance
			.get(`counter/invoice/?place=${placeId}`)
			.then(response =>{
				return response.data.results
			})
	}

	async search_invoice(placeId, date_from, date_to){
		return this.axiosInstance
			.get(`counter/invoice/?place=${placeId}&date_after=${date_from}&date_before=${date_to}`)
			.then(response =>{
				return response.data.results
			})
	}

	async change_invoice(placeId, date_from, date_to){
		return this.axiosInstance
		.post(`counter/order/?place=${placeId}&date_after=${date_from}&date_before=${date_to}`)
		.then(response => {
			return response
		})
	}

	async change_invoice_state(invoiceId, form){
		return this.axiosInstance
			.post(`counter/invoice/update/${invoiceId}/`, form)
			.then(response =>{
				return response
			})
	}


	async get_invoice_detaile(invoiceId){
		return this.axiosInstance
			.get(`counter/invoice/${invoiceId}/`)
			.then (response =>{
				return response.data
			})
		}


	get_invoice_pdf(invoiceId){
		return baseURL+`counter/invoice/create_pdf/${invoiceId}/`
	}


// Auth
	async SingIn(from){
		return this.axiosInstance
			.post(`token/`, {
				username: from.username,
				password: from.password,
			})
			.then((response) => {
				localStorage.setItem('access_token', response.data.access);
				localStorage.setItem('refresh_token', response.data.refresh);
				this.axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
				return response
			});
	}

	async LogOut(){
		return this.axiosInstance
			.post('craft_shake_auth/logout/blacklist/', {
				refresh_token: localStorage.getItem('refresh_token'),
				}
			)
			.then((response)=>
				{
				this.axiosInstance.defaults.headers['Authorization'] = null;	
				return response
				}
			)
	}

	GoogleLogIn(){
		// console.log('URL',window.location.href)
		let url = new URL(window.location.href)
		let host = url.host
		// console.log('host',host)
		let result = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://${host}/get_code&prompt=consent&response_type=code&client_id=644928208439-6rq3msjhv9l4u5ppcvd15tb1uv6v05a7.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline`
		return result
	}

	async GooglePain(code){
		let form = {  
            "access_token": "",	
            "code": code,
            "id_token": ""
        }
		return this.axiosInstance
			.post(`dj-rest-auth/google/`,form)
			.then((response)=>{
				localStorage.setItem('access_token', response.data.access_token);
				localStorage.setItem('refresh_token', response.data.refresh_token);
				this.axiosInstance.defaults.headers['Authorization'] =
						'JWT ' + localStorage.getItem('access_token');
				return response
			})
	}

	async GetUserData(id){
		console.log('Try to get user by ID', id)
		return this.axiosInstance
			.get(`craft_shake_auth/user/${id}/`)
			.then(response=>{
				return response.data
			})
	}

	async GetConfig(id){
		console.log('Try to get user by ID', id)
		return this.axiosInstance
			.get(`craft_shake_auth/config/${id}/`)
			.then(response=>{
				return response.data
			})
	}
}


