import store from 'store'
import {
    isEmpty,
    complieFlatState,
} from 'network/util'



export default {
    inserted(el, binding, vnode) {
        const {
            value
        } = binding
        const menu = store.getters && store.getters.getPermissionMenu
        let currentRouteCode = vnode.context.$route.meta.code //路由的meta要设定code
        
        // 当菜单为空的情况下不作判断权限
        if (isEmpty(menu)) {
            return;
        }

        if (currentRouteCode) {
            let flatState = complieFlatState(menu)
            let currentRouteActions = flatState[currentRouteCode].action
            if (value && value instanceof Array && value.length > 0 && !isEmpty(currentRouteActions)) {
                const permissionAction = value

                const hasPermission = currentRouteActions.some(item => {
                    return permissionAction.includes(item)
                })

                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error(`need roles! Like v-permission="['view','update']"`)
            }
        } else {
            throw new Error(`currentRouteCode is not set!!!`)
        }
    }
}