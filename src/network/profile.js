import axios from './axios'
import zhuan from './zhuan'

// export function requestThirds(params) {
//   return requestThird.post({
//     url: "/api/third/service/",
//     ...params
//   }) 
// }

export const requestThird = params => {
  return axios.post(zhuan.third, params);
}


export const requestWebsiteHomeV2Detail = params => {
  /**
   *  获取首页V2详情 (需要传 "_page_id" )
   */
  let path = `/api/website/config/home_v2/${params._page_id}/`
  return axios.get(path, {
      params: params
  });
}

export const requestSpiderInformationList = params => {
  /**
   * 文章列表
   */
  return axios.get(zhuan.spiderInformationList, {
      params: params
  });
}

export const requestWebsiteWidgetDelete = params => {
  /**
   * 删除widget ("_widget_id")
   */
  let path = `/api/website/widget/${params._widget_id}/`
  return axios.delete(path, params);
}

export const requestWebsiteWidgetEdit = params => {
  /**
   * 修改widget ("_widget_id")
   */
  let path = `/api/website/widget/${params._widget_id}/`
  return axios.put(path, params);
}

export const requestWebsiteHomeV2WidgetCreate = params => {
  /**
   * 创建首页v2版widget ("_page_id")
   */
  let path = `/api/website/config/home_v2/${params._page_id}/`
  return axios.post(path, params);
}

export const requestWebsiteHomeV2Publish = params => {
  /**
   * 发布首页v2页面 ("_page_id")
   */
  let path = `/api/website/config/home_v2/${params._page_id}/`
  return axios.put(path, params);
}

export const requestWebsitePages = params => {
  /**
   * 获取官网内容管理页面数据 (需要传 "_page_type" )
   */
  let path = `/api/v2/website/pages/${params._page_type}`
  return axios.get(path, {
      params: params
  });
}

export const requestWebsitePagesCreate = params => {
  /**
   * 创建官网内容管理页面数据
   */
  return axios.post(zhuan.websitePagesCreate, params);
}

export const requestWebsitePageDelete = params => {
  /**
   * 删除官网内容管理页面数据 (需要传 "_page_id" )
   */
  let path = `/api/website/page/${params._page_id}/`
  return axios.delete(path, params);
}