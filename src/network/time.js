import moment from 'moment'

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm:ss'
export const ISO_8601_FORMAT = moment.ISO_8601

/**
 *  momentjs的用法参考官方文档
 *  Reference https://momentjs.com/docs/
 */


export function getToday(format = DATE_TIME_FORMAT) {
  /**
   *  返回今天时间 2018-08-13 10:04:34
   */
  return moment().format(format);
}

export function getDate(date, days = 0, format = DATE_FORMAT) {
  /**
   *  date格式 YYYY-MM-DD
   *  返回指定某一天的第二天
   * 
   *  moment().add(7, 'days').add(1, 'months'); // with chaining
   *  moment().add({days:7,months:1}); // with object literal
   *  moment().add(1000000, 'milliseconds'); // a million milliseconds
   *  moment().add(360, 'days'); // 360 days
   */
  let convertDate = moment(date);
  convertDate = convertDate.add(days, 'days');
  return convertDate.format(format);
}

export function parseDate(date, format = DATE_FORMAT) {
  /**
   *  解析date转换成moment()
   * 
   *  return moment()
   */
  return moment(date, format)
}

export function getDateMonth(date, format = DATE_FORMAT) {
  /**
   *  date格式 YYYY-MM-DD 
   *  返回制定某一天所属的月份
   * 
   *  return (1-12)
   */

  let convertDate = moment(date, format);
  return convertDate.month() + 1

}

export function getDateYear(date, format = DATE_FORMAT) {
  /**
   *  date格式 YYYY-MM-DD 
   *  返回制定某一天所属的月份
   * 
   *  return (2018)
   */
  let convertDate = moment(date, format);
  return convertDate.year()
}

export function formatDate(date, format = DATE_FORMAT) {
  /**
   *  date格式 moment()
   *  格式化时间
   */
  return date.format(format)
}

export function getTimestamp() {
  /**
   *  获取当前的timestamp
   */
  return moment.now();
}


export function checkDateBetween(date, start, end) {
  /**
   *  date 格式: YYYY-MM-DD
   *  判断时间是否在一个区间内
   *  return boolean
   * 
   *  moment('2016-10-30').isBetween('2016-10-30', '2016-12-30', null, '()'); //false
   *  moment('2016-10-30').isBetween('2016-10-30', '2016-12-30', null, '[)'); //true
   *  moment('2016-10-30').isBetween('2016-01-01', '2016-10-30', null, '()'); //false
   *  moment('2016-10-30').isBetween('2016-01-01', '2016-10-30', null, '(]'); //true
   *  moment('2016-10-30').isBetween('2016-10-30', '2016-10-30', null, '[]'); //true
   */
  let convertDate = moment(date);
  return convertDate.isBetween(start, end, null, '[]');
}

export function compareDate(first, last) {
  /**
   * 比较两个时间 (格式: YYYY-MM-DD)
   *  
   * 
   *  first_date < last_date : < 0
   *  first_date > last_date : > 0
   *  first_date = last_date : = 0
   *  
   *  moment('2010-10-20').isSame('2010-10-20');
   * 
   */

  let firstDate = moment(first);
  if (firstDate.isBefore(last)) {
    return -1;
  } else if (firstDate.isSame(last)) {
    return 0;
  } else {
    return 1;
  }
}

export function formatIso8601(date) {
  /**
   *  date: ISO_8601格式 (2018-03-23T02:28:44.433)
   *  转换 moment.ISO_8601 格式
   *  
   *  return (2018-03-23 02:28:44)
   */

  if (!date) {
    return '';
  }
  let convertDate = moment(date, ISO_8601_FORMAT);
  return convertDate.format(DATE_TIME_FORMAT);
}


export function checkExpiration(timestamp, minutes) {
  /**
   * 检查是否过期
   * timestamp: getTimestamp()
   * minutes: 30min or any minutes
   * 
   * return true / false
   */

  if (!timestamp) {
    return false;
  }

  let now = moment();
  let expiration = moment(timestamp).add(minutes, 'minutes')

  return now.isAfter(expiration)
}


export function getDaysAgoBetween(days) {
  /**
   * 获取多少天前的时间区间
   * days: 1: 1 days ago  7:  7 days ago 
   * 三天内，含当天
   * 一天内，当天到当天
   */

  let now = moment();
  let today = now.format(DATE_FORMAT)
  let daysAgo = now.subtract(days, 'days')

  if (days <= 1) {
    return [daysAgo.format(DATE_FORMAT), daysAgo.format(DATE_FORMAT)]
  } else {
    return [getDate(daysAgo, 1), today]
  }

}