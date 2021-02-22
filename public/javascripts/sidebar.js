var sideBar = document.getElementsByClassName('sidebar')[0];
var lists = document.getElementById('lists');
var menuBtn = document.getElementById('drop');
var dropIcon = document.getElementById('arrow_drop_down');
var toggleBtn = document.getElementById('check');
var btnImage = document.getElementsByClassName('fas fa-bars')[0];

var content = document.getElementsByClassName('content')[0];

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

menuBtn.addEventListener('click', function() {
    if(lists.style.display == 'none') {
        lists.style.display = 'block';
        dropIcon.innerHTML = 'arrow_drop_up';
    }
    else {
        lists.style.display = 'none';
        dropIcon.innerHTML = 'arrow_drop_down';
    }
});