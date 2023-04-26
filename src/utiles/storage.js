/* eslint-disable */
// 封装本地存储模块

// 检测这个字符串是不是json格式
function isJSON (str) {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
        } catch (e) {
          return false;
    }
  }
  console.log('It is not a string!')
}

export const getItem = (name) => {
  const data = window.localStorage.getItem(name)
    if (isJSON(data)) {
      try {
        return JSON.parse(data)
      } catch (err) {
        return data
      }
    } else {
      return data
  }
}

export const setItem = (name, value) => {
    if ((typeof value) === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(name, value);

}

export const removeItem = (name) => {
    window.localStorage.removeItem(name)

}
