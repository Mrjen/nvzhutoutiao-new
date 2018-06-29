import wxRequest from './http'
import api from './api';
import tips from './tips';
import qiniuUploader from './qiniuUploader';


function formatTime(unixtime, withTime) {
  if (!unixtime) {
    unixtime = (new Date()).getTime();
  } else {
    unixtime *= 1000;
  }
  var nd = new Date(unixtime),
    year = nd.getFullYear(),
    month = nd.getMonth() + 1,
    day = nd.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  if (!withTime) {
    return year + '-' + month + '-' + day;
  }
  var hour = nd.getHours(),
    minute = nd.getMinutes(),
    second = nd.getSeconds();
  if (hour < 10) {
    hour = '0' + hour;
  }
  if (minute < 10) {
    minute = '0' + minute;
  }
  if (second < 10) {
    second = '0' + second;
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second; 
  // return month + '/' + day + ' ' + hour + ':' + minute +':'+ second;
}


// 获取用户信息
async function getUserInfo() {
  return new Promise((resolve, reject) => {
    wxRequest(api.getUserInfo,{},'POST').then(res=>{
        if(res.data.code === api.STATUS){
            resolve(res.data.data)
        }
    })
  })
}

/**
 * 格式化现在距${endTime}的剩余时间
 */
function formatRemainTime(endTime, day) {
  var startDate = new Date(); //开始时间
  var endDate = new Date(endTime); //结束时间
  var t = endDate.getTime() - startDate.getTime(); //时间差
  var d = 0,
      h = 0,
      m = 0,
      s = 0;
  if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      // if(d<10){ d = '0'+d }
      h = Math.floor(t / 1000 / 60 / 60 % 24);
      if(h<10){ h = '0'+ h }
      m = Math.floor(t / 1000 / 60 % 60);
      if(m<10){ m = '0'+ m }
      s = Math.floor(t / 1000 % 60);
      if(s<10){ s = '0'+ s }
  }
  if(day) return {h,m,s}
  return d + "天 " + h + ":" + m + ":" + s;
}

// 获取token 
function getToken() {
  return new Promise((reslove, reject) => {
    wx.login({
      success(res) {
        wxRequest(api.getToken, {
          code: res.code
        }).then(res => {
          // console.log('token', res.data.data.is_accredit)
          wx.setStorage({key:'token', data:res.data.data.token})
          wx.setStorage({key:'is_accredit', data:res.data.data.is_accredit});
          wx.setStorage({ key:'myid',data:res.data.data.id });
          reslove(res)
        })
      }
    });
  })

}

// 获取七牛token
async function getQiNiuToken(){
  let qiniu = await wxRequest(api.getQiNiuToken,{},'POST')
  if(qiniu.data.code === api.STATUS){
    return qiniu.data.data;
  }
}

// 保存用户信息
function saveUserInfo(params) {
  wxRequest(api.saveUserInfo, params)
    .then((res) => {
      console.log(res)
    })
}

// 截取字段
function canvasWorkBreak(maxWidth, fontSize, text) {
  const maxLength = maxWidth / fontSize;
  const textLength = text.length;
  let textRowArr = [];
  let tmp = 0;
  while (1) {
    textRowArr.push(text.substr(tmp, maxLength));
    tmp += maxLength;
    if (tmp >= textLength) {
      return textRowArr;
    }
  }
}

// 获取图片
function getImage(url) {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: url,
      success(res) {
        resolve(res.tempFilePath);
      }
    })
  })
}

