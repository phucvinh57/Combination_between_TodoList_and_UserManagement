var avatarImage = document.getElementById('img-avatar');
var uploadBtn = document.getElementById('upload-btn');

avatarImage.addEventListener('mouseenter', function() {
    uploadBtn.style.display = 'block';
    avatarImage.style.opacity = '0.5';
})
console.log(avatarImage);
avatarImage.addEventListener('mouseleave', function() {
    uploadBtn.style.display = 'none';
    avatarImage.style.opacity = '1';
})
uploadBtn.addEventListener('mouseenter', function() {
    uploadBtn.style.cursor = 'pointer';
    uploadBtn.style.display = 'block';
    avatarImage.style.opacity = '0.5';
})