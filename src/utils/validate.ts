/**
 * 验证用户名是否有效
 * @param str - 输入的用户名字符串
 * @returns {boolean} - 如果用户名有效，返回 true；否则返回 false
 *
 * 验证规则：
 * 1. 必须以字母开头。
 * 2. 总长度在 3 到 16 个字符之间。
 * 3. 仅允许字母、数字、下划线(_)和连字符(-)。
 */
export const isValidUsername = (str: string): boolean => {
  // ^[a-zA-Z]：匹配以字母（大小写均可）开头。
  // [a-zA-Z0-9_-]{2,15}$：匹配 2 到 15 个字母、数字、下划线或连字符。
  // 总长度要求为 3 到 16 个字符。
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/

  // 去掉输入的首尾空格后，检查是否匹配规则
  return usernameRegex.test(str.trim())
}

export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

export const isArray = (arg: any) => {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

export const isValidURL = (url: string) => {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}
