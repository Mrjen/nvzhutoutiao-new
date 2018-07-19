// 基础链接
const domainUrl = "https://nvzhu.zealcdn.cn/public/index.php/api";

// 
const STATUS = 200;

// 获取token
const getToken = `${domainUrl}/user/gettoken`

// 保存用户信息
const saveUserInfo = `${domainUrl}/user/saveuserinfo`;

// 获取用户信息
const getUserInfo = `${domainUrl}/user/getuserinfo`;

// 文章列表
const getArticleList = `${domainUrl}/article/articlelist`;

// 文章详情
const getArticleDetail = `${domainUrl}/article/articledesc`;

// 文章点亮
const likeArticle = `${domainUrl}/article/likearticle`

// 评论列表
const commentList = `${domainUrl}/comment/commentlist`;

// 添加评论
const addComment = `${domainUrl}/comment/createcomment`;

// 发表跟评
const followComment = `${domainUrl}/followcomment/createfollowcomment`;

// 评论点亮
const likeComment = `${domainUrl}/comment/likecomment`;

// 跟评列表
const followWommentList = `${domainUrl}/followcomment/followcommentlist`;

// 反馈消息
const feedBackMsg = `${domainUrl}/sysmessage/createsysmessage`;

// 系统消息列表
const systemMsgList = `${domainUrl}/sysmessage/sysmessagelistxin`;

// 修改系统消息阅读状态
const systemMsgStatus = `${domainUrl}/sysmessage/changesysmessagestatus`;

// 删除系统消息
const deleteSystemMsg = `${domainUrl}/sysmessage/deletesysmessage`;

// 历史搜索
const HistorySearch = `${domainUrl}/search/historysearch`;

// 热门搜索
const HotSearch = `${domainUrl}/search/hotsearch`;

// 获取搜索关键词
const searchWorld = `${domainUrl}/article/articlelistsearch`;

// 删除搜索历史
const clearSearchHistory = `${domainUrl}/search/deletehistorysearch`;

// 增加文章分享次数
const addArticleShareTime = `${domainUrl}/article/addsharetimes`;

// 点亮或评论列表
const userCommentList = `${domainUrl}/user/usercommentlist`;

// 获取七牛Token
const getQiNiuToken = `${domainUrl}/user/uploadtoken`;

// 消息详情
const systemMsgDetail = `${domainUrl}/sysmessage/sysmsgdesc`;

// 跟评点亮
const likefollowcomment = `${domainUrl}/followcomment/likefollowcomment`;

// 获取文章二维码
const getQrcode = `${domainUrl}/user/qrcode`;

// 获取关注列表
const followingList = `${domainUrl}/attention/attentionlist`

// 取消关注
const delattention = `${domainUrl}/attention/delattention`

// 粉丝列表
const followerlist = `${domainUrl}/attention/followerlist`

// 判断我是否关注ta
const isattention = `${domainUrl}/attention/isattention`

// 添加关注
const createattention = `${domainUrl}/attention/createattention`

// 保存formid
const saveFormId = `${domainUrl}/user/saveformid`

// 获取微信access_token
const getAccessToken = `${domainUrl}/user/getwxtoken`;

// 获取首页banner或者文章
const articleindex = `${domainUrl}/article/articleindex`

// 获取文章类型
const articletype = `${domainUrl}/article/articletype`

// 合成海报
const poster = `${domainUrl}/image/poster`

// 经验值状态
const empiricstatus = `${domainUrl}/empiric/empiricstatus`

// 经验值明细
const empiricdetail = `${domainUrl}/empiric/empiricdetail`

// 签到状态
const signstatus = `${domainUrl}/sign/signstatus`

// 签到
const chunk = `${domainUrl}/sign/signin`

// 积分明细
const integraldetail = `${domainUrl}/integral/integraldetail`

// 评论列表删除评论
const delcomment = `${domainUrl}/comment/delcomment`

// 邀请好友进入小程序获取积分、经验
const getintegralshare = `${domainUrl}/article/getintegralshare`

// 用户点击统计
const clickbutton = `${domainUrl}/user/clickbutton`

// 关闭签到弹层
const closesign = `${domainUrl}/user/closesign`

// 投票
const vote = `${domainUrl}/article/voteing`

// 获取投票海报
const voteposter = `${domainUrl}/image/voteposter`

