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
  getNote:function(index) {
    let notes = wx.getStorageSync("allNotes")||[];
    return notes[index];
  },
  getAllNotes(){
    return wx.getStorageSync("allNotes")||[];
  },
  addNote:function(itemId, content, date, time) {
    let note = {"itemId":itemId,"content":content,"date":date, "time":time};
    console.log("note:"+note);
    let notes = wx.getStorageSync("allNotes")||[];
    //在首部插入
    notes.unshift(note);
    //重新排序
    if (notes.length > 1) {
      if (note.itemId < notes[1].itemId ) { 
        notes = notes.sort((a,b)=>{
          return -(a.itemId - b.itemId)
        })
      }
    }
    wx.setStorageSync('allNotes',notes);
  },
  changeNote:function(index,itemId,content,date,time){
    let note = {"itemId":itemId,"content":content,"date":date, "time":time};
    let notes = wx.getStorageSync("allNotes")||[];
    notes[index] = note;
    notes = notes.sort((a,b)=>{
       return -(a.itemId - b.itemId)
    })
    wx.setStorageSync('allNotes',notes);
  },
  //notes存储信息
  storageNotesInfo:function(){
    let notes = wx.getStorageSync("allNotes");
    console.log("storageNotesInfo:")
    console.log("-->notes.length:"+notes.length);
    for (var i = 0; i < notes.length; i++) {
      console.log("-->note: "+i+" {itemId: "+notes[i].itemId+", content: "+notes[i].content+", date: "+notes[i].date+", time: "+notes[i].time+"}")
    }
  },
  globalData: {
    userInfo: null
  }
})