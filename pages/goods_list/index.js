// pages/goods_list/index.js

//用户上滑页面，滚动条触底，开始加载下一页数据
    //1.先找到滚动条触底事件
    //2.判断有没有下一页数据,判断当前页码是否大于总页数
    //总页数 = math.ceil(总条数/页容量)
    //3.假如没有提示框，就弹出一个提示
    //如果有下一页数据的话要对data中的数据进行拼接，而不是替换
//下拉刷新页面
//  触发下拉刷新事件，需要在文件的json文件设置配置项
//  重置数据数组
//  重置页码
//  重新发送请求
//  数据发送回来，手动关闭请求效果
import {request} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodslist:[]

  },
  //接口要的参数
  queryparam:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  //总页数
  totalpages:0,

  /**
   * 生命周期函数--监听页面加载options拿到了上一个页面传递过来的参数
   */
  onLoad: function (options) {
    this.queryparam.cid = options.cid
    this.getgoodslist()
    

   

  },
  //获取商品列表数据
  async getgoodslist(){
    const res = await request(
      {url:'/goods/search',data:this.queryparam}
      )
      //获取总条数
      const total = res.data.message.total
      this.totalpages = Math.ceil(total/this.queryparam.pagesize)
      console.log(this.totalpages)
      this.setData({
        goodslist:[...this.data.goodslist,...res.data.message.goods]
      })
      //关闭下拉刷新的
      wx.stopPullDownRefresh()
      

  },



 
  
//标题点击事件，只不过是在子组件中传递过来的
handletabsitemchange(e){
  console.log(e)
  //获取被点击的索引
  const {index} = e.detail
  //修改原数组
  let {tabs} = this.data
  tabs.forEach((v,i) => {i===index?v.isActive=true:v.isActive=false})
  //赋值到data中
  this.setData({
    tabs
  })
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
    //重置数组
    this.setData({
      goodslist:[]
    })
    //重置页码
    this.queryparam.pagenum = 1
    //重新发送请求
    this.getgoodslist()

  },

  
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


   //页面上划到底的事件
   onReachBottom(){
     //判断当前页码是否是总页数
     if(this.queryparam.pagenum >= this.totalpages){
      wx.showToast({
        title: '没有下一页数据了'
        
      });

     }else{
       this.queryparam.pagenum++
       this.getgoodslist()
     }
    

  }
})