var readMore = document.querySelector('#showmore');
var userBlock = document.querySelectorAll('#propose .user-block');
for (var index = 0; index < userBlock.length && index < 4; ++index) {
    userBlock[index].style.display = 'block';
}
if (readMore != null) {
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
}

$('#menu-btn button').click(() => {
    $('#menu-btn button').animate('slow', {
        padding: '14px 16px'
    });
    $('#menu-left').fadeToggle();
});
$('#menu-left .cover-layer').click(() => {
    $('#menu-left').fadeToggle();
})

function onResize() {
    if (window.innerWidth <= 768) {
        $('#menu-left').hide();
        $('#head-menu').appendTo($('#menu-more .dropdown-content'));
    } else {
        $('#head-menu').appendTo($('#menu-ctn'));
    }
};

$('.dropdown-menu').hover(function() {
    $(this).find('.dropdown-content').animate({
        height: $(this).find('.dropdown-content ul').height() + 'px'
    }, 100);
}, function() {
    $(this).find('.dropdown-content').animate({
        height: '0px'
    }, 100);
});

function openTab(evt, tabName, className) {
    var i, tabcontent, tablinks;
    if (evt.currentTarget.classList.contains('active')) {
        $("html, body").animate({
            scrollTop: $('header').height()
        });
    } else {
        $(evt.currentTarget).parent().find('.active').removeClass('active');
        evt.currentTarget.className += " active";
        tabcontent = document.getElementsByClassName(className);
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        document.getElementById(tabName).style.display = "block";
    }
}


$(document).ready(onResize());