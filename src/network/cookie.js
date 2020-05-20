import Cookies from 'js-cookie';
import moment from 'moment';

let cookie_prefix = "http://op.dev.seeshion.com/"

/**
 * 给cookie的名字加一个专属的prefix
 */
export const buildCookieName = (name) => {
  if (!name) return;
  return (cookie_prefix || '') + name
}

/**
 * 存储cookie
 * expires: minutes (分钟算)
 */
export const setStore = (name, content, expires, ) => {
  if (!name) return;

  let _name = buildCookieName(name);

  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  if (expires) {
    let expiration = moment().add(expires, 'minutes')
    Cookies.set(_name, content, {
      expires: new Date(expiration)
    });
  } else {
    Cookies.set(_name, content);
  }
};


/**
 * 获取cookie
 */
export const getStore = name => {
  if (!name) return {};

  let _name = buildCookieName(name);
  let content = Cookies.get(_name);
  try {
    content = JSON.parse(content);
    return content;
  } catch (e) {
    return content;
  }
};

/**
 * 删除cookie
 */
export const removeStore = name => {
  if (!name) return;
  let _name = buildCookieName(name);
  Cookies.remove(_name);
};