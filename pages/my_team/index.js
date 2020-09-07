// pages/my_team/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    butt:1

  },
  handleteam(e){
    console.log(e)
    const num = e.currentTarget.dataset.num
    if(num==1){
      
      this.setData({
        butt:1
      })
    }
    if(num==2){
      
      this.setData({
        butt:2
      })
    }
    if(num==3){
      
      this.setData({
        butt:3
      })
    }
    console.log(typeof(num))

  }

  

 

  

  



  

  

  
})