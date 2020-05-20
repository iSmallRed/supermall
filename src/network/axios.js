import axios from 'axios'
import Qs from 'qs'

import { getTimestamp } from './time'
import { getStore } from './cookie'
import { generateUUID } from './util'

let  baseURL = "http://op.dev.seeshion.com/";

    const instance = axios.create({
        baseURL,
        timeout: 60000,
        headers: {
            source: 'web',
            version: '1.0',
            Authorization: getStore('User-Token') || '',
            ThirdAuthorization: getStore('third_token') || '',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: [function (data) {
            data = Qs.stringify(data);
            return data;
        }],
        withCredentials: true,
    })
    
   

    instance.interceptors.response.use(response => {
        const {
            data,
            status,
            headers
        } = response;
    
        if (headers["content-type"] !== "application/json") {
            /**
             * 非json数据，正常返回
             * 不拦截文件下载
             */
            return response
        }
        let _res = {};
        let code = 200;
        let msg = '';
        let result = {}
    
        if (status === 200) {
            code = parseInt((data.code || data.statusCode || 200), 10);
            msg = data.msg || data.notification || data.error || ''
            if (Array.isArray(data.data)) {
                result = data.data
            } else if (data.data instanceof Object) {
                result = {
                    timestamp: getTimestamp(),
                    ...data.data
                }
            } else {
                result = data.data || data.content
            }
            _res = {
                msg,
                code,
                result,
                headers
            };
        } else {
            _res = {
                code: data.statusCode || status,
                msg: data.error || data.msg || data.notification || '服务接口异常',
                result: data.data || data.content || {},
                headers
            }
        }
        return Promise.resolve(_res);
    }, error => {
        if (error.response === 403) {
            Router.push({
                path: '/login'
            })
            return Promise.resolve({});
        }
        return Promise.reject(error);
		});
		
		instance.interceptors.request.use(config =>{
    	config.headers['X-Request-ID'] = generateUUID() || '';
    	config.params = {
        ...config.params,
        '_ts': getTimestamp()
    } 
        return config
    }, function (error) {
        return Promise.reject(error);
    });

    instance.defaults.xsrfHeaderName = 'X-CSRFToken'
    instance.defaults.xsrfCookieName = 'csrftoken'
    
export default instance
