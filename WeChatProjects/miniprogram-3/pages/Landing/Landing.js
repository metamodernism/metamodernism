// pages/landing/landing.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {

    title: "F*** my code",
    description: "Share your horror stories when writing code at Le Wagon",
    cta: "Start here"

  },
  getUserInfo: function (e) {

    console.log(e)

    // wx.getLocation({
    //   success: function(res) {
    //     console.log(res);
    //   },
    // })

    app.globalData.userInfo = e.detail.userInfo

    this.setData({
      userInfo: e.detail.userInfo
    })

    wx.switchTab({
      url: '/pages/stories/stories',
    })

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

    // console.log("Landing page is loading", Date.now())

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

    // console.log("Landing page is Ready!!!", Date.now())

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

    // console.log("Landing page is SHOWING", Date.now())

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

    // console.log("Landing page is hidding....", Date.now())

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