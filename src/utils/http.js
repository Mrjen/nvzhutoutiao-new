export default async function wxRequest(url, params = {}, method = "GET") {
  if (typeof (params) === 'object') {
    if (!params.token){
       params.token = wx.getStorageSync("token") || "";
    }
  }
  return new Promise(function (resolve, reject) {
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
