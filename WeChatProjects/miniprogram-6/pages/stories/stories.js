Page({

  getRequestData: function (res) {
  console.log(res);
  this.setData({
    stories: res.data.objects
  });
},

onLoad: function () {
    let page = this;
    const request = {
      url: `https://cloud.minapp.com/oserve/v1/table/84988/record/`,
      method: 'GET',
      header: { 'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e' },
      success: page.getRequestData
    }
    wx.request(request);
  },

  showStory(event) {
    let data = event.currentTarget.dataset;
    let id = data.id;
  }
})