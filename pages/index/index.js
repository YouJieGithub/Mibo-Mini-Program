// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    js_code:app,
    Salesweek:{},   //本周销量榜
    imgUrls: [
      "../../images/banner1.jpg",
      "../../images/banner2.jpg",
    ],
    Preferential: [],// 惠+新+约+券
    MFastcars: {},//购车快选
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular:true,
    selected: true,//显示
    selected1: false,//隐藏
    elected2: false,
    indexloginPage:"",//登录模态窗口显示
    pageRoute: {      //页面的跳转路径
      headPortraitPath: ""
    },
    StorageSync:""    //登录的缓存
  },
  //tab1
  selected: function (e) {
    this.setData({
      selected: true,
      selected1: false,
      selected2: false
    })
  },
  //tab2
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true,
      selected2: false
    })
  },
  //tab3
  selected2: function (e) {
    this.setData({
      selected: false,
      selected1: false,
      selected2: true
    })
  },
  // 图片自适应
  imageLoad: function (e) {
    var $width = e.detail.width,    //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height;    //图片的真实宽高比例
    var viewWidth = 750,           //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 750 / ratio;    //计算的高度值
    var image = this.data.imgUrls;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },
  // 模态窗口获取模板实例
  myEventListener:function(e){
    console.log(e)
    var items=e.detail
    if (items!=200&&items!=1){
      this.setData({
        indexloginPage: ""
      })
    } else{
      this.setData({
        indexloginPage: "index-loginPage"
      })
    }
  },
  // 点击头像弹出登录框
  FaceloginRoute:function(e){
    // 获取到缓存判断是否已登录
    if (this.data.StorageSync != 200) {
      this.setData({
        indexloginPage: ''
      })
    } else {
      this.setData({
        indexloginPage: 'index-loginPage'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userdataStorage = wx.getStorageSync("logindata")
    this.setData({
      StorageSync: userdataStorage
    })
    if (userdataStorage!=200){
      this.setData({
        indexloginPage:''
      })
    }else{
      this.setData({
        indexloginPage: 'index-loginPage',
        ["pageRoute.headPortraitPath"]: "../my/my"
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {
    var that=this
    wx.request({
      url: 'http://192.168.0.180:9797/product/getList',
      method:'post',
      header:{
        'content-type': 'application/json'
      },
      dataType: 'json',
      success(res){
        console.log(res)
        that.setData({
          Salesweek: res.data.data.productList
        })
      }
    })
    var that=this;
    that.setData({
      Preferential:[
        {
          url:"../discounts/discounts",
          images:"../../images/hui.png",
          text:"优惠福利",
        },
        { 
          url: "../quickcar/quickcar",
          images:"../../images/xin.png",
          text:"新车特卖"
        },
        {
          url: "../Purchases/Purchases",
          images: "../../images/yue.png",
          text: "购车计划"
        },
        {
          url: "../factoryoutlet/factoryoutlet",
          images: "../../images/quan.png",
          text: "厂家直销"
        }
        ],
      MFastcars:{
        "MFastcarsprice":[
        { sprice:"5—10万"},
        { sprice:"10—15万"},
        { sprice:"15—20万"},
        { sprice:"20—25万"},
        { sprice:"25—30万"}
        ],
        "MFastcarsmodels":[
        { smodels:"轿车"},
        { smodels: "微型车" },
        { smodels: "小型车" },
        { smodels: "紧凑型车" },
        { smodels: "中型车" },
        { smodels: "中大型车" },
        { smodels: "SUV" },
        { smodels: "小型SUV" },
        { smodels: "紧凑型SUV" },
        { smodels: "中型SUV" },
        { smodels: "中大型SUV" }
        ]
      }
    })
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
})
