// pages/videodetails/videodetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videodetails:[
      {
        id:0,
        zannumber:123,
        collected:0,
        video:'',
        title1:'青藏之旅',
        title2:'第一期',
        videodetailscomment:'../../images/videodetails1_03.png',
        videodetailslike1:'../../images/videodetails1_1111_03.png',
      },
      {
        id: 1,
        zannumber: 124,
        collected:0,
        video: '',
        title1: '青藏之旅',
        title2: '第一期',
        videodetailscomment: '../../images/videodetails1_03.png',
        videodetailslike1: '../../images/videodetails1_1111_03.png'
      }
    ]
  },
  qwe: function (e) {
    var that = this;
    var data = e.currentTarget.dataset;
    var mid = data.id;
    var cookie_mid = wx.getStorageSync('zan') || [];//获取全部点赞的mid 
    var isadd = 1;  
    var newmessage = [];
    if (cookie_mid.includes(mid)) {//说明已经点过赞,取消赞 
      isadd = 0;  
      var m = 0; 
      for (var j in cookie_mid) { 
        if (cookie_mid[j] != mid) { 
          newmessage[m] = cookie_mid[j]; 
          m++ 
        }
      }
      wx.setStorageSync('zan', newmessage);//删除取消赞的mid
    } else { 
      cookie_mid.unshift(mid);  
      wx.setStorageSync('zan', cookie_mid);//新增赞的mid  
    } 
    wx.request({
      url: app.globalData.api.api_system,
      data: { 
        action: 'zannum',
        mid: mid,
        isadd: isadd,
        wxid: app.globalData.wxid 
      },
      method: 'GET',  
      success: function (res) { 
       
      },
      complete:function(res){
        var message = that.data.videodetails;
        for (var i in message) {
          var collectStatus = false
          if (message[i].id == mid) {
            var collectStatus = false
            if (isadd) {
              console.log(isadd)
              collectStatus = true
              message[i].videodetailslike1 = "../../images/videodetails1111_03.png"
              message[i].zannumber = parseInt(message[i].zannumber) + 1
            } else {
              
              collectStatus = false
              message[i].videodetailslike1 = "../../images/videodetails1_1111_03.png"
              message[i].zannumber = parseInt(message[i].zannumber) - 1

            }
          }
         wx.showToast({
          title: collectStatus ? '收藏成功' : '取消收藏',
        })
        }
        that.setData({
          videodetails: message
        }) 
      }
    })
    // /*更新点赞*/
    //   var that = this;
    //   var data = e.currentTarget.dataset;
    //   var mid = data.id;
    //   var message = that.data.videodetails;
    //   var cache = wx.getStorageSync('cache_key')||[];
    // for (let i in message){
    //   if (i == mid){
    //     var collectStatus = false
    //     if (message[i].collected == 0){
    //       collectStatus = true
    //       message[i].videodetailslike1="../../images/videodetails1111_03.png"
    //       message[i].collected = message[i].collected + 1
    //       message[i].zannumber = message[i].zannumber + 1
    //     } else {
    //       collectStatus = false
    //       message[i].videodetailslike1 = "../../images/videodetails1_1111_03.png"
    //       message[i].collected = message[i].collected - 1
    //       message[i].zannumber = message[i].zannumber - 1
    //     }
    //     wx.showToast({
    //       title: collectStatus ? '收藏成功' : '取消收藏',
    //     })
    //     var sert = message[i].collected
    //     var index = message[i].id
    //     wx.setStorageSync('cache_key', index);
    //   }
    // }
    // that.setData({
    //   videodetails: message
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var q = wx.getStorageSync('zan');
    var message = this.data.videodetails;
    for(let i in q){
      for(let j in message){
        console.log(q[i])
        if (q[i] == message[j].id){
          message[j].videodetailslike1 = "../../images/videodetails1111_03.png"
        }
      }
      this.setData({
        videodetails: message
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  }
})