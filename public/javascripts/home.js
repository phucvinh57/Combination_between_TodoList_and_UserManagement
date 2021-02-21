var addNewTaskBtn = document.getElementById('add-item-btn');
var headerItemInfoBox = document.getElementById('modal-header');

var listItems = document.getElementsByClassName('item');
var chooseItems = document.getElementsByClassName('choose-item');

var itemInfoBox = document.getElementById('item-info');
var closeInfoBoxBtn = document.getElementById('close');
var cancelInfoBoxBtn = document.getElementById('cancel-box');
var saveInfoBoxBtn = document.getElementById('save-box');
let show1 = false, show2 = false;

addNewTaskBtn.addEventListener('click', function() {
    headerItemInfoBox.style.display = 'block';
    itemInfoBox.style.display = 'block';
    content.style.filter = 'blur(5px)';
    show2 = true;
});

for(let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('click', function() {
        headerItemInfoBox.style.display = 'none';
        itemInfoBox.style.display = 'block';
        content.style.filter = 'blur(5px)';
        show2 = true;
    });
}
for(let i = 0; i < chooseItems.length; i++) {
    chooseItems[i].addEventListener('click', function(event){
        event.stopPropagation();
    });
}

closeInfoBoxBtn.addEventListener('click', function() {
    itemInfoBox.style.display = 'none';
    if(!show1) content.style.filter = 'blur(0px)';
    show2 = false;
});
cancelInfoBoxBtn.addEventListener('click', function() {
    itemInfoBox.style.display = 'none';
    if(!show1) content.style.filter = 'blur(0px)';
    show2 = false;
});
saveInfoBoxBtn.addEventListener('click', function() {
    itemInfoBox.style.display = 'none';
    if(!show1) content.style.filter = 'blur(0px)';
    show2 = false;
});

