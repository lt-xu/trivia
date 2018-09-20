//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //获取
  getOneDayData(dayId) {
    let obj = wx.getStorageSync(dayId);
    return obj;
  },
  getOneItemData(dayId, itemId) {
    let dayData = wx.getStorageSync(dayId);
    for (let i in dayData) {
      if (i == itemId) {
        return dayData[itemId];
      };
    };
  },
  //添加
  addOneDayData(dayId, obj) {
  },
  addOneItemData(dayId, itemId, obj, fun) {
    let dayData = wx.getStorageSync(dayId) || {};
    dayData[itemId] = obj;
    wx.setStorage({
      key: dayId,
      data: dayData,
      success() {
        if (fun) fun();
      }
    });
  },
  //设置
  setOneDayData(dayId, obj) {
  },
  setOneItemData(dayId, itemId, obj) {
  },
  //删除
  removeOneDayData(dayId) {
  },
  removeOneItemData(dayId, itemId, fun) {
    let dayData = wx.getStorageSync(dayId) || {};
    delete dayData[itemId];
    wx.setStorage({
      key: dayId,
      data: dayData,
      success() {
        if (fun) fun();
      }
    });
  },
  globalData: {
    userInfo: null
  }
})