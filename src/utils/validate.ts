/**
 * @description 判读是否为外链
 * @param path
 */
export function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @description 校验密码
 * @param password
 */
export function isPassword(password: string): boolean {
  return password.length >= 6;
}

/**
 * @description 判断是否为数字
 * @param value
 */
export function isNumber(value: string): boolean {
  const reg = /^[0-9]*$/;
  return reg.test(value);
}

/**
 * @description 判断是否是名称
 * @param value
 */
export function isName(value: string): boolean {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
  return reg.test(value);
}

/**
 * @description 判断是否为IP
 * @param ip
 */
export function isIP(ip: string): boolean {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
}

/**
 * @description 判断是否是w网址
 * @param url
 */
export function isUrl(url: string): boolean {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @description 判断是否是小写字母
 * @param str
 */
export function isLowerCase(str: string): boolean {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @description 判断是否是大写字母
 * @param str
 */
export function isUpperCase(str: string): boolean {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @description 判断是否是大写字母开头
 * @param str
 */
export function isAlphabets(str: string): boolean {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @description 判断是否是字符串
 * @param str
 */
export function isString(str: unknown): boolean {
  return typeof str === 'string' || str instanceof String;
}

/**
 * @description 判断是否是数组
 * @param arg
 */
export function isArray(arg: unknown): boolean {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}

/**
 * @description 判断是否是端口号
 * @param str
 */
export function isPort(str: string): boolean {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return reg.test(str);
}

/**
 * @description 判断是否是手机号
 * @param str
 */
export function isPhone(str: string): boolean {
  const reg = /^1\d{10}$/;
  return reg.test(str);
}

/**
 * @description 判断是否是身份证号
 * @param str
 */
export function isIdCard(str: string): boolean {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(str);
}

/**
 * @description 判断是否是邮箱
 * @param str
 */
export function isEmail(str: string): boolean {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return reg.test(str);
}

/**
 * @description 判断是否中文
 * @param str
 */
export function isChinese(str: string): boolean {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/;
  return reg.test(str);
}

/**
 * @description 判断是否为空
 * @param str
 */
export function isBlank(str: string): boolean {
  return (
    str == null ||
    false ||
    str === '' ||
    str.trim() === '' ||
    str.toLocaleLowerCase().trim() === 'null'
  );
}

/**
 * @description 判断是否为固话
 * @param str
 */
export function isTel(str: string): boolean {
  const reg =
    /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
  return reg.test(str);
}

/**
 * @description 判断是否为数字且最多两位小数
 * @param str
 */
export function isNum(str: string): boolean {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}
