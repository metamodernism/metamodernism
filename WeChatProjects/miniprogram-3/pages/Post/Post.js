// pages/post/post.js

const app = getApp();

Page({

  /**
   * Page initial data
   */
  data: {
    
  },
  formSubmit: function (event) {

    console.log(event.detail.value.name)
    console.log(event.detail.value.content)

    let name = event.detail.value.name
    let content = event.detail.value.content

    app.globalData.stories.unshift({content, name})

    // STORING IN GLOBAL DATA

    let stories = wx.getStorageSync("stories") || []

    stories.unshift({content, name})

    wx.setStorageSync('stories', stories)

    // STORING IN CACHE

    wx.switchTab({
      url: '/pages/stories/stories',
    })

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo.nickName)
    this.setData({userInfo: app.globalData.userInfo})
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