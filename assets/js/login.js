$(function () {
    // Ⅰ.注册--登录--页面切换
    $("#link_reg").on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $("#link_login").on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // Ⅱ.验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg_box input[name=password]').val()
            if (value !== pwd) {
                return '两次输入密码不一致'
            }
        }
    });
    // Ⅲ.注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                layer.msg('注册成功 请登录')
                // 模拟手动切换登录表单
                $('#link_login').click()
                // 重置表单
                $('#form_reg')[0].reset()
            }
        })
    })

    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功 即将跳转')
                // 保存token
                localStorage.setItem("token", res.token)
                // 跳转
                location.href = "/index.html"
            }
        })
    })
})