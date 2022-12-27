
// Sign Up #############################################################################################################################################

// 회원가입

function CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail){
  let today = new Date();
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
      "IdCreatDatetime":  today
    }
  }).done((data) => {
      alert("회원가입이 완료되었습니다.");
  }).fail((err) => {
    console.log(err)
  })
}

// 닉네임 중복확인
function ReadNickNameCall(NickName){
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadNickNameAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "NickName":  NickName }
  }).done((data) => {

    if ( data.hasOwnProperty('NickName')) {
      return 0;
    } else {
      return 1;
    }
    
  }).fail((err) => {
    console.log(err)
  })
}

// 아이디 중복확인
function ReadIDCall(UserID){
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadIDAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "UserID":  UserID }
  }).done((data) => {

    if ( data.hasOwnProperty('UserID')) {
      return 0;
    } else {
      return 1;
    }
    
  }).fail((err) => {
    console.log(err)
  })
}

// Login #############################################################################################################################################



