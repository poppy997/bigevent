$(function () {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    //定义梅花时间的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)


        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())


        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    var q = {
        pagenum: 1, //页码值,默认请求第一页数据
        pagesize: 2, //每页显示几条数据,默认显示二条
        cate_id: '', //文章分类的id
        state: '', //文章的发布状态

    }
    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                //使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                renderPage(res.total)

            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id').html(htmlStr)
                form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
            elem: 'pageBox', // 分页容器的 Id
            count: total, // 总数据条数
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            // 分页发生切换的时候，触发 jump 回调
            // 触发 jump 回调的方式有两种：
            layout: ['conut', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function (obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的
                console.log(first)
                console.log(obj.curr)
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                //把最新的条目数赋值到q查询对象的pagesize中去
                q.pagesize = obj.limit
                // 根据最新的 q 获取对应的数据列表，并渲染表格
                // initTable()
                if (!first) {
                    initTable()
                }
            }

        })
        // $('tbody').on('click', function () {
        //     layer.confirm('确认删除', {
        //         icon: 3,
        //         title: '提示'
        //     }, function (index) {
        //         $.ajax({
        //             method: 'GET',
        //             url: 'url/article/delete' + IDBCursor,
        //             success: function (res) {
        //                 if (res.status !== 0) {
        //                     return layer.msg('删除文章失败')
        //                 }
        //                 layer.msg('删除文章成功')
        //                 //当数据删除完成后,需要判断当前这一页中,是否还有剩余的数据,如果没有剩余的 数据,则让页码值-1
        //                 initTable()
        //             }
        //         })
        //     })
        // })
    }
})