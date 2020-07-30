// pages/landing/landing.js
Page({
  clickMe: function() {
    this.setData({ text: "Enter" })

  },

  data: {
    title: 'Mindpaths',
    description: 'Mood diary',
    cta: 'Enter',
  },

  //landing.js
goToMoodsPage: function() {
  wx.navigateTo({
    url: '/pages/moods/moods'
  })
},

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

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