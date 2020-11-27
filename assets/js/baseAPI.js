// Ⅰ.服务器地址拼接
var baseURL = "http://ajax.frontend.itheima.net"

$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;

    // Ⅱ.对需要权限的接口配置头信息
    if (params.url.indexOf("/my/") !== -1) {
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // Ⅲ.拦截所有相应 判断身份认证信息
    params.complete = function (res) {
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})
