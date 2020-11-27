$(function () {
    // Ⅰ.定义校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()){
                return "原密码和旧密码不能相同"
            }
        },
        rePwd:function(value){
            if(value==$('[name=newPwd]').val()){
                return "两次输入新密码不一致"
            }
        },
    })
    // Ⅱ.表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                // 重置
                $('.layui-form')[0].reset()
            }
        })
    })
})