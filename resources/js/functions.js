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

function commentEvents() {
    $('.cmt-like input').unbind('change');
    $('.cmt-like input').change(function() {
        var likeCount = document.querySelector('#' + $(this).attr('id') + '-count span');
        console.log('#' + $(this).attr('id') + '-count span');
        if (likeCount.innerHTML == '') {
            likeCount.innerHTML = 0;
        }
        if ($(this).prop('checked')) {
            likeCount.innerHTML = Number(likeCount.innerHTML) + 1;
        } else {
            likeCount.innerHTML = Number(likeCount.innerHTML) - 1;
        }
    });

    $('.comment .reply').unbind('click');
    $('.comment .reply').click(function() {
        var id = getParent($(this), 3).attr('id');
        var match = id.match(/-reply-\d+/i);
        $('.right .comment .comment-input').hide();
        $('#' + id.replace(match, '') + '-input').toggle();
        $('#' + id.replace(match, '') + '-input input').focus();
    });

    $('.comment-input').unbind('focusout');
    $('.comment-input').focusout(function() {
        $(this).hide();
    });
    $('.comment-input input').unbind('keypress');
    $('.comment-input input').on('keypress', function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $(this).parent().find('button').click();
            $(this).focusout();
        }
    });


    document.querySelectorAll('.comment .comment-more').forEach(elem => {
        if (elem.children.length < 2)
            getCommnetMenuTemplate().appendTo(elem);
    })


    $('.comment-more .more').unbind('click');
    $('.comment-more .more').click(function() {
        $(this).siblings().show();
    });

    $('.comment-menu .del').unbind('click');
    $('.comment-menu .del').click(function() {
        getParent($(this), 7).remove();
    });

    $('.comment-menu .cover-layer').unbind('click');
    $('.comment-menu .cover-layer').click(function() {
        $(this).parent().hide();
    });

    $('.center .interactive .comment button').unbind('click');
    $('.center .interactive .comment button').click(function() {
        $('#' + $(this).attr('id') + '-input').show();
        $('#' + $(this).attr('id') + '-input input').focus();
    });

    $('#main .contents .content-row .right .comment-input button').unbind('click');
    $('#main .contents .content-row .right .comment-input button').click(function() {
        var container = getParent($(this), 3);
        var id = container.attr('id');
        var addInput = true;
        var val = $(this).parent().find('input').val();
        if (!$(this).parent().parent().hasClass('input-main')) {
            addInput = false;
        }
        addComment(getParent($(this), 2).prev(), id, 1, addInput, val);
        commentEvents();
    });
}


document.querySelectorAll('.video video').forEach(elem => {
    elem.addEventListener('play', () => {
        document.querySelectorAll('.video video:not(#' + elem.id + ')').forEach(video => {
            video.pause();
        });
    });
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
    var commnetOption = $(name + '.temp').clone(true);
    commnetOption.removeClass('temp');
    return commnetOption;
}

function getCommnetMenuTemplate() {
    var commnetOption = $('.comment-menu.temp').clone(true);
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

function getParent(el, index) {
    var parent = el;
    for (var i = 0; i < index; i++) {
        parent = parent.parent();
    }
    return parent;
}


function createNewContentRow(i) {
    var newContent = $('.row.content-row.temp').clone(true);
    var len = $('.row.content-row').length;

    newContent.attr('id', 'jtx-' + len);
    newContent.find('.video video').attr('id', 'jtx-' + len + '-video');

    var likeBtn = newContent.find('.center .interactive .like form');
    likeBtn.find('span:first-child').attr('id', 'jtx-' + len + '-like-count');
    likeBtn.find('input:checkbox').attr('id', 'jtx-' + len + '-like');
    likeBtn.find('label').attr('for', 'jtx-' + len + '-like');

    newContent.find('.center .comment button').attr('id', 'jtx-' + len + '-cmt');
    newContent.find('.video video').attr('id', 'jtx-' + len + '-video');
    newContent.find('.video video source').attr('src', 'resources/data/video/Video-' + i + '.mp4');
    newContent.find('.right').attr('id', 'jtx-' + len + '-cmt')
    newContent.find('.comment-input').attr('id', 'jtx-' + len + '-cmt-input');
    newContent.removeClass('temp');
    return newContent;
}

function addComment(Container, id, count, addInput = true, value = '') {
    for (var i = 0; i < count; i++) {
        var len = Container.children().length;
        var commentBlock = $('.comment.temp').clone(true);
        if (value != '') {
            commentBlock.find('.comment-content p').text(value);
        }
        commentBlock.attr('id', id + '-' + len);
        commentBlock.find('.comment-content').attr('id', id + '-' + len + '-content');
        commentBlock.find('.like-count').attr('id', id + '-' + len + '-' + 'like-count');
        commentBlock.find('.cmt-like input').attr('id', id + '-' + len + '-' + 'like');
        commentBlock.find('.comment-content .like-count span').text('0');
        commentBlock.find('.cmt-like label').attr('for', id + '-' + len + '-' + 'like');
        commentBlock.removeClass('temp');
        if (addInput) {
            commentBlock.append('<div class="comment-reply-container" id="' + id + '-' + len + '-reply"><div></div></div>');
            getTemplate('.comment-input').appendTo(commentBlock.find('.comment-reply-container'));
            commentBlock.find('.comment-input').attr('id', id + '-' + len + '-input');
        }
        commentBlock.appendTo(Container);
    }
}

function addContentRow(i) {
    var newRow = createNewContentRow(i);
    addComment(newRow.find('.right .container'), newRow.attr('id') + '-cmt', 5);
    newRow.appendTo($('.contents.container'));
}

for (var i = 10; i > 0; i--) {
    addContentRow(i);
}

commentEvents();

$(document).ready(function() {
    $('.scrollTop button').click(function() {
        $('.contents.container').animate({ scrollTop: 0 });
    });
});