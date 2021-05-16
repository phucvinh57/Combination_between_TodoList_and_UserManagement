var eventForm = document.getElementById('event-form');
var addItemBtn = document.getElementById('add-item-btn');
var recommendTime = document.getElementById('recommendTime');
var addTimeBtn = document.getElementById('add-time');
var listOfTime = document.getElementById('list-time');
var deleteBtns = document.getElementsByClassName('delete');
var allCheckBox = document.querySelectorAll('.person input');

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}

for (let i of deleteBtns) {
    i.onclick = function () { 
        i.parentNode.remove();
    }
}

function formatTime(dateString) {
    let date = new Date(dateString)
    let day;
    switch(date.getDay()) {
        case 0:
            day = 'CN';
            break;
        default:
            day = `T${date.getDay() + 1}`
    }

    let arr = date.toLocaleString().split(',');
    arr[1] = arr[1].slice(1);
    arr[1] = arr[1].slice(0, 4) + arr[1].slice(7);
    let a = arr[0].split('/');
    arr[0] = a[1] + '/' + a[0] + '/' + a[2];
    return arr[1] + ', ' + day + ' ngày ' + arr[0];
}

if(addTimeBtn != null) addTimeBtn.onclick = function () {
    if (recommendTime.value == '') {
        console.log('please input time');
    }
    else {
        var date = recommendTime.value;
        var newTime = document.createElement('li');
    
        var content = document.createElement('span');
        content.className = 'time-value';
        content.innerText = formatTime(date);
        var deleteBtn = document.createElement('span');
        deleteBtn.className = 'material-icons delete';
        deleteBtn.innerText = 'clear';
        
        // var vote = document.createElement('span');
        // vote.className = 'number-vote';

        newTime.className ='list-group-item time';
        newTime.appendChild(content);
        newTime.appendChild(deleteBtn);
    
        listOfTime.appendChild(newTime);
    
        deleteBtn.onclick = function() {
            deleteBtn.parentNode.remove();
        }
    }
}