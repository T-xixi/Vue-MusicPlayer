/*
 1. 请求地址:https://autumnfish.cn/search
  请求方法:get
  请求参数:keywords(查询关键字)
  响应内容:歌曲搜索结果
  1. 点击回车(v-on .enter)

  2. 查询数据(axios 接口 v-model )

  3. 渲染数据(v-for 数组 that)

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
    3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
      4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
     5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
  */

var app = new Vue({
    el: "#player",
    data: {
        //歌曲关键词
        keywords: "",
        //歌曲列表
        musicList: "",
        //歌曲地址
        musicUrl: "",
        //获取歌曲封面
        musicCover: "",
        //获取热评
        hotComments: [],

        //获取MV
        musicMV: "",
        //播放状态
        isPlaying: false,
        // 遮罩层的显示状态
        isShow: false,
        //MV地址
        mvUrl: ""

    },
    methods: {
        //歌曲搜索
        searchMusic: function() {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.keywords)
                .then(function(res) {
                    // console.log(res.data.result.songs)
                    that.musicList = res.data.result.songs
                }, function(err) {})

        },
        //歌曲播放
        playMusic: function(musicId) {
            var that = this;
            //获取歌曲地址
            axios.get('https://autumnfish.cn/song/url?id=' + musicId)
                .then(function(res) {
                    // console.log(res.data.data[0].url)
                    that.musicUrl = res.data.data[0].url
                }, function(err) {});
            //获取歌曲详情/f封面
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
                .then(function(res) {
                    // console.log(res.data.songs[0].al.picUrl)
                    that.musicCover = res.data.songs[0].al.picUrl
                }, function(err) {});
            //获取歌曲评论
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
                .then(function(res) {
                    // console.log(res.data.hotComments)
                    that.hotComments = res.data.hotComments
                }, function(err) {});

        },
        playOn: function() {
            this.isPlaying = true;
        },
        pause: function() {
            this.isPlaying = false;
        },
        //MV播放
        playMv: function(mvid) {
            var that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
                .then(function(res) {
                    console.log(res.data.data.url)
                    that.mvUrl = res.data.data.url;
                    that.isShow = true;

                }, function(err) {})

        },
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        }
    }
})