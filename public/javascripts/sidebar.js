var sideBar = document.getElementsByClassName('sidebar')[0];
var lists = document.getElementById('lists');
var dropIcon = document.getElementById('arrow_drop_down');
var toggleBtn = document.getElementById('check');
var btnImage = document.getElementsByClassName('fas fa-bars')[0];
var eventForm = document.getElementById('event-form');

var content = document.getElementsByClassName('main-content')[0];

toggleBtn.addEventListener('change', function() {
    if(!this.checked) {
        sideBar.style.left = '-220px';
        content.style.filter = 'blur(0px)';
        btnImage.className = 'fas fa-bars';
    }
    else {
        sideBar.style.left = '0';
        content.style.filter = 'blur(5px)';
        btnImage.className = 'fas fa-arrow-left';
    }
});
