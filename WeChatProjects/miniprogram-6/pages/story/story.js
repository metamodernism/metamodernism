Page({
  data: {
    story: {},
    comments: []
  },

   onLoad: function (options) {

    let id = options.id; 
    const story = new wx.BaaS.TableObject('stories');

    story.get(id).then((res) => {
      console.log('story res', res);
      this.setData({
        story: res.data
      })
    })

    console.log('first!');

    let tableComments = 'comments'
    let comment = new wx.BaaS.TableObject('comments');
    let query = new wx.BaaS.Query();
    query.compare('stories_id', '=', id);

    comments.setQuery(query).find().then((res) => {
      console.log('comments res', res);
      this.setData({
        items: res.data.objects,
      })
    });
  },
})


  // binded to delete button
   //deleteComment(event) {
    //let data = event.currentTarget.dataset;

    // make a DELETE request
    //wx.request({
      //url: `https://cloud.minapp.com/oserve/v1/table/85188/record/${data.id}`,
      //method: 'DELETE',
      //header: {'Authorization':'Bearer 7a82a2b76c38e309ae34ff3c83c87f8409748b0e'}, // API key from Above

      //success() {
        // no need for response data
        // redirect to index page when done
        //wx.redirectTo({
          //url: '/pages/index/index'
       // });
    //  }
    //});
//  },
//})
