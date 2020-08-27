// pages/auth/index.js
import {login } from "../../utils/ansyncWx"
import {request} from "../../request/index.js"
Page({
  //获取用户信息
  async handleuserinfo(e){
    //encryptedData: "Y8VMNusLc8DCWKXE2UPRDk4CRaXwvICXMaKKFHdQ8bS8Nrkm/kRgcT1pcBazf+8kU6l45Uk4JUEx5MejGQSSPOSAW5hYz5HslqOG29WI13+NvY4WM3hHEUM8JCgQIobcMIj6UBoHRCarNBYUKeqwjJOaFCDaHkaKOXnIHDnnKdqa7YI0F1kQGP+hKKwXiHOkek3L1FNLmAUC1as1kuWvfQhx7GdGZaC6w4S5v71HE+8z55S6jJfRyiX5+fuQ0hb6H6uc5HOO/Sgmj6Eu8kA54XKW+f3tqKxt9SsFp3Gb9uOooUsallvt6HM5D638GGCrqyHnkxfIL8JHZB/EhoYzCYmeySBqZVP+L0Uix17i6C6MSiVtJBUm43eDyZOfjOe0B3aPtUhiYim5x84VyjoYRFMPOwq6G0jjPzZ6jfJduxSEJ0Doa9ykL21R1NBIQpGrD2759qxgYtQOw0NbR/bl87CWFc7CuHkjxP/zKuhBgObnoglFKcc64+HeSrbEpsje"
    //errMsg: "getUserInfo:ok"
    //iv: "xNF+LU51mADq9izRKLAkNA=="
    //rawData: "{"nickName":"聚是一团火，散是满天星","gender":1,"language":"zh_CN","city":"","province":"","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/bHF2g9odggCFdJaiaE8RuRDXB37mNvDG4YdBSH0OQ7XSnu5ia0nCr1YiaGCQP4CM0Om0dDmyWRfU9XCAiasQStNGyw/132"}"
    //signature: "4b2d9c669c98cb1ddf2788857075f5bcdd016cf1"
    console.log(e)
    const {encryptedData,iv,errMsg,signature} = e.detail
    //获取小程序登录成功后的code值
    const {code} = await login()
    const loginparams = {encryptedData,iv,errMsg,signature,code}
    console.log(code)
    //发送请求，获取用户token
    const res = await request({url:"/users/wxlogin",data:loginparams,methods:"post"})
    console.log(res)
    //把token存到缓存中，并跳转到上一个页面
    //wx.setStorageSync("token", token);
   

  },
  
})