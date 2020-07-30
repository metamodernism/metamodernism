// pages/Restaurant/Detail.js
const app = getApp();

Page({
  data: {
    currentUser: {},
    restaurants: {},
    reviews: [],
    ratings: [1, 2, 3, 4, 5],
    rating: 'None',
    meals: [],
    newReviews: []
  },

   onLoad: function (options) {
     this.setData({
       currentUser: app.globalData.userInfo,
     });


    let id = options.id; 
    const restaurant = new wx.BaaS.TableObject('restaurants');
    const reviews = new wx.BaaS.TableObject('reviews');
    const meals = new wx.BaaS.TableObject('meals');


    restaurant.get(id).then((res) => {
      console.log('restaurants res', res);
      this.setData({
        restaurants: res.data,
      })
    })
    

  console.log('first!');

  let query = new wx.BaaS.Query();
  query.compare('restaurant_id', '=', id);

  reviews.setQuery(query).find().then((res) => {
  console.log('reviews res', res);
  this.setData({
       reviews: res.data.objects
    })
   })

//  we don't need to create another query, because the
//     one above already works for us

    Meals.setQuery(query).find().then((res) => {
      this.setData({
        meals: res.data.objects,
      })
    });
  
},

createOrder: function(e) {

  const mealId = e.currentTarget.dataset.id;
  let Orders = new wx.BaaS.TableObject('orders');

  let newOrder = Orders.create();

  const orderData = {
    quantity: 1,
    meal_id: mealId,
  };

  newOrder.set(orderData);

  newOrder.save().then((res) => {
    wx.showToast({
      title: 'Order Sent!',
      icon: 'success',
      duration: 2000,
      mask: true,
    });
  })
},
createReview: function(e) {
  console.log('create review', e);
  const content = e.detail.value.content;
  
  let reviews = new wx.BaaS.TableObject('reviews');

  let newReview = reviews.create();


  const data = {
    restaurant_id: this.data.restaurants.id,
    rating: this.data.rating,
    content: content,
    user_id: this.data.currentUser.id,
  }
  console.log('data', data);
  newReview.set(data);

  newReview.save().then((res)=> {
    console.log('save res', res);

     // since you can't push to an array in the
      // page data, we have to save the array
      // and then push the new item and re-set
      // the data.

    const newReviews = this.data.reviews;

    newReviews.push(res.data);

    this.setData({
      reviews: newReviews,
    })
  })
},

onRate: function(e) {
  console.log('change rating', e);
  const index = e.detail.value;
  this.setData({
    rating: this.data.ratings[index],
  })
},
//  user.js, after onLoad()

userInfoHandler(data) {
  wx.BaaS.auth.loginWithWechat(data).then(user => {
    console.log('user', user);
    this.setData({
      currentUser: user,
    })
  }, err => {
  
  })
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