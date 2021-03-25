var tabs = document.getElementsByClassName('tab');
var contents = document.getElementsByClassName('content');

console.log(tabs);

for(let i = 0; i < tabs.length; ++i) {
    tabs[i].addEventListener('click', function() {
        tabs[i].className = 'tab active';
        contents[i].style.display = 'block';
        let j = 0;
        while (j < tabs.length) {
            if(j == i) {
                j++;
                continue;
            }
            contents[j].style.display = 'none';
            tabs[j].className = 'tab';
            j++;
        }
    })
}