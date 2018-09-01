// pages/project/project.js
const app = getApp();
const now = new Date();
Page({
  data: {
    itemId:0,    //1970.1.1至今的毫秒数，作为itemId
    content: '',
    date: '',   //只记录月-日
    time: ''
  },
  onLoad(options) {
    console.log("add:onLoad:options:",options)
    const _this = this;
    const now = new Date();
    let itemId = now.getTime();
    let month = now.getMonth()+1;
    if (month<10) {month = '0'+month};  //月份显示为两位数字
    let day = now.getDate();      
    if (day<10) {day = '0'+day };     //日期显示为两位数字
    let date = month + "-" +day;
    let hour = now.getHours();
    if (hour <10 ) { hour = '0'+hour }; //小时显示为两位数字
    let minute = now.getMinutes();
    if (minute < 10) { minute = '0'+minute; } //分钟显示为两位数字
    let time = hour + ":" + minute;
    // let dayId = options.dayId;
    // let currentObj = new Date(dayId * 1000);
    // let timeDate = currentObj.getFullYear() + '年' + (currentObj.getMonth() + 1) + '月' + currentObj.getDate() + '日';
    if (options.itemId) {
      let dayData = app.getOneItemData(dayId, options.itemId);
      this.setData({
        note: dayData.note,
        date: dayData.date,
        time: dayData.time,
        itemId: options.itemId,
        dayId: options.dayId
      });
    } else {
      this.setData({
        itemId: itemId,
        date: date,
        time: time
      });
    };
  },
  changeContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindDateChange: function(e){
    let fullDate = e.detail.value;
    let year = fullDate.substring(0,4);
    let month = fullDate.substring(5,7);
    let day = fullDate.substring(8,10);
    let date = fullDate.substring(5,10);
    now.setFullYear(year);
    now.setMonth(month-1);
    now.setDate(day);
    let itemId = now.getTime();
    this.setData({
      date: date,
      itemId: itemId
    });
    console.log("date change to :"+e.detail.value+" 'now' change to :" + now);
  },
  bindTimeChange: function (e) {
    let time = e.detail.value;
    let hour = time.substring(0,2);
    let minute = time.substring(3,5);
    now.setHours(hour);
    now.setMinutes(minute);
    let itemId = now.getTime();
    this.setData({
      time: time,
      itemId:itemId
    });
    console.log("time change to :"+e.detail.value+" 'now' change to :"+ now);
  },
  setRecord() {
    if (this.data.content == '') {
      wx.showToast({
        title: '请填写琐事的内容',
        icon: 'none'
      });
      return;
    };
    console.log(this.data);
    let itemId = this.data["itemId"];
    let content = this.data["content"];
    let date = this.data["date"];
    let time = this.data["time"];
    console.log("add.js:content:"+content);
    app.addOneItemData(itemId,content,date,time);
    wx.switchTab({
      url:'/pages/lists/lists',
      success:function(){
        console.log("switchTab successs");
      },
      fail:function(){
        console.log("switchTab fail");
      }
    })
  }
})