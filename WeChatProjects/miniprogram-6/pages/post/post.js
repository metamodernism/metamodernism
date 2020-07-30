// pages/post/post.js
let app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {

  },


  formSubmit: function (event) {
    // DID WE GET IT?
    console.log(event.detail.value.name)
    console.log(event.detail.value.content)

    let name = event.detail.value.name
    let content = event.detail.value.content
    debugger;
    let story = {
      name: name,
      text: content
    }
    const request = {
      url: `https://fml.shanghaiwogeng.com/api/v1/stories`,
      method: 'POST',
      data: story,
      success() {
        wx.navigateTo({
          url: '/pages/index/index'
        }); 
        }
      }
      wx.request(request);
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