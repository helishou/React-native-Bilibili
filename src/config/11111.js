export const api = {
  //bilibili推荐视频
  suggest:'https://www.bilibili.com/index/ding.json',
  //视频信息
  videoInfomation:'http://api.bilibili.com/archive_stat/stat?aid=289988111&type=jsonp',
  //视频评论
  commit:'http://api.bilibili.com/x/v2/reply?jsonp=jsonp&pn=1&type=1&oid=289988111',

  live:
    'https://activity.uc.cn/uclive2017/roomlist?__dt=1392&__t=1538401886632&uc_param_str=dsdnfrpfbivesscpgimibtbmnijblauputogpintnwchgd&tag=live&entry=zbyp&num=60',
  // suggest: 'http://baobab.kaiyanapp.com/api/v4/tabs/selected',
  hot: 'http://baobab.kaiyanapp.com/api/v4/discovery/hot',
  //分类
  category: 'http://baobab.kaiyanapp.com/api/v4/categories/',
  //分类详情
  categoryList:
    'http://baobab.kaiyanapp.com/api/v4/categories/detail/index?id=',
  communion: 'http://211.149.159.75/xinVIdeo/?/m/',
  dance:
    'https://activity.uc.cn/uclive2017/roomlist?__dt=4543&__t=1538403838470&uc_param_str=dsdnfrpfbivesscpgimibtbmnijblauputogpintnwchgd&tag=dance&entry=zbyp&num=60',
  //视频相关推荐
  videoRecommend: 'http://baobab.kaiyanapp.com/api/v4/video/related?id=',
  //视频搜索
  search: 'http://baobab.kaiyanapp.com/api/v1/search?num=20&start=10&query=',
  //音悦台最新MV
  mv: 'http://www.yinyuetai.com/mv/get-rec?cataId=3&withBigImg=true&size=32',
};
