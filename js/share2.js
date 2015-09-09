
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

           
            var img='http://h5.a.rongyi.com/html/legend/dnyyj/images/share.jpg';

            var redirectUrl = 'http://h5.a.rongyi.com/html/legend/dnyyj/index.html';

            var link='http://h5.a.rongyi.com/activity/ifsb37/index?url=' + encodeURIComponent(redirectUrl);
            
            var title = "2015大宁音乐季，抢票正当时！";

            var desc='感受零距离的“星”现场！偶像近在咫尺！';


            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接
                imgUrl: img,
                success: function () {
                    // 用户确认分享后执行的回调函数
                    $.ajax({
                          url: "http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fshare",
                          dataType: 'json',
                          type:"post",
                          timeout: 8000,
                          data: "wu_openid="+openId,
                          success: function(data) {
                            if(Modal){
                                Modal.destroy();
                            }
                        }
                    });
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    if(Modal){
                        Modal.destroy();
                    }
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
                    // 用户确认分享后执行的回调函数
                    $.ajax({
                          url: "http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fshare",
                          dataType: 'json',
                          type:"post",
                          timeout: 8000,
                          data: "wu_openid="+openId,
                          success: function(data) {
                            if(Modal){
                                Modal.destroy();
                            }
                        }
                    });
                },
                cancel: function () {

                    // 用户取消分享后执行的回调函数
                    if(Modal){
                        Modal.destroy();
                    }
                }
            });
        });
    },
    error:function(a,b,c){}
});