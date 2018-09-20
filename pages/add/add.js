// pages/project/project.js
const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    title: '',
    timeDate: '',
    date: '点击请选择...',
    time: '点击请选择...',
    itemId: 0
  },
  onLoad(options) {
    const _this = this;
    var myDate = new Date();//获取系统当前时间

    let currentObj = new Date(dayId * 1000);
    let timeDate = currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日';

    if (options.itemId) {
      let dayData = app.getOneItemData(dayId, options.itemId);
      this.setData({
        title: dayData.title,
        content: dayData.content,
        timeDate: timeDate,
        time: dayData.time,
        itemId: options.itemId,
        dayId: options.dayId
      });
    } else {
      this.setData({
        dayId: options.dayId,
        timeDate: timeDate
      });
    };
  },
  changeTitle(e) {
    this.setData({
      title: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  setRecord() {
    if (this.data.title == '') {
      wx.showToast({
        title: '请填写标题栏的内容',
        icon: 'none'
      });
      return;
    };
    if (this.data.date == '点击请选择...') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return;
    };
    if (this.data.time == '点击请选择...') {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      });
      return;
    };
 
    let itemId = +new Date() + '';
    let dayId = this.data.dayId;
    if (this.data.itemId) itemId = this.data.itemId;
    let setDataObj = {
      title: this.data.title,
      date: this.data.date,
      time: this.data.time,
    };
    app.addOneItemData(dayId, itemId, setDataObj, function () {
      wx.redirectTo({
        url: '/pages/list/list?dayId=' + dayId
      });
    });
  }
})