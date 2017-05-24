/**
 * Created by yinwk on 2017/5/24.
 */

/**
 * get方式进行fetch请求时,利用URLSearchParams传递参数
 * @param url
 * @param paramsObject
 * @returns {string}
 * @constructor
 */
export function URLSearchParamsConfig(url, paramsObject) {
    let params = new URLSearchParams();
    if (Object.prototype.toString.call(paramsObject) === "[object Object]") {
        for (let paramItem in paramsObject) {
            params.append(paramItem, paramsObject[paramItem]);
        }
    } else {
        try {
            throw new Error("TypeError: you must pass a variable whose data type is an object");
        } catch (err) {
            console.error(err);
        }
        return "";
    }
    return url + "?" + params.toString();
}