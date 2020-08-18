// pages/goos_detail/index.js
import {request} from "../../request/index.js"
//点击轮播图预览大图
//   给轮播图绑定单击事件
//   调用小程序api previewImage
//点击加入购物车
//  先绑定点击事件
//  获取缓存中的购物车数据 数组格式
//  先判断商品是否已经存在于购物车里
//  如果已经存在，修改商品数据，执行购物车数量++，重新把购物车数组，填充回缓存中
//  不存在于购物车的数组中，直接给购物车数组添加一个新元素，新元素带上购买数量属性
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataobj:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id)
    this.getgoodsdetail(goods_id)

  },
  goodsobj:{},
  //获取商品详情数据
  async getgoodsdetail(goods_id){
    const dataobj = await request({url:'/goods/detail',data:{goods_id}})
    this.goodsobj = dataobj
    console.log(dataobj)
    this.setData({
      dataobj:{
        pics:dataobj.data.message.pics,
        goods_price:dataobj.data.message.goods_price,
        goods_name:dataobj.data.message.goods_name,
        goods_introduce:dataobj.data.message.goods_introduce.replace(/\.webp/g,'.jpg')
        //ipone部分手机不识别webp格式文件
        //最好找到后台，让他改
        //自己也可以临时改，


      }
    })
    
    
  },

  handlepreviewImage(e){
    //先构造要预览的图片的数组
    //接收传递过来的url
    const current = e.currentTarget.dataset.url;
    
    const urls = this.goodsobj.data.message.pics.map(v => v.pics_mid)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })

  },
  //点击加入购物车
  handlecardadd(){
    //获取缓存中的购物车
    
    let cart = wx.getStorageSync("cart")||[];
    //判断商品对象是否存在于数组中
    let index = cart.findIndex(v => v.goods_id===this.goodsobj.data.message.goods_id)
    console.log(index)
    if(index === -1){
      //不存在第一次添加
      console.log(1)
      this.goodsobj.data.message.num =1
      this.goodsobj.data.message.checked =true
      
      cart.push(this.goodsobj.data.message)
      console.log(cart)
      
    }else{
      //已经存在数据
      console.log(2)
      cart[index].num++
      console.log(cart)
    }
    //把购物车数据重新添加到缓存中
    wx.setStorageSync("cart",cart)
    //弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
     
      //mast,防止用户一直点击
      mask: true
  
     
    });

  }
})