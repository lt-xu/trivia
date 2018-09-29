//lists.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    notes:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 默认每个选项都是关闭状态
    console.log("lists:onReady");
    this.data.notes.forEach(note => {
      note.isOpen = false
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let notes = wx.getStorageSync("allNotes") || [];
    this.setData({
      notes:notes
    });
    console.log("lists:onShow");
    app.storageNotesInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleChange: function (isOpen) {
    console.log('显示/关闭了菜单:', isOpen)
  },

  handleDelete: function (e) {
    console.log(e);
    var dataset = e.target.dataset;
    console.log("dataset.index:");
    var Index = dataset.index; //拿到是第几个数组
    console.log(dataset.index);
    this.data.notes.splice(Index, 1);
    //渲染数据
    this.setData({
      notes: this.data.notes
    });
    wx.setStorageSync('allNotes',this.data.notes);
    app.storageNotesInfo();
    // console.log("allNotes.length:"+wx.getStorageSync("allNotes").length);
  },
  handleSliderLeftStart: function (e) {
    console.log('开始左滑', e.target.dataset.id)
    this.data.notes.forEach(todoItem => {
      // 除了当前项，其它打开项的菜单都关闭，确保每次只有一个项可以左滑显示删除
      if (todoItem.id !== e.target.dataset.id && todoItem.isOpen) {
        todoItem.isOpen = false
      }
    });
    this.setData({
      notes: this.data.notes
    })
  },
    edit: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  add: function () {
    wx.navigateTo({
      url: '/pages/add/add?dayId={{dayId}}',
    })
    console.log('url:','/pages/add/add?dayId={{dayId}}')
  },
  setOneDayAllData(dayId) {
    let dayData = app.getOneDayData(dayId);
    this.setData({
      storageData: dayData
    });
  }
});