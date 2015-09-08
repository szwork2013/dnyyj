
$.ajax({
    url:"http://h5.a.rongyi.com/activity/api/jsToken/default",
    type: 'POST',
    data:{url:location.href},
    dataType:"json",
    success:function(data){
        if(!data||!data.signature){
            return;
        }
        // alert(data.appid);
        // alert(location.href);
        wx.config({
            debug:false,
            appId: data.appid, // 必填，公众号的唯一标识
            timestamp:data.timestamp , // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {

            var img='http://h5.a.rongyi.com/html/legend/B37/images/logo-share.png';

            var redirectUrl = 'http://h5.a.rongyi.com/html/legend/B37/team_index.html?_=random';

            var link='http://h5.a.rongyi.com/activity/ifsb37/index?url=' + encodeURIComponent(redirectUrl);

            var title='成都IFS i拼时代2 超跑战队篇';

            var desc='成都IFS i拼时代第二季，超跑战队篇启动啦！带领你的专属队伍，为2000元现金购物卡而战斗吧！';
            //朋友圈
            wx.onMenuShareTimeline({
                title: desc, // 分享标题
                link: link, // 分享链接
                imgUrl: img,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $.ajax({
                          url: "http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fshare",
                          dataType: 'json',
                          type:"post",
                          timeout: 8000,
                          data: "wt_openid="+openId,
                          success: function(data) {
                            Modal.destroy();
                        }
                    });

                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    Modal.destroy();
                }
            });

            //分享给朋友
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: img,
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },
    error:function(a,b,c){}
});

// 邀请组队
function updateTeamShare(){
    wx.ready(function(){

        var openId = window.localStorage.getItem('openId');

        if(!openId){
            return;
        }

        var teamId = window.localStorage.getItem('ifs2_teamId');
        var teamName = window.localStorage.getItem('ifs2_teamName');
        var nickName = window.localStorage.getItem('ifs2_nickName');

        var img='http://h5.a.rongyi.com/html/legend/B37/images/logo-share.png';
        var redirectUrl = 'http://h5.a.rongyi.com/html/legend/B37/team_index.html'
            + '?fopenId=' + openId
            + '&linkType=1'
            + '&teamid=' + teamId
            + '&teamname=' + encodeURIComponent(teamName)
            + '&nickname=' + encodeURIComponent(nickName);

        var link = 'http://h5.a.rongyi.com/activity/ifsb37/index?url=' + encodeURIComponent(redirectUrl);

        // var link='http://h5.a.rongyi.com/activity/ifsb37/index?fopenId='
        //     + openId + '&linkType=1'
        //     + '&teamid=' + teamId
        //     + '&teamname=' + encodeURIComponent(teamName)
        //     + '&nickname=' + encodeURIComponent(nickName);

        var title = '成都IFS i拼时代2 超跑战队篇';

        var desc = nickName + '邀请您加入' + teamName + '战队，为2000元现金购物卡而战斗吧！';
 // alert(3)
        wx.onMenuShareTimeline({
            title: desc, // 分享标题
            link: link, // 分享链接
            imgUrl: img,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: desc, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

// 邀请加分
function updateScoreShare(){
    wx.ready(function(){
        var teamScore = window.localStorage.getItem('ifs2_teamScore') || 0;

        if(!teamScore){
            return;
        }

        var openId = window.localStorage.getItem('openId');

        if(!openId){
            return;
        }

        var teamId = window.localStorage.getItem('ifs2_teamId');
        var teamName = window.localStorage.getItem('ifs2_teamName');

        var img='http://h5.a.rongyi.com/html/legend/B37/images/logo-share.png';

        var redirectUrl = 'http://h5.a.rongyi.com/html/legend/B37/team_index.html'
            + '?fopenId=' + openId
            + '&teamid=' + teamId
            + '&linkType=2';

        var link = 'http://h5.a.rongyi.com/activity/ifsb37/index?url=' + encodeURIComponent(redirectUrl);

        // var link='http://h5.a.rongyi.com/activity/ifsb37/index?fopenId=' + openId + '&linkType=' + 2;
        var title='成都IFS i拼时代2 超跑战队篇';

        var desc='我的' + teamName + '战队在成都IFS超跑战队中获得' + teamScore + '分，离2000元现金购物卡仅有一步之遥，求加油求鼓励！';

        wx.onMenuShareTimeline({
            title: desc, // 分享标题
            link: link, // 分享链接
            imgUrl: img,
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: desc, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}



// 分享增加一次抽奖机会
function addOneTimeShare(){
    wx.ready(function(){

        var openId = window.localStorage.getItem('openId');


        if(!openId){
            return;
        }

        var img='http://h5.a.rongyi.com/html/legend/B37/images/logo-share.png';

        var link = "http://h5.a.rongyi.com/html/legend/dnyyj/index.html";
        // var link='http://h5.a.rongyi.com/activity/ifsb37/index?fopenId=' + openId + '&linkType=' + 2;
        var title='';
        var desc='小伙伴们快来参与抽奖吧';

        wx.onMenuShareTimeline({
            title: desc, // 分享标题
            link: link, // 分享链接
            imgUrl: img,
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("success");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert("1");
            }
        });

        wx.onMenuShareAppMessage({
            title: desc, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: img,
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                alert("success");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}



