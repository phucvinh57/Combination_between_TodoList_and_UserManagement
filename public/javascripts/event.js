var eventForm = document.getElementById('event-form');
var addItemBtn = document.getElementById('add-item-btn');
var closeFormBtn = document.getElementById('close-event-btn');
var all = document.querySelectorAll('#event-form input, #event-form select, #event-form textarea');

closeFormBtn.onclick = function() {
    eventForm.style.display = 'none';
}

addItemBtn.onclick = function() {
    eventForm.style.display = 'flex';
    for(let i of all) {
        i.disabled = false;
    }
}
