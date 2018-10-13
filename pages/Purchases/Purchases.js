// pages/Purchases/Purchases.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showconfirmbar:false,
    array: ['西安','咸阳','宝鸡','延安','榆林','渭南','铜川','汉中','安康','商洛'],
    index: 0,
    multiArraya: [['大众', '奔驰'], ['途观', '朗逸', '迈腾', '速腾', '宝来']],
    multiArrayb: [['大众', '奔驰'], ['途观', '朗逸', '迈腾', '速腾', '宝来']],
    multiArrayc: [['大众', '奔驰'], ['途观', '朗逸', '迈腾', '速腾', '宝来']],
    multiIndexa: [0, 0],
    multiIndexb: [0, 0],
    multiIndexc: [0, 0],
    ScheduleCarPurchases:[
      {
        name: '一个月内',
        value:'一个月内',
        checked: false 
      },
      {
        name: '两个月内',
        value: '两个月内',
        checked: false 
      },
      {
        name: '半年内',
        value: '半年内',
        checked: false
      },
      {
        name: '一年以上',
        value: '一年以上',
        checked: false   
      }
    ],
    paymentMethod: [
      {
        name: '全款',
        value: '全款',
        checked: false
      },
      {
        name: '分期',
        value: '分期',
        checked: false
      }
    ],
    // from表单数据
    fromData:{
      arrays: '', //提车地区
      carArraya:{  //意向车型：车型一
        carBrand:'',
        carType :''
      },
      carArrayb: {  //意向车型:车型二
        carBrand: '',
        carType: ''
      },
      carArrayc: {  //意向车型：车型三
        carBrand: '',
        carType: ''
      }
    },
    cartime: '',// 计划购车时间
    carWay:''//计划购车方式
  },
  // 提车地区
  bindPickerChange: function (e) {
    var that=this,
        arrayindex = that.data.array,
        i = e.detail.value
    that.setData({
      index: i
    })
    that.setData({
      ["fromData.arrays"] : arrayindex[i]
    })
  },
  // 意向车型
  // 意向车型一
  bindMultiPickerChangea:function(e){
    var that=this
    that.setData({
      multiIndexa: e.detail.value
    })
    var itemvaluea = e.detail.value[0],
        itemvalueb = e.detail.value[1],
        item = that.data.multiArraya
    that.setData({
      ["fromData.carArraya.carBrand"]: item[0][itemvaluea],
      ["fromData.carArraya.carType"]: item[1][itemvalueb],
    })
  },
  bindMultiPickerColumnChangea:function(e){
    var that = this
    var data = {
      multiArraya: that.data.multiArraya,
      multiIndexa: that.data.multiIndexa
    };
    data.multiIndexa[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndexa[0]) {
          case 0:
            data.multiArraya[1] = ['途观', '朗逸', '迈腾', '速腾', '宝来'];
            break;
          case 1:
            data.multiArraya[1] = ['奔驰C级', '奔驰E级', '奔驰GLC', '奔驰GLA', '奔驰S级'];
            break;
        }
        data.multiIndexa[1] = 0;
        break;
    }
    that.setData(data);
  },
  // 意向车型二
  bindMultiPickerChangeb: function (e) {
    var that=this
    that.setData({
      multiIndexb: e.detail.value
    })
    var itemvaluea = e.detail.value[0],
        itemvalueb = e.detail.value[1],
        item = that.data.multiArrayb
    that.setData({
      ["fromData.carArrayb.carBrand"]: item[0][itemvaluea],
      ["fromData.carArrayb.carType"]: item[1][itemvalueb],
    })
  },
  bindMultiPickerColumnChangeb: function (e) {
    var that = this
    var data = {
      multiArrayb: that.data.multiArrayb,
      multiIndexb: that.data.multiIndexb
    };
    // console.log(data)
    data.multiIndexb[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndexb[0]) {
          case 0:
            data.multiArrayb[1] = ['途观', '朗逸', '迈腾', '速腾', '宝来'];
            break;
          case 1:
            data.multiArrayb[1] = ['奔驰C级', '奔驰E级', '奔驰GLC', '奔驰GLA', '奔驰S级'];
            break;
        }
        data.multiIndexb[1] = 0;
        break;
    }

    that.setData(data);
  },
  // 意向车型三
  bindMultiPickerChangec: function (e) {
    console.log(e)
    console.log(this.data.multiArrayc)
    var that = this
    that.setData({
      multiIndexc: e.detail.value
    })
    var itemvaluea = e.detail.value[0],
        itemvalueb = e.detail.value[1],
        item = that.data.multiArrayc
    that.setData({
      ["fromData.carArrayc.carBrand"]: item[0][itemvaluea],
      ["fromData.carArrayc.carType"]: item[1][itemvalueb],
    })
  },
  bindMultiPickerColumnChangec: function (e) {
    var that = this
    var data = {
      multiArrayc: that.data.multiArrayc,
      multiIndexc: that.data.multiIndexc
    };
    // console.log(data)
    data.multiIndexc[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndexc[0]) {
          case 0:
            data.multiArrayc[1] = ['途观', '朗逸', '迈腾', '速腾', '宝来'];
            break;
          case 1:
            data.multiArrayc[1] = ['奔驰C级', '奔驰E级', '奔驰GLC', '奔驰GLA', '奔驰S级'];
            break;
        }
        data.multiIndexc[1] = 0;
        break;
    }

    that.setData(data);
  },
  // 计划购车时间
  radioChangePurchases: function (e) {
    var that = this,
        items = this.data.ScheduleCarPurchases,    //获取计划购车时间的value   
        checkArr = e.detail.value;                  //获取点击的value值
    // 计划购车时间的判断
    for (let i in items){
      if (items[i].value == checkArr){
          items[i].checked=true;
        that.setData({
          ["fromData.cartime"]: items[i].value
        })
      }else{
        items[i].checked=false;
      }
      
    }
    // data值的改变
    that.setData({
      ScheduleCarPurchases: items
    })
    console.log(that.data.fromData.cartime)
  },
  //付款方式的事件
  radioChangeMethod:function(e){
      var that=this,
          them = this.data.paymentMethod,             //获取付款方式的value 
          checkArr = e.detail.value;                  //获取点击的value值
    // 付款方式的判断
    for (let i in them) {
      if (them[i].value == checkArr) {
        them[i].checked = true;
        that.setData({
          ["fromData.carWay"]: them[i].value
        })
      } else {
        them[i].checked = false;
      }
    }
    // data值的改变
    that.setData({
      paymentMethod: them
    })
  },
  // 表单提交
  fromsubmit:function(){
    var StorageSyncUserData = wx.getStorageSync("logindata")
    if (StorageSyncUserData!=200){
      this.setData({
        indexloginPage: ""
      })
    }else{
      this.setData({
        indexloginPage: "index-loginPage"
      })
    }
  },
  // 模态窗口获取模板实例
  myEventListener: function (e) {
    var items = e.detail
    if (items != 200 && items != 1) {
      this.setData({
        indexloginPage: ""
      })
    } else {
      this.setData({
        indexloginPage: "index-loginPage"
      })
    }
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
// // 用户输入手机号正则验证
// phonenumber: function (e) {
//   var phonei = e.detail.value
//   this.setData({
//     ["userphong.Phong"]: phonei
//   })
// },
// sendVerificationCode: function() {
//   // 手机号正则判断
//   var Phoneindex = this.data.userphong;
//   if (!Phoneindex.get_code_status) {
//     wx.showToast({
//       title: '正在获取',
//       icon: 'loading',
//       duration: 1000
//     })
//     return;
//   } else {
//     if (Phoneindex.Phong.length == 11) {
//       var myreg = /^1(3|4|5|7|8)\d{9}$/;
//       if (!myreg.test(Phoneindex.Phong)) {
//         wx.showToast({
//           title: '请输入正确的手机号',
//           icon: 'none',
//           duration: 1000
//         });
//         return;
//       } else {
//         this.sendCode();
//       }
//     } else {
//       wx.showToast({
//         title: '请输入完整手机号',
//         icon: 'none',
//         duration: 1000
//       })
//       return;
//     }
//   }
// },
// sendCode: function() {
//   var that = this;
//   wx.request({
//     url: '',
//     data: {
//       mobile: that.data.userphong.Phong
//     },
//     success: function (res) {
//       if (res.data.status == 1) {
//         var timer = setInterval(function () {
//           if (that.data.get_code_time > 0) {
//             // console.log(that.data.get_code_time);
//             that.setData({
//               userphong: {
//                 get_code_time: that.data.get_code_time - 1,
//                 show_get_code: '剩余' + (that.data.get_code_time - 1) + '秒',
//                 get_code_status: false
//               }
//             });
//           } else {
//             clearInterval(timer);
//             that.setData({
//               userphong: {
//                 ["userphong.get_code_time"]: 60,
//                 ["userphong.show_get_code"]: '获取验证码',
//                 ["userphong.get_code_status"]: true
//               }
//             });
//           }
//         }, 1000);
//         that.setData({
//           userphong: {
//             ["userphong.login_code"]: res.data.data.code   //后台返回的验证码，可以做判断用
//           }
//         });
//       } else {
//         wx.showToast({
//           title: res.data.message,
//           icon: 'loading',
//           duration: 1000
//         });
//       }
//     },
//     fail: function (res) {
//       wx.showToast({
//         title: '请求失败',
//         icon: 'loading',
//         duration: 1000
//       })
//     },
//   })
// },