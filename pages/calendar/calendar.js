// pages/calendar/calendar.js
import initCalendar from '../../template/calendar/index';
import { setTodoLabels } from '../../template/calendar/index';
import { getSelectedDay } from '../../template/calendar/index';
import { deleteTodoLabels } from '../../template/calendar/index';
const app = getApp();
// let globalSelectedDay="";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	notes:[],
  	daysNotesList:[],
  	selectedDayNotes:[],
  	days:[],
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
    this.data.notes.forEach(note => {
      note.isOpen = false
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let notes = app.getAllNotes();
    let daysNotesList = this.getDaysNotesList(notes);   //按日期成组的notes的列表
    let days = this.getDaysThatHasNotes(daysNotesList);    //有notes的日期
    this.setData({
    	notes:notes,
    	daysNotesList:daysNotesList,
    	days:days,
    });
    let conf = {
  /**
   * 选择日期后执行的事件
   * @param { object } currentSelect 当前点击的日期
   * @param { array } allSelectedDays 选择的所有日期（当mulit为true时，才有allSelectedDays参数）
   */
  		afterTapDay: (currentSelect, allSelectedDays) => {
  			let selectedDayNotes = this.getSelectedDayNotes(currentSelect,this.data.daysNotesList);
    		this.setData({
    			selectedDayNotes:selectedDayNotes,
    		})
  		},
  /**
   * 日期点击事件（此事件会完全接管点击事件）
   * @param { object } currentSelect 当前点击的日期
   * @param { object } event 日期点击事件对象
   */
  		// onTapDay(currentSelect, event) { 
  		// },
  /**
   * 日历初次渲染完成后触发事件，如设置事件标记
   */
  		// afterCalendarRender() {
  		// 	    		setTodoLabels({
    //   			pos: 'bottom',
    //   			dotColor: '#1180ff',
    //   			days: days,
    // 		});
   	// 	},
	};
    initCalendar(conf); // 初始化日历
    setTodoLabels({
      pos: 'bottom',
      dotColor: '#1180ff',
      days: days,
    });
    let selectedDay = getSelectedDay();
    let selectedDayNotes = this.getSelectedDayNotes(selectedDay[0],daysNotesList);
    this.setData({
    	selectedDayNotes:selectedDayNotes,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  	deleteTodoLabels(this.data.days);
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

  //删除
  handleDelete: function (e) {
    let dataset = e.target.dataset;
    console.log("e.target.dataset:");
    console.log(dataset);
    app.storageNotesInfo();
    let id = dataset.itemid; //拿到的note的itemid,不能用数组的index
    let notes = this.data.notes;
    for (var i = 0; i < notes.length; i++) {
    	if (notes[i].itemId == id) {
    		notes.splice(i, 1);
    		break;
    	}
    }
    wx.setStorageSync('allNotes', notes);
    let daysNotesList = this.getDaysNotesList(notes);   //按日期成组的notes的列表
    let days = this.getDaysThatHasNotes(daysNotesList);    //有notes的日期
    let selectedDay = getSelectedDay();
    console.log("getSelectedDay:")
    console.log(selectedDay);
    let selectedDayNotes = this.getSelectedDayNotes(selectedDay[0],daysNotesList);
    //渲染数据
    this.setData({
      notes: notes,
      days:days,
      daysNotesList:daysNotesList,
      selectedDayNotes:selectedDayNotes,
    });
    deleteTodoLabels(days);
    setTodoLabels({
      pos: 'bottom',
      dotColor: '#1180ff',
      days: days,
    });

  },

  edit: function (e) {
    console.log(e);
    let dataset = e.target.dataset;
    let index = dataset.index; //拿到是第几个数组
    wx.navigateTo({
      url: '/pages/add/add?index=' + index,
    })
  },

  getDaysNotesList:function(notes){
    let daysNotesList = new Array();
    for (var i = 0; i < notes.length; i++) {
    	let note = notes[i];
    	let dateObj = new Date(note.itemId);
    	let month = dateObj.getMonth()+1;
      	if (month<10) {month = '0'+month};  //月份显示为两位数字
      	let day = dateObj.getDate();      
      	if (day<10) {day = '0'+day };     //日期显示为两位数字
      	let date = month + "-" +day;
      	let fullDate = dateObj.getFullYear()+"-"+date;

      	if (daysNotesList[fullDate]) {
      		daysNotesList[fullDate].push(note);
      	} else {
      		daysNotesList[fullDate]=new Array(note);
      	}
    }
    console.log("daysNotesList:");
    console.log(daysNotesList);
    return daysNotesList;
  },

  getDaysThatHasNotes: function (daysNotesList){
    let days = new Array();
    for (let day in daysNotesList) {
    	days.push({
        	year: day.substring(0,4),
        	month: day.substring(5,7),
        	day: day.substring(8,10),
      })
    }
    return days;
  },
  getSelectedDayNotes:function(selectedDay,daysNotesList){
  	let month = selectedDay.month<10 ? '0'+selectedDay.month : selectedDay.month; //两位
  	let day = selectedDay.day<10 ? '0'+selectedDay.day : selectedDay.day;   //两位
  	let fullDate = selectedDay.year+"-"+month+"-"+day;
  	// console.log("fullDate:"+fullDate);
  	let selectedDayNotes = [];
  	if (daysNotesList[fullDate]) {
  		selectedDayNotes = daysNotesList[fullDate];
  	}
  	return selectedDayNotes;
  },
})