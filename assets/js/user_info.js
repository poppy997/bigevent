$(function(){
    var form =layui.form
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
})