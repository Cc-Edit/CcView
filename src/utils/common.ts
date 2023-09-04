// svg 转换为 base64
export const toBase64 = (str: string) => (typeof window === 'undefined'
  ? Buffer.from(str).toString('base64')
  : window.btoa(str));

// 延时器
export function delay(time: number) {
  return new Promise(resolve => {
    (typeof window === 'undefined' ? global : window).setTimeout(resolve, time);
  });
}

function triplet(e1: number, e2: number, e3: number) {
  const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return keyStr.charAt(e1 >> 2)
    + keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4))
    + keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6))
    + keyStr.charAt(e3 & 63);
}
// rgb 颜色转为based4Data
export function rgbBaseData(r: number, g: number, b: number) {
  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
}

// 获取数组中随机元素
export function getRandomItem(arr: any[], index?: number) {
  index || (index = Math.round(Math.random() * (arr.length - 1)));
  return arr[index];
}

export function getStorage(key: string, defaultValue: any) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key) || defaultValue;
  } else {
    return defaultValue;
  }
}
export function setStorage(key: string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
}
export function removeStorage(key: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
const formatNumber = (num: number) => {
  return `0${num}`.slice(-2);
};
export function dateFormat(timeStamp: number | string, format = 'Y-M-D h:m:s') {
  const date = new Date(parseInt(`${timeStamp}`));
  const formatList = ['Y', 'M', 'D', 'h', 'm', 's'];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}