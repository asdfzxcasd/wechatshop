// pages/category/index.js
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单数据
    leftlist:[],
    //右侧商品数据
    rightcontent:[],
    //被电击的左侧菜单
    currentIndex:0,
    //右侧滚动条据顶部距离
   
    top:0

  },
  //接口返回数据
  Cates:[],


  // 获取分类数据
  getcates(){
    request({
      url:'/categories'
    })
    .then(res=>{
      this.Cates = res.data.message
      //把接口的数据存到本地中
      wx.setStorageSync("cates", {time:Date.now(),data:this.Cates});
      //构造左侧的大菜单数据
      let leftlist = this.Cates.map(v=>v.cat_name);
      //构造右侧的商品数据
      let rightcontent = this.Cates[0].children;
      this.setData({
        leftlist,
        rightcontent,
        top:0
      })
    })

  },
  handleitem(e){
    
    
    //获取被点击的标题的索引
    //给data中的currrnt赋值
    const {index} =e.currentTarget.dataset
    let rightcontent = this.Cates[index].children;
    
    
    this.setData({
      currentIndex:index,
      rightcontent
    })
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   * 缓存：
   *    先判断本地储存中有没有旧的数据
   *    没有旧数据就发送新请求
   *    如果有旧的数据，并且也没过期，就是用本地的旧数据
   */
  onLoad: function (options) {
    //web中的本地存储和小程序中的本地存储的区别
    //    写代码的方式不一样
    //      web:localstorage.setItem("key","value") localstorage.getItem("key")
    //      小程序：wx.getStorageSync("cates")   wx.setStorageSync("key", {time:Data.now(),data:this.Cates})
    //    存的时候有没有类型转换
    //        web：不管存的什么方法，都会调用tostring方法，把数据变成字符串
    //        小程序：不存在类型转换，有什么数据进去
    //this.getcates();
    //获取本地存储的数据
    const Cates = wx.getStorageSync("cates");
    //判断
    if(!Cates){
      //不存在发送请求数据，发送请求获取数据
      this.getcates();
    }else{
      //有旧的数据定义过期时间
      if(Date.now()-Cates.time>1000*100){
        //重新发送请求
        this.getcates();
      }else{
        //可以使用旧的数据
        // console.log("可以使用")
        this.Cates=Cates.data;
        let leftlist = this.Cates.map(v => v.cat_name);
        //构造右侧的商品数据
        let rightcontent = this.Cates[0].children;
        this.setData({
          leftlist,
          rightcontent
        })
      }
    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})