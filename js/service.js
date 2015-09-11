var service = {

    isRegisterUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fislogin',
    getTicketUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fticket',
    wechatShareUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fshare',
    isRegisterUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fislogin',
    getSecurityCodeUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fcode',
    startRobTicketUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fregister',
    visitCountUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fclick',
    userLotteryCountUrl: 'http://h5.a.rongyi.com/pactivity/ticket/web/index.php?r=weixin%2Fgetuserinfo',
    pageCountUrl: '',

    ajax: function(opts) {
        var data = opts.data,
            onBefore = opts.onBefore,
            onSuccess = opts.onSuccess,
            onError = opts.onError,
            onComplete = opts.onComplete,
            url = opts.url;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: data,
            beforeSend: function() {
                if(typeof onBefore === 'function') {
                    onBefore.call(this);
                }
            }.bind(this),
            success:function(data, textStatus, jqXHR) {
                if(typeof onSuccess === 'function') {
                    onSuccess.call(this, data, textStatus, jqXHR);
                }
            }.bind(this),
            error: function(jqXHR, textStatus, error) {
                if(typeof onError === 'function') {
                    onError.call(this, jqXHR, textStatus, error);
                }
            }.bind(this),
            complete: function() {
                if(typeof onComplete === 'function') {
                    onComplete.call(this);
                }
            }.bind(this)
        });
    },

    isRegister: function(data, onSuccess,onError) {
        service.ajax({
            url: service.isRegisterUrl,
            data: data,
            onSuccess: onSuccess,
            onError: onError
        });
    },

    wechatShare: function(data, onSuccess,onError) {
        service.ajax({
            url: service.wechatShareUrl,
            data: data,
            onSuccess: onSuccess,
            onError: onError
        });
    },

    getTicket: function(data, onSuccess, onError) {
        service.ajax({
            url: service.getTicketUrl,
            data: data,
            onSuccess: onSuccess,
            onError: onError
        });
    },

    myTickets: function(data, onBefore, onSuccess, onError, onComplete) {
        service.ajax({
            url: service.myTicketsUrl,
            data: data,
            onBefore: onBefore,
            onSuccess: onSuccess,
            onError: onError,
            onComplete: onComplete
        });
    },

    getSecurityCode: function(data, onBefore, onSuccess, onError) {
        service.ajax({
            url: service.getSecurityCodeUrl,
            data: data,
            onBefore: onBefore,
            onSuccess: onSuccess,
            onError: onError
        });
    },

    startRobTicket: function(data, onBefore, onSuccess, onError, onComplete) {
        service.ajax({
            url: service.startRobTicketUrl,
            data: data,
            onBefore: onBefore,
            onSuccess: onSuccess,
            onError: onError,
            onComplete: onComplete
        });
    },

    visitCount: function(type) {
        service.ajax({
            url: service.visitCountUrl,
            data: "wc_type=" + type
        });
    },

    userLotteryCount: function(onBefore, onSuccess, onComplete) {
        service.ajax({
            url: service.userLotteryCountUrl,
            onSuccess: onSuccess,
            onBefore: onBefore,
            onComplete: onComplete
        });
    },

    pageCount: function(onBefore, onSuccess, onComplete) {
        service.ajax({
            url: service.pageCountUrl,
            onSuccess: onSuccess,
            onBefore: onBefore,
            onComplete: onComplete
        });
    },
};