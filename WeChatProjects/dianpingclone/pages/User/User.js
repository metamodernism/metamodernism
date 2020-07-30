// pages/User/User.js
Page({

  /**
   * Page initial data
   */
  data: {
    currentUser: null,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    const app = getApp();

    console.log('userData', app.globalData.userInfo);
  },
  // after logging in and getting currentUser from the Baas

// user.js, after onLoad()
userInfoHandler(data) {
  wx.BaaS.auth.loginWithWechat(data).then(user => {
    console.log('user', user);
    this.setData({
      currentUser: user,
    })
  }, err => {
  })
},

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})