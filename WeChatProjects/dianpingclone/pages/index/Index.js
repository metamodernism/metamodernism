// pages/index/Index.js

Page({
/**
   * Page initial data
   */
  data: {
    restaurants: []
  },
  
  getRequestData: function (res) {
    console.log(res);
    this.setData({
      restaurants: res.data.objects
    });
  },
  
  onLoad: function (options) {
/**
   * Lifecycle function--Called when page load
   */

    const restaurants = new wx.BaaS.TableObject('restaurants');

    restaurants.find().then((res) => {
      console.log('res', res);
      this.setData({
        restaurants: res.data.objects
      })
    })
    console.log('first!');

  },

    showRestaurant(event) {
      let data = event.currentTarget.dataset;
      let id = data.id;
      wx.navigateTo({
        url: `/pages/Restaurant/Detail?id=${id}`
      });
    },
  })


  // 