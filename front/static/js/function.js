
// Sign Up #############################################################################################################################################

// 회원가입
function CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail){
  let today = new Date();
  let year = today.getFullYear();
  year = year < 10 ? `0${year}` : year;
  let month = today.getMonth()+1;
  month = month < 10 ? `0${month}` : month;
  let date = today.getDate();
  date = date < 10 ? `0${date}` : date;
  let hour = today.getHours();
  hour = hour < 10 ? `0${hour}` : hour;
  let minutes = today.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let Seconds = today.getSeconds();
  Seconds = Seconds < 10 ? `0${Seconds}` : Seconds;
  let today_edit = `${year}${month}${date}${hour}${minutes}${Seconds}`

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${CreatIDAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "UserName":  UserName,
      "NickName":  NickName,
      "UserID":  UserID,
      "UserPassword":  UserPassword,
      "UserEmail":  UserEmail,
      "IdCreatDatetime":  today_edit
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })
}

// 닉네임 중복확인

function ReadNickNameCall(NickName){
  var NickNameDone;
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadNickNameAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "NickName":  NickName },
    async: false,
  }).done((data) => {
    if ( data.length === 0 ) {
      NickNameDone = false;
    } else {
      NickNameDone = true;
    }
  }).fail((err) => {
    console.log(err)
  })
  return NickNameDone;
}

// 아이디 중복확인
function ReadIDCall(UserID){
  var UserIDDone;
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadIDAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "UserID":  UserID },
    async: false,
  }).done((data) => {

    if ( data.length === 0 ) {
      UserIDDone = false;
    } else {
      UserIDDone = true;
    }
    
  }).fail((err) => {
    console.log(err)
  })
  return UserIDDone;
}

// Login #############################################################################################################################################



