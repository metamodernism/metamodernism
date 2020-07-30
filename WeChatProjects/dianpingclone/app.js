//app.js
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    wx.BaaS.wxExtend(wx.login,
     wx.getUserInfo,
     wx.requestPayment)

    wx.BaaS.init('a0cae729d2cc3f2f52e1')

    wx.BaaS.auth.loginWithWechat().then(user => {
      //save user data to globalData 
      this.globalData.userInfo = user;
      //save user data to Phone Storage,
      //two parameters: (key, data)
      wx.setStorageSync('userInfo', user);
      console.log('logged in from app.js', user);
    }, err => {
      console.log('fail login');
    }) 
    

  },
  globalData: {
    //retrieve userInfo storage, one parameter:
    // (key) 
    userInfo: wx.getStorageSync('userInfo') || null,
  }
})

