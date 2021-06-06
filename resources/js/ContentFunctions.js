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
    $('.comment .reply').click(function(e) {
        e.preventDefault();
        var id = getParent($(this), 3).attr('id');
        var match = id.match(/-reply-\d+/i);
        $('.comment-container .comment .comment-input').hide();
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

    $('.comment-input button').unbind('click');
    $('.comment-input button').click(function() {
        var container = getParent($(this), 3);
        var id = container.attr('id');
        var addInput = true;
        var val = $(this).parent().find('input').val();
        $(this).parent().find('input').val('');
        if (!$(this).parent().parent().hasClass('input-main')) {
            addInput = false;
        }
        var cmtBlock = addComment(getParent($(this), 2).prev(), id, 1, addInput, val);
        commentEvents();
        console.log(cmtBlock);
        container.find('.container').animate({
            scrollTop: cmtBlock.get(0).offsetTop
        }, 500);
    });
}


var currentTG;
$(document).ready(() => {
    document.querySelectorAll('.video video').forEach(elem => {
        elem.addEventListener('pause', function(e) {
            currentTG = e.currentTarget;
        });
    });
    $('#main .contents').scroll(() => {
        if ($('.post-detail, #upload-video').css('display') == 'none') {
            var scroll = $('#main .contents').scrollTop();
            document.querySelectorAll('#main .contents .content-row').forEach(elem => {
                var video = elem.children[0].children[2].children[0];
                if (currentTG == null || currentTG != video) {
                    var elHeight, elTop;
                    elHeight = elem.offsetHeight;
                    elTop = elem.offsetTop;
                    if (window.innerWidth <= 768) {
                        elHeight -= elem.children[2].offsetHeight;
                    }
                    if (scroll >= (elTop - 100) && scroll <= (elHeight + elTop - 100) &&
                        $('.post-detail').css('display') == 'none') {
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
    newContent.find('.video video source').attr('src', '../resources/data/video/Video-' + i + '.mp4');
    newContent.find('.comment-container').attr('id', 'jtx-' + len + '-cmt')
    newContent.find('.comment-input').attr('id', 'jtx-' + len + '-cmt-input');
    newContent.removeClass('temp');
    return newContent;
}

function addComment(Container, id, count, addInput = true, value = '') {
    var commentBlock;
    for (var i = 0; i < count; i++) {
        var len = Container.children().length;
        commentBlock = $('.comment.temp').clone(true);
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
    return commentBlock;
}

function addContentRow(i, el) {
    var newRow = createNewContentRow(i);
    addComment(newRow.find('.comment-container .container'), newRow.attr('id') + '-cmt', 5);
    newRow.appendTo(el);
}

function addContentRowTo(path) {
    var el = $(path);
    for (var i = 10; i > 0; i--) {
        addContentRow(i, el);
    }
}



commentEvents();

$(document).ready(function() {
    var parentElem;
    $('.scrollTop button').click(function() {
        $('.contents.container').animate({ scrollTop: 0 });
    });
    $('.post-detail .close').click(function() {
        $('.post-detail video').trigger('pause');
        $('.post-detail').hide();
        $('.post-detail').find('.itr .interactive').appendTo(parentElem.find('.center'));
        $('.post-detail').find('.comment-container').appendTo(parentElem);
    });
    document.querySelectorAll('video').forEach(elem => {
        elem.addEventListener('play', (e) => {
            document.querySelectorAll('video').forEach(video => {
                if (video != e.currentTarget && !e.currentTarget.paused) {
                    video.pause();
                }
            });
        });
    });
    document.querySelector('.post-detail video').addEventListener('canplay', function(e) {
        e.currentTarget.play();
    });
    $('.video video, .results .caption p').click(function(e) {
        if (e.currentTarget.paused) {
            e.currentTarget.play();
        }
        var postDetail = $('.post-detail');
        var video = postDetail.find('video');
        parentElem = $(this).parent().parent().parent();
        video.find('source').attr('src', parentElem.find('source').attr('src'));
        postDetail.find('.user-block').replaceWith(parentElem.find('.left .user-block').clone());

        postDetail.find('.caption p').html(parentElem.find('.left .caption p').html());
        postDetail.find('.itr').append(parentElem.find('.center .interactive'));
        postDetail.find('.right .cmt-container').append(parentElem.find('.comment-container'));
        postDetail.find('.input-main').unbind('focusout');
        $('.post-detail').show();
        postDetail.find('.input-main').show();
        video.get(0).load();
    });
    $('.cover-layer').click(function() {
        $(this).parent().hide();
    });
    $('.background input[type=file]').change(function() {
        var path = $(this).val().replace(/C:\\fakepath\\/i, '')
        path = '../resources/img/' + path;
        $(this).parent().prev().attr('src', path);
    });
    $('#upload-video input[type=file').change(function() {
        var path = $(this).val().replace(/C:\\fakepath\\/i, '')
        path = '../resources/data/video/' + path;
        $(this).parent().next().find('video').attr('src', path);
        $(this).parent().next().find('video').get(0).load();

    });
    $('#upload-video .close').click(function() {
        $('#upload-video').hide();
        $('#upload-video video').get(0).pause();
    });
    $('.upload.button').click(function() {
        $('#upload-video').show();
        $('body').removeClass('scroll-hidden');
    });
    $('#search').keypress(function(event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13) {
            window.open('../search/all.html')
        }
    })
    $('#searchbar button').click(() => {
        window.open('../search/all.html');
    })
});