// 创建或编辑地址
const addreceiptaddr = `${domainUrl}/shop/addreceiptaddr`

// 获取地址列表
const addressList = `${domainUrl}/shop/showalladdr`;

// 今日物语
const dayQuote = `${domainUrl}/calendar/calendarlist`;

// 打赏
const Raward = `${domainUrl}/reward/reward`

// 打赏明细
const rewarddetail = `${domainUrl}/reward/rewarddetail`

// 每日物语
const statisticsstroy =  `${domainUrl}/calendar/statisticsstroy`

// 获取商城商品
const shopList = `${domainUrl}/shop/shopgoods`

// 钱包提现
const companypay = `${domainUrl}/pay/deposit`

// 获取单个商品的信息
const oneshopgoods = `${domainUrl}/shop/oneshopgoods`

// 积分兑换产品
const goodexchange =`${domainUrl}/shop/goodexchange`

// 订单列表
const shoporderlist = `${domainUrl}/shop/shoporderlist`

// 确认收货
const changepost = `${domainUrl}/shop/changepost`

// 获取物流
const trace = `${domainUrl}/shop/trace`

// 自定义每日物语
const imgmerge = `${domainUrl}/calendar/imgmergenew`

// 获取物语logo
const getstorylogo = `${domainUrl}/calendar/getstorylogo`

// 获取签到信息接口
const signlist = `${domainUrl}/sign/signlist`

// 拆红包
const openpacket = `${domainUrl}/packet/openpacket`

// 再领取一个红包
const createpackettask = `${domainUrl}/packet/createpackettask`

// 获取红包组团情况
const onepackettask = `${domainUrl}/packet/onepackettask`

// 帮助好友助力红包
const createhelp = `${domainUrl}/packet/createhelp`

// 保存解忧内容
const saveletter = `${domainUrl}/letter/saveletter`

// 资讯列表
const newsindex = `${domainUrl}/news/newsindex`

// 登录
const logindata = `${domainUrl}/user/logindata`

// 添加收藏
const createcollect = `${domainUrl}/userinfo/createcollect`

// 收藏列表
const collectlist = `${domainUrl}/userinfo/collectlist`

// 删除收藏
const delcollect = `${domainUrl}/userinfo/delcollect`

// 物语列表
const calendartextlist =  `${domainUrl}/calendar/calendartextlist`

// 语录图库
const calendarpiclist = `${domainUrl}/calendar/calendarpiclist`

// 赚取积分
const todaytntegral = `${domainUrl}/integral/todaytntegral`

// 抽奖物品列表
const prizelist = `${domainUrl}/prize/prizelist`

// 关闭抽奖弹窗
const closeprize = `${domainUrl}/user/closeprize`

// 抽奖弹幕
const prizeorderlist =`${domainUrl}/prize/prizeorderlist`

export default {
  STATUS,
  domainUrl,
  getToken,
  saveUserInfo,
  getUserInfo,
  getArticleList,
  getArticleDetail,
  commentList,
  addComment,
  followComment,
  likeComment,
  followWommentList,
  feedBackMsg,
  systemMsgList,
  systemMsgStatus,
  deleteSystemMsg,
  HistorySearch,
  HotSearch,
  searchWorld,
  clearSearchHistory,
  likeArticle,
  addArticleShareTime,
  userCommentList,
  getQiNiuToken,
  systemMsgDetail,
  likefollowcomment,
  getQrcode,
  followingList,
  delattention,
  followerlist,
  isattention,
  createattention,
  saveFormId,
  getAccessToken,
  articleindex,
  articletype,
  poster,
  empiricstatus,
  empiricdetail,
  signstatus,
  chunk,
  integraldetail,
  delcomment,
  getintegralshare,
  clickbutton,
  closesign,
  vote,
  voteposter,
  addreceiptaddr,
  addressList,
  dayQuote,
  Raward,
  rewarddetail,
  statisticsstroy,
  shopList,
  companypay,
  oneshopgoods,
  goodexchange,
  shoporderlist,
  changepost,
  trace,
  imgmerge,
  getstorylogo,
  signlist,
  openpacket,
  createpackettask,
  onepackettask,
  createhelp,
  saveletter,
  newsindex,
  logindata,
  createcollect,
  collectlist,
  delcollect,
  calendartextlist,
  calendarpiclist,
  todaytntegral,
  prizelist,
  closeprize,
  prizeorderlist
};
