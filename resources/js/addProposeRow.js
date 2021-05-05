function createUserBlock(ID = '', Name = '', Avt = '', Link = '') {
    var userBlock = document.createElement('div');
    var userLink = document.createElement('a');
    var userAvt = document.createElement('img');
    var userInfo = document.createElement('div');
    var userName = document.createElement('span');
    var userID = document.createElement('span');

    userID.className = 'user-id';
    userID.innerHTML = '@' + ID;
    userName.className = 'user-name';
    userName.innerHTML = Name;
    userInfo.className = 'user-info';
    userAvt.className = 'user-avt';
    userAvt.src = Avt;
    userLink.href = Link;
    userBlock.className = 'user-block';
    userInfo.appendChild(userName);
    userInfo.appendChild(userID);
    userLink.appendChild(userAvt);
    userLink.appendChild(userInfo);
    userBlock.appendChild(userLink);
    return userBlock;
}

function addProposeRow() {

    document.getElementById('propose').appendChild(createUserBlock('Uchiha_Itachi', 'Uchiha Itachi', 'resources/img/Avt_Itachi.PNG'));

};
for (var i = 0; i < 10; i++) {
    addProposeRow();
}