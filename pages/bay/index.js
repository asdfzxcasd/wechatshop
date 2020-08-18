// pages/cart/index.js

//页面加载时获取缓存中购物车数据，渲染到页面中
import {getSetting,chooseAddress,openSetting,showToast} from "../../utils/ansyncWx"
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow(){
    //获取缓存中的收货地址
    const address = wx.getStorageSync("address");
    //获取缓存中购物车的数据
    const cart = wx.getStorageSync("cart")||[];
    //every方法是一个数组方法，会遍历，会接收一个回调函数，每一个
    //回调函数都返回true，那么every返回值为true
    //空数组调用every，返回值为true
    const allchecked = cart.length?cart.every(v=>v.checked):false
    //总价格，总数量
    let allprice = 0
    let allnum = 0
    cart.forEach(v => {
      if(v.checked){
        allprice+=v.num*v.goods_price
        allnum +=v.num
      }
      
    });
    this.setData({
      address,
      cart,
      allprice,
      allnum
    })

  },
})