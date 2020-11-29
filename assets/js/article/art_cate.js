$(function () {


    var layer = layui.layer;
    var form = layui.form;
    // 获取文章类别列表数据
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }
    var indexAdd = null
    // 为添加类别按钮绑定事件
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        })
    })
    // 通过代理形式为表单form-add绑定sumbit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                initArtCateList()
                layer.msg('新增分类成功')
                // 根据索引关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null
    // 编辑按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            // 弹出层内容
            content: $('#dialog-edit').html()
        })
        // 让输入框里面有当前的数据
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })
    // 通过代理为修改分类表单绑定submit事件
    $('tbody').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新数据分类失败')
                }
                layer.msg('更新数据分类成功')
                // 关闭弹出框
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 删除  通过代理形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    // 关闭弹出框
                    layer.close(index);
                    // 重新获取列表数据
                    initArtCateList()
                }
            })


        });
    })
})