// 获取设置
function getUserSetting(path) {
  console.log("走失败了");
  wx.getSetting({
    success: res => {
      console.log(res);
      if (!res.authSetting["scope.writePhotosAlbum"]) {
        wx.showModal({
          title: "提示",
          content: "你没有打开保存到相册的权限，现在去打开？",
          success: function(res) {
            if (res.confirm) {
              wx.openSetting({
                success: res => {
                  if (res.authSetting["scope.writePhotosAlbum"]) {
                    saveImageToPhotosAlbum(path);
                  }
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    }
  });
}

// 保存图片到相册
function saveImageToPhotosAlbum(path, reject) {
  wx.saveImageToPhotosAlbum({
    filePath: path,
    success(res) {
      tips.success('保存成功')
    }
  });
}

// 统计分享次数
async function shareTime(id){
   let share = await wxRequest(api.addArticleShareTime,{ id: id })
   console.log('share',share)
}

async function getPoster(id){
   let url = await wxRequest(api.poster,{article_id: id},'POST');
   if(url.data.code===api.STATUS){
      wx.showLoading({ title: "生成中" });
      let image = await getImage(url.data.data);
      console.log('image', image)
      wx.saveImageToPhotosAlbum({
        filePath:image,
        success(res) {
          wx.showModal({
            title: "海报已保存到系统相册",
            content: "快去分享给朋友，叫伙伴们来围观吧！",
            showCancel: false,
            confirmText: "我知道了",
            success: function(res) {
              if (res.confirm) {
                console.log("用户点击确定");
              } else if (res.cancel) {
                console.log("用户点击取消");
              }
            }
          });
        },
        fail(res){
          tips.confirm('你没有打开保存到相册的权限，现在去打开？').then(res=>{
            wx.openSetting({
              success: res => {
                if (res.authSetting["scope.writePhotosAlbum"]) {
                  saveImageToPhotosAlbum(image);
                }
              }
            });
          }).catch(res=>{
            console.log('用户点击取消')
          })
        },
        complete(){
          wx.hideLoading();
        }
      })
   }
}

// 提交formid
async function updateFormId(form_id=''){
   let form = await wxRequest(api.saveFormId,{formid:form_id},'post');
   return form;
}

// 获取url参数
function getQueryString(name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = url.match(reg);
  if (r != null) return unescape(r[2]); return null;
}

// 二级追评数组去重
function unique(array) {
  var obj = {};
  return array.filter(function(item, index, array){
      // console.log(typeof item + JSON.stringify(item))
      return obj.hasOwnProperty(typeof item.follow_comment_id + JSON.stringify(item.follow_comment_id)) ? false : (obj[typeof item.follow_comment_id + JSON.stringify(item.follow_comment_id)] = true)
  })
}

// 热门评论和最新评论
function commentUnique(array) {
  var obj = {};
  return array.filter(function(item, index, array){
      // console.log(typeof item + JSON.stringify(item))
      return obj.hasOwnProperty(typeof item.id + JSON.stringify(item.id)) ? false : (obj[typeof item.id + JSON.stringify(item.id)] = true)
  })
}

// 上传图片到七牛
async function upLoadImageQiNiu(imageArr) {
  let upArr = [];
  let len = imageArr.length;
  let QiNiuToken = await getQiNiuToken();
  let _qiniu_token = QiNiuToken.upload_token;
  return new Promise((resolve,reject)=>{
    for (let i = 0; i < len; i++) {

    qiniuUploader.upload(imageArr[i], (res) => {
        upArr.push('https://gcdn.playonwechat.com' + res.imageURL);
        if(upArr.length===len){
          console.log('完成了')
          resolve(upArr);
        }
        wx.hideLoading();
      }, (error) => {
        console.log('error: ' + error);
        wx.hideLoading();
      }, {
          region: 'SCN',
          uptoken: _qiniu_token,
          uptokenFunc: function () {
            return '[yourTokenString]';
          }
        }, (res) => {
          console.log('上传进度', res.progress)
          // console.log('已经上传的数据长度', res.totalBytesSent)
          // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        });
    }
  })
  
}

// 更新小程序
function ApplyUpdate(){
  if(!wx.canIUse('getUpdateManager')) return;
  const updateManager = wx.getUpdateManager()
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    console.log('有没有新版',res.hasUpdate)
  })
  updateManager.onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      showCancel: false,
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
  updateManager.onUpdateFailed(function () {
    // 新的版本下载失败
    console.log('新版下载失败');
  })
}


export default {
  formatTime,
  getUserInfo,
  saveUserInfo,
  getToken,
  getImage,
  canvasWorkBreak,
  saveImageToPhotosAlbum,
  getUserSetting,
  shareTime,
  updateFormId,
  getPoster,
  getQueryString,
  formatRemainTime,
  getQiNiuToken,
  unique,
  commentUnique,
  upLoadImageQiNiu,
  ApplyUpdate
};
