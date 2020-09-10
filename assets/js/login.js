$(function() {
    $('#showReg').on('click', function() {
        $('.login-form').hide()
        $('.reg-form').show()
    })
    $('#showLogin').on('click', function() {
            $('.login-form').show()
            $('.reg-form').hide()
        })
        //从layui中获取form对象
    var form = layui.form
        //通过form.varify()自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格']
    })
})