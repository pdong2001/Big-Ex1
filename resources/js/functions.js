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

// function btnMenu_Click() {
//     var menuLeft = document.getElementById('menu-left');
//     if (menuLeft.style.display != 'none') {
//         menuLeft.style.display = 'none';
//     } else {
//         menuLeft.style.display = 'block'
//     }
// }

$('#menu-btn button').click(() => {
    $('#menu-left').fadeToggle();
});


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
    });
});