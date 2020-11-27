// Ⅰ.服务器地址拼接
var baseURL = "http://ajax.frontend.itheima.net"
$.ajaxPrefilter(function (params) {
    params.url = baseURL + params.url;
})
