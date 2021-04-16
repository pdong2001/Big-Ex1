var readMore = document.querySelector('#showmore');
var userBlock = document.querySelectorAll('#propose .user-block');
for (var index = 0; index < userBlock.length && index < 4; ++index) {
    userBlock[index].style.display = 'block';
}

readMore.addEventListener('click', (e) => {
    for (var index = 4; index < userBlock.length; ++index) {
        if (userBlock[index].style.display == 'block') {
            userBlock[index].style.display = 'none';
            readMore.innerHTML = "Xem thêm";

        } else {
            userBlock[index].style.display = 'block';
            readMore.innerHTML = "Ẩn bớt";

        }
    }
});