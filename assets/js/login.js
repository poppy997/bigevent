$(function() {
    $('#showReg').on('click', function() {
        $('.login-form').hide()
        $('.reg-form').show()
    })
    $('#showLogin').on('click', function() {
        $('.login-form').show()
        $('.reg-form').hide()
    })

})