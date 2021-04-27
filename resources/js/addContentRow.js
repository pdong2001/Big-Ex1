function addContentRow() {
    var idNumber = document.querySelectorAll('.like-checkbox').length + 1;
    var rowComment = '';
    var userLink = './personal_page.html'
    for (var i = 0; i < 100; i++) {
        rowComment +=
            '                       <div class="comment">' +
            '                           <div class="comment-block">' +
            '                               <div class="user-block">' +
            '                                   <a href="">' +
            '                                       <img class="user-avt" src="resources/img/Avt_Itachi.PNG">' +
            '                                       <div class="user-info">' +
            '                                           <span class="user-name">Uchiha Itachi</span>' +
            '                                           <span class="user-id">@Uchiha_Itachi_2MGS</span>' +
            '                                       </div>' +
            '                                   </a>' +
            '                               </div>' +
            '                           </div>' +
            '                            <div class="comment-content">' +
            '                                <p>' +
            '                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero quam, fugit laudantium consequuntur aut amet officia explicabo dolor laboriosam corrupti. Laborum aut placeat qui eius at quia porro, suscipit reiciendis.' +
            '                                </p>' +
            '                            </div>' +
            '                            <div class="interactive">' +
            '                               <div>' +
            '                                    <span class="opacity">36 phút trước</span>' +
            '                                    <a href=""><i class="fas fa-reply"></i>Trả lời</a>' +
            '                                       <div class="cmt-like">' +
            '                                           <input type="checkbox" id="jtx-' + idNumber + '-cmt-' + i + '">' +
            '                                           <label for="jtx-' + idNumber + '-cmt-' + i + '"><i class="cmt-heart far fa-heart"></i>Thích</label>' +
            '                                       </div>' +
            '                                    <a href=""><i class="fas fa-ellipsis-h"></i></a>' +
            '                                </div>' +
            '                            </div>' +
            '                       </div>';
    }
    var myvar = '<div class="row" id="content-row">' +
        '                <div class="left container ">' +
        '                    <div class="user-block">' +
        '                        <a href="' + userLink + '">' +
        '                            <img class="user-avt" src="resources/img/Avt_Itachi.PNG">' +
        '                            <div class="user-info">' +
        '                                <span class="user-name">Uchiha Itachi</span>' +
        '                                <span class="user-id">@Uchiha_Itachi_2MGS</span>' +
        '                            </div>' +
        '                        </a>' +
        '                    </div>' +
        '                    <div class="caption">' +
        '                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo quod sunt illo reiciendis possimus pariatur ipsa, quia perspiciatis neque nam optio illum architecto nulla doloremque veniam. Unde eos iure assumenda.' +
        '                    </div>' +
        '                    <div class="video">' +
        '                        <video playsinline controls autoplay="" name="media"><source src="resources/data/video/Video-1.mp4" type="video/mp4"></video>' +
        '                    </div>' +
        '                </div>' +
        '                <div class="center">' +
        '                    <div class="interactive">' +
        '                        <div class="interactive-btn like">' +
        '                            <div>' +
        '                                <form>' +
        '                                    <input type="checkbox" id="itr-' + idNumber + '" class="like-checkbox" />' +
        '                                    <label for="itr-' + idNumber + '">' +
        '                                    <svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">' +
        '                                    <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">' +
        '                                    <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" id="heart" fill="#AAB8C2"/>' +
        '                                    <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>' +
        '                                    <g id="grp7" opacity="0" transform="translate(7 6)">' +
        '                                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2"/>' +
        '                                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp6" opacity="0" transform="translate(0 28)">' +
        '                                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2"/>' +
        '                                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp3" opacity="0" transform="translate(52 28)">' +
        '                                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2"/>' +
        '                                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp2" opacity="0" transform="translate(44 6)">' +
        '                                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2"/>' +
        '                                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp5" opacity="0" transform="translate(14 50)">' +
        '                                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2"/>' +
        '                                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp4" opacity="0" transform="translate(35 50)">' +
        '                                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2"/>' +
        '                                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    <g id="grp1" opacity="0" transform="translate(24)">' +
        '                                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2"/>' +
        '                                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2"/>' +
        '                                    </g>' +
        '                                    </g>' +
        '                                    </svg>' +
        '                                    </label>' +
        '                                </form>' +
        '                            </div>' +
        '                        </div>' +
        '                        <div class="interactive-btn comment">' +
        '                            <button class="">' +
        '                            <i class="far fa-comment-dots"></i>' +
        '                        </button>' +
        '                        </div>' +
        '                        <div class="interactive-btn share">' +
        '                            <button class="">' +
        '                            <i class="far fa-share-square"></i>' +
        '                        </button>' +
        '                        </div>' +
        '                    </div>' +
        '                </div>' +
        '                <div class="right container ">' +
        '                   <div class="container scroll-hidden">' +
        rowComment +
        '                   </div>' +
        '                </div>' +
        '            </div>';
    document.write(myvar);
};
addContentRow();
addContentRow();
addContentRow();