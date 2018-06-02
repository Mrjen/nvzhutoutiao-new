import {md5} from './md5';
const host = `https://uc.zealcdn.cn`;
const _module = `api`;
const version = 'v1';
const baseUrl = `${host}/${_module}/${version}/`;

const global = {};

// 判断是否存在参数kid
function judge(data){
   if(!data.kid) return console.error('请给global赋值kid');
}


// 封装request
function wxRequest(data = {}) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: data.url,
      data: data.data,
      method: data.method ? data.method : 'GET',
      header: data.header ? data.header : { 'content-type': 'application/json' },
      success(res) {
        resolve(res);
      },
      fail(res) {
        reject(res);
      }
    });
  });
}

// 授权及保存用户信息
// function getToken(url, userInfo) {
//   return new Promise((resolve,reject)=>{
//     wx.login({ success(res) { resolve(res.code) }});
//   })
// }

// 保存用户信息
function saveUserInfo(url, data = {}) {
  return wxRequest({ url: url, info: data });
}

// 获取sign
function getSign(kid){
  return new Promise((resolve,reject)=>{
    wx.login({
       success(res){
          wxRequest({ 
            url: `${baseUrl}/slienceAuth?code=${res.code}&kid=${global.kid}`,
            method: 'POST',
            data:{ code: res.code, kid: kid }
          }).then(res=>{
            console.log('SIGN', res)
            resolve(res)
          })
       }
    })
  }) 
}


// 渠道统计 统计用户来源
function fromPageData( 
   data = { 
     project_secret:'', 
     scene:'', 
     token:'', 
     app: '', 
     kid: '', 
     method:'GET' }) {
    // scene 页面参数, token 统计的token, app 小程序名称, kid 小程序kid           
  wx.login({
    success(res) {
      wxRequest({ url: `${baseUrl}/slienceAuth`, method: data.method, 
        data:{code:res.code, kid: data.kid}
      }).then(res=>{
          console.log('login返回SIGN', res.data.data);

         let timestamp = Date.parse(new Date());
         let userData = res.data.data;
         let sign = userData.sign;
         let scene = data.scene || wx.getStorageSync('scene');
         // 没有场景值不统计
         if(!userData.scene&&!data.token) return; 

         let opstData = getPostData({ kid:data.kid,sign:sign, project_secret: data.project_secret, field:'openid'});
         console.log('opstData', opstData)
         opstData.field = 'openid';
         wxRequest({ url:`${baseUrl}/getMemberInfo?kid=${data.kid}&sign=${sign}`,
          data:opstData, method:'POST'})
          .then(res=>{
             console.log('获取用户Openid', res);
            let md5_data = data.token+'#'+timestamp;
            // console.log('md5_data', md5_data)

            let _params = {
                openid: res.data.data.openid,
                unionid: userData.unionid,
                scene: scene,
                sign: userData.sign,
                is_fresh: userData.is_fresh,
                time: timestamp,
                token: md5(md5_data),
                app: data.app,
                gender: userData.gender || 0
            };

            wxRequest({
                url: 'https://tj.zealcdn.cn/?_a_=serverReport',
                data: _params,
                method: 'POST',
                success(res){
                   console.log('上报数据成功')
                }
              }).catch(e=>{
                  console.error('上报数据出错 上报的数据为:', _params)
              })
         })
      })
    }
  });
}

// 获取请求数据
function getPostData(data={}){
      // 请求的参数 get + post
    let postData = {
        kid: data.kid,
        sign: data.sign,
        field: data.field,
        nonce_str: Math.random().toString(16).substring(2),
    };
    // 鉴权秘钥
    let project_secret = data.project_secret;
    // key排序
    let res = EnumaKey(postData).sort();
    // 排序后的数组
    let sortData = {};
    for (let i = 0; i < res.length; i++) {
        if(postData[res[i]] != '') {
            sortData[res[i]] = postData[res[i]];
        }
    }
    // 拼接字符串 key=value&key=value
    let stringA = '';
    for(let k in sortData){
        stringA += k+"="+sortData[k]+"&";
    }
    // 拼上鉴权秘钥
    stringA += "secret="+ project_secret;
    // md5
    let sign = md5(stringA);
    // 大写
    sign = sign.toUpperCase();
    // 最终发送参数
    postData['signature'] = sign;
    // console.log(postData);
    return postData;
    
    // 获取字典key数组
    function EnumaKey(data){  
        let res = [];
        for(let key in data){  
            res.push(key);
        }  
        return res;
    }  
}

// 保存用户formid
function saveFormId(data={kid:'', sign:''}){
   let postData = getPostData({kid:data.kid,sign:data.sign});
   console.log('postData111', postData)
  //  wxRequest({url: `${baseUrl}/saveFormId`,method:'POST'})
}

// saveFormId({kid:110,sign:''})

// 获取当前页面路径
function getCurrentPageUrl() {
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let url = currentPage.route; //当前页面url
  return url;
}

// 获取分享相关信息
function shareData(title, path, cb) {
  return {
    title: title ? title : '',
    path: path ? path : `${getCurrentPageUrl()}?scene=${wx.getStorageSync('scene')}`,
    success(res) {
      console.log('分享成功 转发参数', `scene=${wx.getStorageSync('scene')}`);
      typeof cb == 'function' && cb(res);
    }
  };
}

export default {
  global,
  wxRequest,
  // getToken,
  saveUserInfo,
  fromPageData,
  getCurrentPageUrl,
  shareData
}
