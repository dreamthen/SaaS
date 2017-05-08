/**
 * Created by yinwk on 2017/5/7.
 */
const localStorageObject = {
    /**
     * 设置本地存储数据
     * @param storageArray
     */
    setLocalStorage: function (storageArray) {
        if ((Object.prototype.toString.call(storageArray) === "[object Array]") && (storageArray.length > 0)) {
            storageArray.map((storageItem, index) => {
                localStorage.setItem(storageItem["key"], storageItem["value"]);
            });
            console.log(storageArray);
        } else {
            this.throwError();
        }
    },
    /**
     * 给state设置本地获取到的存储数据
     * @param key
     */
    getLocalStorage: function (key) {
        if ((Object.prototype.toString.call(key) === "[object Array]") && (key.length > 0)) {
            key.map((keyItem, index) => {
                if (keyItem["key"] === "userInfo") {
                    this.setState({
                        id: JSON.parse(localStorage.getItem(keyItem["key"]))["id"]
                    });
                } else {
                    this.setState({
                        [keyItem["key"]]: JSON.parse(localStorage.getItem(keyItem["key"]))[keyItem["key"]]
                    })
                }
            });
        } else {
            localStorageObject.throwError();
        }
    },
    /**
     * 删除本地存储的数据
     * @param storageArray
     */
    removeLocalStorage: function (storageArray) {
        if ((Object.prototype.toString.call(storageArray) === "[object Array]") && (storageArray.length > 0)) {
            storageArray.map((storageItem, index) => {
                localStorage.removeItem(storageItem["key"]);
            });
        } else {
            this.throwError();
        }
    },
    /**
     * 抛出异常状态
     */
    throwError: function () {
        try {
            throw new Error("LocalStorage传入格式错误!");
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = localStorageObject;