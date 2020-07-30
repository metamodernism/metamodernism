//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    stories: []
  },
  
  getRequestData: function (res) {
    console.log(res);
    this.setData({
      stories: res.data.objects
    });
  },
  
  onLoad: function () {

    const story = new wx.BaaS.TableObject('stories');

    story.find().then((res) => {
      console.log('res', res);
      this.setData({
        stories: res.data.objects
      })
    })

    console.log('first!');

  },

  toStory: function(e) {
    console.log('e', e);
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail?id+=' + id,
    })
  },

    showStory(event) {
      let data = event.currentTarget.dataset;
      let id = data.id;
  
      wx.navigateTo({
        url: `/pages/story/story?id=${id}`
      });
    },
  })

