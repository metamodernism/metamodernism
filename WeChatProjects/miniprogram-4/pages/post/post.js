// pages/post/post.js

let app = getApp()

Page({

formSubmit: function (event) {
  console.log(event.detail.value.name)
  console.log(event.detail.value.content)

    let name = event.detail.value.name 
    let content = event.detail.value.content 

    app.globalData.moods.unshift({content,name})

    let moods = wx.getStorageSync("moods") || []

    moods.unshift({content, name})

    wx.setStorageSync('moods', moods)
      //storing in global data//

    wx.switchTab({
      url: '/pages/moods/moods',
    })
  },


  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(app.globalData.moods)
    this.setData({moods:app.globalData.moods})
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