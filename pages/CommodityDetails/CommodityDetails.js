// pages/CommodityDetails/CommodityDetails.js
var wxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      "../../images/173945467409578618.png",
      "../../images/378053895484248045.png",
      "../../images/369623309470899014.png",
      "../../images/60752587302737299.png"
    ],
    indicatorDots:true,
    autoplay: true,
    interval:2000,
    duration:1000,
    circular:true,
    selected: true,//显示
    selected1: false,//隐藏
    selected10:true, 
    selected12:false,
    selected13:false,
    selected14:false,
    selected16: false,
    selected15: false,
    selected17: true,
    array: ['西安', '咸阳', '宝鸡', '延安', '榆林', '渭南', '铜川', '汉中', '安康', '商洛'],
    index: 0,
    multiArray: ['白色','黑色','棕色','黄色'],
    multiIndex: 0,
    carImg: [
      { name: '贴膜', value: '贴膜', img: '../../images/parameterize_05.png' },
      { name: '脚垫', value: '脚垫', img: '../../images/parameterize_08.png' },
      { name: '导航', value: '导航', img: '../../images/parameterize_11.png' },
      { name: '包真皮', value: '包真皮', img: '../../images/parameterize_14.png' },
      { name: '行礼架', value: '行礼架', img: '../../images/parameterize_16.png' },
      { name: '行车记录仪', value: '行车记录仪', img: '../../images/parameterize_24.png' },
      { name: '挂件', value: '挂件', img: '../../images/parameterize_27.png' },
      { name: '充电孔', value: '充电孔', img: '../../images/parameterize_30.png' },
      { name: '香水', value: '香水', img: '../../images/parameterize_31.png' }
    ],
    CarAdvantage:[
      "../../images/parameterize_03.png"
    ],
    // 蒙层是否关闭
    winmodal:{
      showModal: 'hideModal',
      showMask: 'hideMask'
    },
    Installmentplantetx:'3.3',//首付金额
    //选择方案带边框
    InstallmentplanBorder:'',
    // 金融方案
    stagesFinancial:{
      // 36期方案
      thirtySixScheme:[
          {
            id:'1',
            sSum: '1.71',
            mip: '2581', 
          checked: false
          },
          {
            id: '2',
            sSum: '2.41',
            mip: '2581',
            checked: false
          },
          {
            id: '3',
            sSum: '3.81',
            mip: '2581',
            checked: false
          }
        ],
  fortyEightScheme:[
        {
          id: '4',
          sSum:'1.41',
          mip:'2581',
          checked: false
        },
        {
          id: '5',
          sSum: '3.81',
          mip: '2418',
          checked: false
        },
        {
          id: '6',
          sSum: '1.41',
          mip: '2481',
          checked: false
        }
      ]
    },
    conterndata:{}   //车型图片
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  bindPickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  // 分期+全款
  //tab1
  selected: function (e) {
    this.setData({
      selected: true,
      selected1: false
    })
  },
  //tab2
  selected1: function (e) {
    this.setData({
      selected: false,
      selected1: true
    })
  },
  // 蒙层禁止穿透
  move: function () {
  },
  // 打开蒙层
  openWin:function(){
    this.setData({
      winmodal: {
        showModal: 'showModal',
        showMask: 'showMask',
      }
    })
  },
  //关闭蒙层
  closewin:function(){
    this.setData({
      winmodal:{
      showModal: 'hideModal',
      showMask: 'hideMask'
      }
    })
  },
  Installmentplan:function(e){
    var that=this,
      index = e.target.id,
      itema = that.data.stagesFinancial.thirtySixScheme,
      itemb = that.data.stagesFinancial.fortyEightScheme
      for(let i in itema){
        if(itema[i].id==index){
          itema[i].checked = true
          that.setData({
            Installmentplantetx:itema[i].sSum
          })
        }else{
          itema[i].checked=false
        }
        that.setData({
          "stagesFinancial.thirtySixScheme": itema
        })
      }
    for (let j in itemb){
        if(itemb[j].id==index){
          itemb[j].checked = true
          that.setData({
            Installmentplantetx: itemb[j].sSum
          })
        }else{
          itemb[j].checked=false
        }
      that.setData({
        "stagesFinancial.fortyEightScheme": itemb
      })
    }
  },
  // 购车优势+参数配置 + 车型图片 + 评价
  // tab1
  selected10: function (e) {
    this.setData({
      selected10: true,
      selected12: false,
      selected13: false,
      selected14: false,
    })
  },
  // tab2
  selected12: function (e) {
    this.setData({
      selected12: true,
      selected10: false,
      selected13: false,
      selected14: false
    })
  },
  // tab3
  selected13: function (e) {
    this.setData({
      selected13: true,
      selected10: false,
      selected12: false,
      selected14: false
    })
  },
  // tab4
  selected14: function (e) {
    this.setData({
      selected14: true,
      selected10: false,
      selected12: false,
      selected13: false
    })
  },
  // 产品评价
  // tab1
  selected17: function (e) {
    this.setData({
      selected16: false,
      selected15: false,
      selected17: true
    })
  },
  // tab2
  selected15: function (e) {
    this.setData({
      selected16: false,
      selected15: true,
      selected17: false
    })
  },
  // tab3
  selected16: function (e) {
    this.setData({
      selected16: true,
      selected15: false,
      selected17: false
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  getPhoneNumber:function(e){
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData) 
  },
  PhoneCallTask:function(){
    wx.showModal({
      title:'敏博实业',
      content:'17502987429',
      showCancel:true,
      success:function(e){
        if (e.confirm === true){
          wx.makePhoneCall({
            phoneNumber: '17502987429',
          })
        }
      }
    })
  },
  successfulAppointment:function(){
    wx.showToast({
      title:'预约成功', 
      mask:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://192.168.0.180:9797/product/getDetail',
      data: { 
        id: options.id
         },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:res=> {
        console.log(res.data.data.productVO.description)
        var q = res.data.data.productVO.description
        /**
        * WxParse.wxParse(bindName , type, data, target,imagePadding)
        * 1.bindName绑定的数据名(必填)
        * 2.type可以为html或者md(必填)
        * 3.data为传入的具体数据(必填)
        * 4.target为Page对象,一般为this(必填)
        * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        */
        var that = this;
        wxParse.wxParse('q', 'html', q, that, 0);
      },
      complete(res) {
        console.log(res)
      }
    })
    
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
   
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