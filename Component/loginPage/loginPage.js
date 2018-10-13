// Component/loginPage/loginPage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    userphong: {
      Phong: '',//输入的手机号
      get_code_time: 60,
      login_code: null,         //传过来的验证码
      // input_login_code: '',     //后台返回的验证码
      get_code_status: true,    //是否能点击获取验证码的状态判断
      show_get_code: '获取验证码',
      Phongcode:""              //用户输入的验证码
    },
  },

  /**
   * 组件的方法列表
   */
 
  methods: {
  //  手机号输入value值获取事件
    phone:function(e){
     var phoneindex = e.detail.value
     this.setData({
       ["userphong.Phong"]: phoneindex
     })
    },
    // 点击获取验证码
    fromsubmit:function(){
    // 手机号正则判断
      var Phoneindex = this.data.userphong;
      console.log(Phoneindex.Phong)
      if (!Phoneindex.get_code_status) {
        wx.showToast({
          title: '正在获取',
          icon: 'loading',
          duration: 1000
        })
        return;
      } else {
        if (Phoneindex.Phong.length == 11) {
          var myreg = /^1(3|4|5|7|8)\d{9}$/;
          if (!myreg.test(Phoneindex.Phong)) {
            wx.showToast({
              title: '请输入正确的手机号',
              icon: 'none',
              duration: 1000
            });
            return;
          } else {
            this.sendCode();
          }
        } else {
          wx.showToast({
            title: '请输入完整手机号',
            icon: 'none',
            duration: 1000
          })
          return;
        }
      }
    },
sendCode:function(){
  var that=this
    wx.request({
      url: 'http://192.168.0.182:9595/SMSserding/send',
      data: {
        phoneNumber: this.data.userphong.Phong
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
        var timer = setInterval(function () {
          if (that.data.userphong.get_code_time > 0) {
            // console.log(that.data.userphong.get_code_time);
            that.setData({
                ["userphong.get_code_time"]: that.data.userphong.get_code_time - 1,
                ["userphong.show_get_code"]: '剩余' + (that.data.userphong.get_code_time - 1) + '秒',
                ["userphong.get_code_status"]: false
            });
          } else {
            clearInterval(timer);
            that.setData({
                ["userphong.get_code_time"]: 60,
                ["userphong.show_get_code"]: '获取验证码',
                ["userphong.get_code_status"]: true
            });
            console.log(that.data.userphong)
          }
        }, 1000);
        // that.setData({
        //     ["userphong.login_code"]: res.data.code   //后台返回的验证码，可以做判断用
        // });
      } else {
        wx.showToast({
          title: '短信发送失败',
          icon: 'loading',
          duration: 1000
        });
      }
      },
      fail(res) {
        wx.showToast({
          title: '请求失败',
          icon: 'loading',
          duration: 1000
        })
      }
    })
},
    // 验证码输入value获取事件
    seocd:function(e){
     var item=e.detail.value
     this.setData({
       ["userphong.Phongcode"]: item
     })
    },
    // 登录判断
    register: function () {
      var that=this
      wx.request({
        url: 'http://192.168.0.182:9595/SMSserding/receive',
        data: {
          phoneNumber: this.data.userphong.Phong,
          phoneCode: this.data.userphong.Phongcode
        },
        header:{
          'content-type': 'application/json'
        },
        success(res){
          var modalDetail = res.data.code,
            id = that.data.userphong.Phong
          that.triggerEvent("myevent", modalDetail)
          wx.setStorageSync("logindata", modalDetail,id)
        },
        fail(res) {
          wx.showToast({
            title: '请求失败',
            icon: 'loading',
            duration: 1000
          })
        }
      })
    },
    move:function(e){
      
    },
    // 模态窗口关闭
    closemodal: function (e) {
      console.log(e)
      var modalDetail = e.target.id
      this.triggerEvent("myevent", modalDetail)
    }
  }
})
