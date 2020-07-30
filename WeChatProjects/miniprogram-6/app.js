//app.js
App({
  onLaunch: function () {
    require('./sdk-wechat.3.12.0');
    let clientID = 'c625ed2760f353564734'
    wx.BaaS.init(clientID)
    console.log('App loaded.');
  },
  globalData: {
    stories: [
      { content: "OMG!!", name: "Yinghui" },
      { content: "Are you sure?", name: "Sophia" }
    ]
  }
})