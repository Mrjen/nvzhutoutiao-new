export default function wxRequest(url, params = {}, method = "GET") {
                 if(typeof(params)==='object'){
                   params.token = wx.getStorageSync("token") || "";
                 }
                //  console.log(params);
                 return new Promise(function(resolve, reject) {
                   wx.request({
                     url: url,
                     data: params,
                     method: method ? method : "GET",
                     header: {
                      'content-type': 'application/json'
                     },
                     success: res => {
                       resolve(res);
                     },
                     fail: res => {
                       reject(res);
                     }
                   });
                 });
               }
