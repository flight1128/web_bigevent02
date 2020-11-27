$(function () {
    getUserInof()

    // Ⅲ.退出功能
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 框架询问
        layer.confirm('您确定要退出吗?', { icon: 3, title: '只想弱弱的提示' }, function (index) {
            //do something
            // 清空token
            localStorage.removeItem('token')
            // 跳转
            location.href = "/login.html"
            layer.close(index);
        });
    })

})
// Ⅰ.获取信息
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            readerAvatar(res.data)
        }
    })
}
// Ⅱ.获取 渲染头像
function readerAvatar(user) {
    var name = user.nikename || user.username;
    $('#weclome').html('欢迎  ' + name)
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic)
        $('.tetx_avatar').hide()
    } else {
        // 没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()//字符大写
        $('.tetx_avatar').show().html(text)
    }
}