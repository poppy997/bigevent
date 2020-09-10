$(function () {
    $('#showReg').on('click', function () {
        $('.login-form').hide()
        $('.reg-form').show()
    })
    $('#showLogin').on('click', function () {
        $('.login-form').show()
        $('.reg-form').hide()
    })
    //从layui中获取form对象
    var form = layui.form
    //通过form.varify()自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        repwd: function (value) {
            //通过形参拿到的是确认密码框中的内容
            // 还需要拿到确认密码中的内容
            // 然后进行一次等于判断
            //如果判断失败,则return一个提示消息
            var pwd = $('.reg-form[name=password]').val()
            if (pwd != value) {
                return "两次密码不一致!"
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post(
            ' http://ajax.frontend.itheima.net/api/login',{
                username:$('#form_reg[name=username]').val(),
                password:$('#form_reg[name=password]').val(),
            },
            function(res){
                if(res.result!==0){
                    return layer.msg(res.message);
                }
               layer.msg('注册成功!')
               $('#link_login').click()
            })
    })
    //监听登录表单事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'http://ajax.frontend.itheima.net/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功!')
                //将登录成功得到token字符串,保存到localStorage
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                location.href='/index.html'
            }
        })

    })

})