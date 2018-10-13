// pages/consult/consult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList:[],  //后台获取的内容
    pageNumber:1,    //获取页数
    searchLoading: true, //"上拉加载"的变量，默认false，隐藏
    datanone:"footera"   //没有数据时的css显示
  },

  /**
       * 请求数据封装
       */
  fetchSearchList:function(){
    var  that=this
    if (that.data.searchLoading){
      wx.request({
        url: 'http://192.168.0.180:9797/product/getList',
        data: {
          pageNumber: that.data.pageNumber
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: res => {
          var q = res.data.data.productList,  //获取数据量
              w = res.data.data.pageNumber,     //获取页数
              e = res.data.data.pageSize       //获取总数据量
          if (q.length>0){
            that.setData({
              productList: this.data.productList.concat(q),
              pageNumber:w,
              searchLoading: true
            })
          } 
          else if (q.length<e){
            this.setData({
              productList: this.data.productList.concat(q),
              pageNumber: w,
              searchLoading:false,
              datanone:"footer"
            })
          }
          console.log(that.data.searchLoading)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.fetchSearchList()
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
    this.setData({
      pageNumber: this.data.pageNumber+1      
    })
    this.fetchSearchList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})