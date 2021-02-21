var loginBtn = document.getElementById('login-btn');
var modalBox = document.getElementById('id01');
var closeModalBtn = document.getElementById('close')
var cancelModalBtn = document.getElementById('cancelbtn')

loginBtn.onclick = function () {
    modalBox.style.display = 'block';
}
closeModalBtn.onclick = function() {
    modalBox.style.display = 'none';
}
cancelModalBtn.onclick = function() {
    modalBox.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target == modalBox) {
        modalBox.style.display = 'none';
    }
}