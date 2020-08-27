// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 拼团
    pintuan:[
      {conter:"去微软曲蔚然士大夫阿是法国1",
      id:0
    },
      {conter:"去微软曲蔚然士大夫阿是法国2asfasdasdfasfasasaffasf",id:1},
      {conter:"去微软曲蔚然士大夫阿是法国3",id:2},
      {conter:"去微软曲蔚然士大夫阿是法国4",id:3}
    ],
    tuiguang:[],
    huodong:[]

  },
  handleuser(){
    wx.login({
      timeout:10000,
      success: (result)=>{
        console.log(result)
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})