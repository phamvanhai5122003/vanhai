$(document).ready(function() {

    $('#eye').click(function() {

        $(this).toggleClass('open');
        $(this).children('i').toggleClass('fa-eye-slash fa-eye');
        if ($(this).hasClass('open')) {
            $(this).preve().attr('type', 'text');

        } else {
            $(this).preve().attr('type', 'password');

        }
    });
});