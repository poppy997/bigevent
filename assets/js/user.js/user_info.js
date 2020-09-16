$(function() {
  
    // 获取 form 对象
    var form = layui.form
    var layer=layui.layer
    // 自定义校验规则
    form.verify({
      nickname: function(value) {
        if (value.trim().length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间'
        }
      }
    })
    getUserInfo()
  
    // 获取用户信息的函数
    function getUserInfo(cb) {
      // 发起请求，获取用户信息
      $.get('/my/userinfo', function(res) {
        // 获取用户数据失败！
        if (res.status !== 0) {
          return layer.msg('获取用户数据失败！')
        }
        // 将数据填充到表单中
        form.val('formUserInfo', res.data)
        cb && cb(res.data)
      })
    }
  
    // 点击按钮，重置表单数据
    $('#btnReset').on('click', function(e) {
      e.preventDefault()
      getUserInfo()
    })
  
    // 点击按钮，提交表单
    $('.layui-form').on('submit', function(e) {
      // 阻止表单的默认提交行为
      e.preventDefault()
  
      var formVal = $(this).serialize()
      // 发起请求，修改用户的基本信息
      $.post('/my/userinfo', formVal, function(res) {
        // 更新用户信息失败
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        // 更新用户信息成功
        layer.msg('更新用户信息成功！')
        // 重新渲染用户头像和用户名称
        getUserInfo(function(user) {
          // 调用父窗口的函数
          window.parent.renderAvatar(user)
        })
      })
    })
  })