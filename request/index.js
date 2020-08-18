//同时发送异步请求的次数
let aixosnumber = 0

export const request=(parame)=>{
    aixosnumber++
//显示加载中的动画
wx.showLoading({
    title: '加载中',
    mask:true
  })

    //定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...parame,
            url:baseUrl+parame.url,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            },
            //complete是无论成功还是失败都会执行的
            complete:()=>{
                aixosnumber--
                if(aixosnumber == 0){
                    wx.hideLoading()
                }
                
            }
        })
    })
}