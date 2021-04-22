function addProposeRow() {
    return '<div class="user-block">' +
        '                        <a href="">' +
        '                            <img class="user-avt" src="resources/img/Avt_Itachi.PNG">' +
        '                            <div class="user-info">' +
        '                                <span class="user-name">Uchiha Itachi</span>' +
        '                                <span class="user-id">@Uchiha_Itachi_2MGS</span>' +
        '                            </div>' +
        '                        </a>' +
        '                    </div>';
};
for (var i = 0; i < 10; i++) {
    document.write(addProposeRow());
}