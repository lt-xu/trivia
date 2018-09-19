//lists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        id: 'a1',
        text: '你好1'
      },
      {
        id: 'a2',
        text: '你好2'
      },
      {
        id: 'a3',
        text: '你好3'
      },
      {
        id: 'a4',
        text: '你好4'
      },
      {
        id: 'a5',
        text: '你好5'
      }, {
        id: 'a6',
        text: '你好6'
      }, {
        id: 'a7',
        text: '你好7'
      }, {
        id: 'a8',
        text: '你好8'
      }, {
        id: 'a9',
        text: '你好9'
      }, {
        id: 'a10',
        text: '你好10'
      }, {
        id: 'a11',
        text: '你好11'
      }, {
        id: 'a12',
        text: '你好12'
      }, {
        id: 'a13',
        text: '你好13'
      }, {
        id: 'a14',
        text: '你好14'
      }, {
        id: 'a15',
        text: '你好15'
      }
    ]
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
    this.data.lists.forEach(list => {
      list.isOpen = false
    });
    global.name = 'lizong'
    console.log(global.wx)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个数组

    this.data.lists.splice(Index, 1);

    this.setData({
      lists: this.data.lists
    });
    //渲染数据
    this.setData({
      lists: this.data.lists
    });
    
  },
  handleSliderLeftStart: function (e) {
    console.log('开始左滑', e.target.dataset.id)
    this.data.lists.forEach(todoItem => {
      // 除了当前项，其它打开项的菜单都关闭，确保每次只有一个项可以左滑显示删除
      if (todoItem.id !== e.target.dataset.id && todoItem.isOpen) {
        todoItem.isOpen = false
      }
    });
    this.setData({
      lists: this.data.lists
    })
  },
    edit: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  addList: function () {
    wx.navigateTo({
      url: '../addList/addList',
    })
  },
})