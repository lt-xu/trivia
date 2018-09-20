// pages/project/project.js
const app = getApp();
Page({
  data: {
    title: '',
    // content: '',
    timeDate: '',
    date: '点击请选择...',
    time: '点击请选择...',
    // importState: 1,
    // rodioColor: false,
    itemId: 0
  },
  onLoad(options) {
    console.log("add:onLoad:options:",options)
    const _this = this;
    let dayId = options.dayId;
    let currentObj = new Date(dayId * 1000);
    let timeDate = currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日';
    if (options.itemId) {
      let dayData = app.getOneItemData(dayId, options.itemId);
      this.setData({
        title: dayData.title,
        // content: dayData.content,
        timeDate: timeDate,
        date: dayData.date,
        time: dayData.time,
        // importState: dayData.importState,
        // rodioColor: dayData.completed,
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
  // changeContent(e) {
  //   this.setData({
  //     content: e.detail.value
  //   })
  // },
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
    // console.log(date)
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  // changeImport: function (e) {
  //   this.setData({
  //     importState: +e.currentTarget.dataset.state
  //   })
  // },
  // changeCompleted: function (e) {
  //   this.setData({
  //     rodioColor: !this.data.rodioColor
  //   });
  // },
  setRecord() {
    if (this.data.title == '') {
      wx.showToast({
        title: '请填写琐事的内容',
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
      // content: this.data.content,
      date:this.data.date,
      time: this.data.time,
      // importState: this.data.importState,
      // completed: this.data.rodioColor
    };
    app.addOneItemData(dayId, itemId, setDataObj, function () {
      console.log("addOneItemData");
      wx.switchTab({     //跳转到标签页
        url: '/pages/lists/lists?dayId' + dayId,
        success:function(){
          console.log("successs")
        },
        fail:function(){
          console.log("fail")
        }
      });
      console.log("addOneItemDataOK");
      
    });
  }
})