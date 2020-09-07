// pages/cart/index.js


import {getSetting,chooseAddress,openSetting,showToast} from "../../utils/ansyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allchecked:false,
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
      allchecked,
      allprice,
      allnum
    
      
      
    })

  },

  
  //1.获取用户收货地址
  //  绑定点击事件
  //  触发小程序内部api
  //  获取用户对小程序所授予的权限状态scope
  //  假设用户点击获取收货地址的提示框用户点击的是确定scope为true
  //  假设用户点击获取收货地址的提示框用户点击的是取消scope为false
  //  假设用户第一次点击获取收货地址，scope是udefind
  //2.点击收货地址触发的事件
  //  页面加载完毕之后获取本地存储的地址数据
  //  把数据设置给data中的一个变量
  //3.onshow获取缓存中的购物车数组
  //  把购物车数据填充到data中
  //4.全选事件的实现
  //5.总价格和总数量
  //  都需要商品被选中才会计算
  //  获取购物车数组
  //  遍历
  //  判断商品是否被选中
  //6.商品的选中功能
  //  绑定change事件
  //  获取到被修改的数据
  //  商品对象的选中状态做一个取反
  //  重新填充到data中和缓存中
  //  重新计算总价格
  //7.全选和反选
  //  给全选绑定是按
  //  获取data的全选变量allchecked
  //  遍历购物车数组让里面状态跟随allchecked改变
  //  把购物车和allchecked重新设置到data中
  //8.商品数量的编辑功能
  //  +-绑定同一个点击事件，区分的关键就在于自定义属性
  //  传递被点击的商品id
  //  获取data中的购物车数组
  //  直接修改商品对象
  //  把购物车重新设置到data中和缓存中
  //  当商品数量为1时，用户在点击减号，提示是否删除
  //9.点击结算
  //  判断有没有商品和收货地址
    async handleaddress(){
      try {
      //1.获取权限状态
      //  如果发现属性名比较怪异的时候，要用方括号括起来
      //1.获取权限状态
      const res1 = await getSetting()
      const scopeaddress = res1.authSetting["scope.address"]
      //2.判断权限状态
      if(scopeaddress===true||scopeaddress===undefined){
        //3.调用获取收货地址的api
        const address = await chooseAddress()
        wx.setStorageSync("address", address);
      }else{
        //4.先诱导用户打开权限
        await openSetting()
        //重新调用获取用户地址的api
        const address = await chooseAddress()
        wx.setStorageSync("address", address);
      }
      
      //把地址存入到缓存中
      //wx.setStorageSync("address", address);
    }
     catch (error) {
    console.log(error)   
  } 
    
  },
  //商品的选中
  handlechange(e){
    //获取被修改的商品的id
    let goods_id = e.currentTarget.dataset.id
    //获取购物车数组
    let {cart} = this.data
    //找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id)
    //选中状态取反
    cart[index].checked = !cart[index].checked
    //把购物车数据重新设置到data中和缓存中
    
    wx.setStorageSync("cart", cart);


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
      cart,
      allchecked,
      allnum,
      allprice
    })
    console.log(789456)
    console.log(e)


  },
  //全选按钮操作
  handleallchange(){
    //获取data中的数据
    let{cart,allchecked} = this.data
    allchecked=!allchecked
    //循环修改商品选中状态
    cart.forEach(v=>v.checked=allchecked)
    //把修改后的值重新填充到data中或者缓存中



    
    //总价格，总数量
    let allprice = 0
    let allnum = 0
    cart.forEach(v => {
      if(v.checked){
        allprice+=v.num*v.goods_price
        allnum +=v.num
      }
      
    });




    
    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      allchecked,
      allnum,
      allprice

    })
  },


  //点击结算按钮
  async handlepay(){
    //判断收货地址
    const {address,allnum} = this.data
    if(!address.userName){
      await showToast({title:"您还没有填写收货地址"})
      return;
    }
    //判断用户有没有选购商品
    if(allnum===0){
      await showToast({title:"您还没有选购商品"})
      return;

    }
    //跳转到支付界面
    wx.navigateTo({
      url: '/pages/bay/index',
    });

  },
  
  //商品数量的编辑功能
  handlejianadd(e){

    const {operation,id} = e.currentTarget.dataset
    //获取购物车数组
    let {cart} = this.data
    //找到需要修改的商品的索引
    const index = cart.findIndex(v=>v.goods_id===id)
    //进行修改数量
    if(cart[index].num===1 && operation===-1){
      wx.showModal({
        title: '提示',
        content: '是否删除本商品',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#3CC51F',
        success: (result) => {
          if(result.confirm){
            console.log(205)
            cart.splice(index,1)


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




    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      allchecked,
      allnum,
      allprice

    })
           
            
          }else{
            console.log("确认删除")
          }

        }
        
      });
    }
    cart[index].num+=operation
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

    wx.setStorageSync("cart", cart);
    this.setData({
      cart,
      allchecked,
      allnum,
      allprice

    })
 
    console.log(operation,id)
  }
 
  

})