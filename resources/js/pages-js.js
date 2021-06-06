$(document).ready(function() {
    document.querySelector('#user-menu .tablink').click();
})
var currentTG;

$(document).ready(() => {
    $(window).scroll(() => {
        if ($('.post-detail').css('display') == 'none') {
            var scroll = $(this).scrollTop();
            document.querySelectorAll('#main .m-right .content-row').forEach(elem => {
                var video = elem.children[0].children[2].children[0];
                if (currentTG == null || currentTG != video) {
                    var elHeight, elTop;
                    elHeight = elem.offsetHeight;
                    elTop = elem.offsetTop + $('header').height() + 50;
                    if (window.innerWidth <= 768) {
                        elHeight -= elem.children[2].offsetHeight;
                    }
                    if (scroll >= (elTop - 100) && scroll <= (elHeight + elTop - 100)) {
                        if (video.paused) {
                            if (video.currentTime < 30) {
                                video.currentTime = 0;
                            }
                            video.play();
                        }
                    }
                }
            });
        }
    });
    $('.post-detail .close').click(function() {
        $('body').addClass('scroll-hidden');
    });
    $('.dropdown-menu').hover(function() {
        $(this).find('.dropdown-content').animate({
            height: $(this).find('.dropdown-content ul').height() + 'px'
        });
    }, function() {
        $(this).find('.dropdown-content').animate({
            height: '0px'
        });
    })
});

function onResize() {
    if (window.innerWidth <= 768) {
        $('#head-menu').appendTo($('#menu-more .dropdown-content'));
    } else {
        $('#head-menu').appendTo($('#menu-ctn'));
    }
};

$(document).ready(function() {
    $('.user-block .more .btn-show').click(function(e) {
        e.preventDefault();
        $(this).parent().find('.toshow').show();
    });
    $('#t-storage video').attr('controls', 'false');
    $('.cover-layer').click(() => {
        $('body').addClass('scroll-hidden');
    });
    $('#upload-video .close').click(function() {
        $('body').addClass('scroll-hidden');
    });
    $('.upload.button').click(function() {
        $('body').removeClass('scroll-hidden');
    });
});

function scrollToMenu() {
    $("html, body").animate({
        scrollTop: $('header').height()
    });
}