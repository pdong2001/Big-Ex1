var readMore = document.querySelector('#showmore');
var userBlock = document.querySelectorAll('#propose .user-block');
var videoButton = document.querySelectorAll('.play-btn');
var divVideo = document.querySelectorAll('.video');
var contentVideo = document.querySelectorAll('.video video');
var likeButton = document.querySelectorAll('.center .like button');
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

function getStyle(el, styleProp) {
    var value, defaultView = el.ownerDocument.defaultView;
    // W3C standard way:
    if (defaultView && defaultView.getComputedStyle) {
        // sanitize property name to css notation (hypen separated words eg. font-Size)
        styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
        return defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    } else if (el.currentStyle) { // IE
        // sanitize property name to camelCase
        styleProp = styleProp.replace(/\-(\w)/g, function(str, letter) {
            return letter.toUpperCase();
        });
        value = el.currentStyle[styleProp];
        // convert other units to pixels on IE
        if (/^\d+(em|pt|%|ex)?$/i.test(value)) {
            return (function(value) {
                var oldLeft = el.style.left,
                    oldRsLeft = el.runtimeStyle.left;
                el.runtimeStyle.left = el.currentStyle.left;
                el.style.left = value || 0;
                value = el.style.pixelLeft + "px";
                el.style.left = oldLeft;
                el.runtimeStyle.left = oldRsLeft;
                return value;
            })(value);
        }
        return value;
    }
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
        document.getElementById('menu-left').style.display = 'none';
    }
};

document.querySelectorAll('.cmt-like input').forEach(
    elem => {
        elem.addEventListener('change', () => {
            var likeCount = document.querySelector('#' + elem.id + '-count span');
            if (likeCount.innerHTML == '') {
                likeCount.innerHTML = 0;
            }
            if (elem.checked) {
                likeCount.innerHTML = Number(likeCount.innerHTML) + 1;
            } else {
                likeCount.innerHTML = Number(likeCount.innerHTML) - 1;
            }
        });
    }
);


document.querySelectorAll('.video video').forEach(elem => {
    elem.addEventListener('play', () => {
        document.querySelectorAll('.video video:not(#' + elem.id + ')').forEach(video => {
            video.pause();
        });
    });
});

document.querySelectorAll('.right .comment').forEach(elem => {
    elem.querySelector('.interactive div a').addEventListener('click', () => {
        var match = elem.id.match(/-reply-\d+/i);
        $('.right .comment .comment-input').hide();
        $('#' + elem.id.replace(match, '') + '-input').toggle();
        $('#' + elem.id.replace(match, '') + '-input input').focus();
    });
});

$('.comment-input').focusout(function() {
    $(this).hide();
});


document.querySelectorAll('#main .contents .content-row .right .comment-input button').forEach(elem => {
    elem.addEventListener('click', () => {
        var prev = elem.previousElementSibling;
        var id = elem.parentElement.parentElement.parentElement.parentElement.id;
        if (prev.value != '') {
            var len = elem.parentElement.parentElement.previousElementSibling.children.length;
            var commentBlock = $('.comment.temp').clone();
            var commentMenu = getCommnetMenuTemplate();
            if (!elem.parentElement.classList.contains('input-main')) {
                id += '-reply';
            }

            commentMenu.appendTo(commentBlock);
            commentBlock.attr('id', id + '-' + len);
            commentBlock.find('.comment-content p').text(prev.value);
            commentBlock.find('.comment-content').attr('id', id + '-' + len);
            commentBlock.find('.like-count').attr('id', id + '-' + len + '-' + 'like-count');
            commentBlock.find('.cmt-like input').attr('id', id + '-' + len + '-' + 'like');
            commentBlock.find('.comment-content .like-count span').text('0');
            commentBlock.find('.cmt-like input').change(() => {
                var likeCount = document.querySelector('#' + id + '-' + len + '-' + 'like-count span');
                if (likeCount.innerHTML == '') {
                    likeCount.innerHTML = 0;
                }
                if ($('#' + id + '-' + len + '-' + 'like' + ':checked').length > 0) {
                    likeCount.innerHTML = Number(likeCount.innerHTML) + 1;
                } else {
                    likeCount.innerHTML = Number(likeCount.innerHTML) - 1;
                }
            });
            commentBlock.find('.cmt-like label').attr('for', id + '-' + len + '-' + 'like');
            commentBlock.removeClass('temp');
            commentBlock.find('.comment-more a:first-child').click(function() {
                $(this).siblings().show();
            });
            commentBlock.find('.cover-layer').click(function() {
                commentBlock.find('.comment-menu').hide();
            });
            commentBlock.find('.del').click(function() {
                $('#' + commentBlock.attr('id')).remove();
            });
            if (elem.parentElement.classList.contains('input-main')) {
                commentBlock.append('<div class="comment-reply-container" id="' + id + '-reply"><div></div></div>');
                getTemplate('.comment-input').appendTo(commentBlock.find('.comment-reply-container'));
                commentBlock.find('.comment-input').attr('id', id + '-input');
            }
            commentBlock.appendTo(elem.parentElement.parentElement.previousElementSibling);
            elem.previousElementSibling.value = '';
        }
    });
});


document.querySelectorAll('#main .contents .content-row .right .comment-input div').forEach(elem => {
    elem.children[0].addEventListener('keypress', function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            elem.children[1].click();
        }
    })
});

$(document).ready(() => {
    $('#main .contents').scroll(() => {
        var scroll = $('#main .contents').scrollTop();
        document.querySelectorAll('#main .contents .content-row').forEach(elem => {
            var elHeight, elTop;
            elHeight = elem.offsetHeight;
            elTop = elem.offsetTop;
            if (window.innerWidth <= 768) {
                elHeight -= elem.children[2].offsetHeight;
            }
            if (scroll >= (elTop - 100) && scroll <= (elHeight + elTop - 100)) {
                var video = elem.children[0].children[2].children[0];
                if (video.paused) {
                    if (video.currentTime < 30) {
                        elem.children[0].children[2].children[0].currentTime = 0;
                    }
                    elem.children[0].children[2].children[0].play();
                }
            }
        });
    });
});

function getTemplate(name) {
    var commnetOption = $(name + '.temp').clone();
    commnetOption.removeClass('temp');
    return commnetOption;
}

function getCommnetMenuTemplate() {
    var commnetOption = $('.comment-menu.temp').clone();
    commnetOption.removeClass('temp');
    return commnetOption;
}

function getParentElement(el, index) {
    var parent = el;
    for (var i = 0; i < index; i++) {
        parent = parent.parentElement;
    }
    return parent;
}

document.querySelectorAll('.comment .comment-more').forEach(elem => {
    getCommnetMenuTemplate().appendTo(elem);
})

document.querySelectorAll('.comment .comment-more .comment-menu .del').forEach(elem => {
    elem.addEventListener('click', () => {
        $('#' + getParentElement(elem, 7).id).remove();
    });
})
$(document).ready(function() {
    $('.comment-more a:first-child').click(function() {
        $(this).siblings().show();
    });
});

$(document).ready(() => {
    $('.comment-menu .cover-layer').click(function() {
        $(this).parent().hide();
    });
});

$('.center .interactive .comment button').click(function() {
    console.log('clicked');
    $('#' + $(this).attr('id') + '-input').show();
    $('#' + $(this).attr('id') + '-input input').focus();
})