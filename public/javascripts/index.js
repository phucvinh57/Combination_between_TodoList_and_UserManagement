var forms = document.getElementsByClassName('input-group');
var colorDiv = document.getElementById('btn');
var buttons = document.getElementsByClassName('toggle-btn');
var password_signup = document.getElementById('password_signup');
var password_retype = document.getElementById('password_retype');

forms[1].style.top = '130px';

buttons[0].addEventListener('click', function() {
    colorDiv.style.left = '0';
    forms[0].style.left = '25px';
    forms[1].style.left = '450px';
});
buttons[1].addEventListener('click', function() {
    colorDiv.style.left = '110px';
    forms[0].style.left = '-400px';
    forms[1].style.left = '25px';
});

