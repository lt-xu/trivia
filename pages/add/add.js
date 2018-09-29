// pages/project/project.js
const app = getApp();
Page({
  data: {
    itemId:0,    //1970.1.1至今的毫秒数，作为itemId
    content: '',
    date: '',   //只记录月-日
    time: '',
    fullDate:'',
    index:-1,
    dateObj:"",
  },
  onLoad(options) {
    const _this = this;
    if (options.index) {
      let note = app.getNote(options.index);
      let dateObj = new Date(note.itemId);
      let index = options.index;
      // console.log("onLoad:index:"+index);
      this.setData({
        itemId:note.itemId,
        content:note.content,
        date: note.date,
        time: note.time,
        fullDate:dateObj.getFullYear()+'-'+note.date,
        index:index,
        dateObj:dateObj
      });
    } else {
      let dateObj = new Date();
      let itemId = dateObj.getTime();
      let month = dateObj.getMonth()+1;
      if (month<10) {month = '0'+month};  //月份显示为两位数字
      let day = dateObj.getDate();      
      if (day<10) {day = '0'+day };     //日期显示为两位数字
      let date = month + "-" +day;
      let fullDate = dateObj.getFullYear()+"-"+date;
      let hour = dateObj.getHours();
      if (hour <10 ) { hour = '0'+hour }; //小时显示为两位数字
      let minute = dateObj.getMinutes();
      if (minute < 10) { minute = '0'+minute; } //分钟显示为两位数字
      let time = hour + ":" + minute;
      this.setData({
        itemId: itemId,
        date: date,
        time: time,
        fullDate:fullDate,
        dateObj:dateObj,
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
    let dateObj = this.data.dateObj;
    dateObj.setFullYear(year);
    dateObj.setMonth(month-1);
    dateObj.setDate(day);
    let itemId = dateObj.getTime();
    this.setData({
      date: date,
      itemId: itemId
    });
    console.log("date change to :"+e.detail.value+" 'dateObj' change to :" + dateObj);
  },
  bindTimeChange: function (e) {
    let time = e.detail.value;
    let hour = time.substring(0,2);
    let minute = time.substring(3,5);
    let dateObj = this.data.dateObj;
    dateObj.setHours(hour);
    dateObj.setMinutes(minute);
    let itemId = dateObj.getTime();
    this.setData({
      time: time,
      itemId:itemId,
      dateObj:dateObj,
    });
    console.log("time change to :"+e.detail.value+" 'dateObj' change to :"+ dateObj);
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
    let index = this.data.index;
    console.log("add.js:content:"+content);
    console.log("setRecord:index:"+index);
    if (index != -1) {
      app.changeNote(index,itemId,content,date,time);
    } else {
      app.addNote(itemId,content,date,time);
    }
    app.storageNotesInfo();
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