$(function () {
    // Ⅰ.自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    });
    // Ⅱ.用户渲染
    initUserInfo()
    // 导出layer
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // Ⅲ.表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })
    // Ⅳ.修改用户信息
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("用户信息修改失败")

                }
                layer.msg('恭喜!用户信息修改成功')
                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInof()
            }
        })
    })

});
e