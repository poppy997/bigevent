$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // console.log(options.url)
    ;
    if (options.url.indexOf('/my/' == -1)) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份证认证失败!') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})