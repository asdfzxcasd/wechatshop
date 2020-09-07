// pages/cart/index.js

//页面加载时获取缓存中购物车数据，渲染到页面中
//  这些checked属性必须为true
//微信支付
//  哪些人，哪些账号可以进行微信支付
//    企业账号
//    企业账号的后台中，必须给开者添加上白名单
//    一个appid可以同时绑定多个开发者
//支付流程
//创建订单  准备预支付，发起微信支付，查询订单
//支付按钮
//  先判断缓存中有没有token
//  没有token的话跳转到授权页面获取到token

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allprice:0,
    allnum:0

  },

  

  onShow(){
    //获取缓存中的收货地址
    const address = wx.getStorageSync("address");
    //获取缓存中购物车的数据
    let cart = wx.getStorageSync("cart")||[];
    //获取过滤后的购物车数组
    cart = cart.filter(v=>v.checked)
    //every方法是一个数组方法，会遍历，会接收一个回调函数，每一个
    //回调函数都返回true，那么every返回值为true
    //空数组调用every，返回值为true
    //总价格，总数量
    let allprice = 0
    let allnum = 0
    cart.forEach(v => {
        allprice+=v.num*v.goods_price
        allnum +=v.num
    });
    this.setData({
      address,
      cart,
      allprice,
      allnum
    })

  },
  handleorderpay(){
    //判断缓存中有没有token
    const token = wx.getStorageSync("token")
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index'
      });
      return;
    }
    console.log("已经存在token")
  }
})