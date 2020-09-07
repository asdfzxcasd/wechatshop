//Page Object
//引入用来请求的方法
import {request} from "../../request/index.js"
Page({
  data: {
    //轮播图数组
    swiperlist:[],
    cateslist:[],
    floorlist:[],
    zuixin:'最新爆款',
    renqi:'人气最高',
    
    hover:true,
    goodslist:[],
    //进度条
    speed:20,
    //原价
    original:3800,
    // 已拼团
    already:250
    
    
  },

//接口要的参数
queryparam:{
  query:"",
  cid:"1113",
  pagenum:1,
  pagesize:10
},
//总页数
totalpages:0,


  //options(Object)
  //页面加载时就会触发的事件
  onLoad: function(options){
    //1.发送异步请求获取轮播图数据,但是容易陷入回调地狱，用er6优化
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
    //     this.setData({
    //       swiperlist:result.data.message
    //     })
        
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });
    this.getswiperlist();
    this.getcateslist();
    this.getfloorlist();
    this.setData({noricelist:[{"id":1,
    "noricecontent":"大家好，从现在开始，小程序正式上线了请大家多多支持我们"},
    {"id":2,
    "noricecontent":"想怎么玩就怎么玩"}
    ]});
    this.getgoodslist()

  },
  //获取轮播图数据
  getswiperlist(){
    request({url:'/home/swiperdata'})
    .then(result=>{
      this.setData({
        swiperlist:result.data.message
      })
    })
  },
  //获取分类数据
  getcateslist(){
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
        cateslist:result.data.message
      })
    })
  },
  //获取楼层数据
  getfloorlist(){
    request({url:'/home/floordata'})
    .then(result=>{
      this.setData({
        floorlist:result.data.message
      })
    })
  },

  //item(index,pagePath,text)
  
  handle(res){
    const ney = res.currentTarget.dataset.new
    if(ney==='1'){
      
      this.setData({
        hover:true
      })
    }
    else if(ney==='2'){
      
      this.setData({
        hover:false
      })
    }
   
  },
  async getgoodslist(){
    const res = await request(
      {url:'/goods/search',data:this.queryparam}
      )
      console.log(res)
      //获取总条数
      const total = res.data.message.total
      this.totalpages = Math.ceil(total/this.queryparam.pagesize)
      console.log(this.totalpages)
      this.setData({
        goodslist:[...this.data.goodslist,...res.data.message.goods]
      })
      //关闭下拉刷新的
      wx.stopPullDownRefresh()
  }

});