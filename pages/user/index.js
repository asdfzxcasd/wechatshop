// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 拼团
    
    tuiguang:[],
    huodong:[],
    //用户信息
    code:[]

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
  },
  onLoad(){
    const code = wx.getStorageSync("code")
    console.log("用户头像")
    console.log(code)
    this.code = code
    this.setData({
      code
    })
  },
  signin(e){
    console.log(e)
    const username = e.detail.userInfo.nickName
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user').where({
      nickName: username
    }).get({
      success: res => {
        this.setData({
          code:res
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  created() {
    signin(e)
    
  },
  

})