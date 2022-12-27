
// Sign Up #############################################################################################################################################

// 유효성 검사

function CheckSignUp(){
  var UserName = document.getElementById('UserName').value;
  var NickName = document.getElementById('NickName').value;
  var UserID = document.getElementById('UserID').value;
  var UserPassword = document.getElementById('UserPassword').value;
  var UserEmail = document.getElementById('UserEmail').value;

  console.log(UserName, NickName, UserID, UserPassword, UserEmail);

  if (NickName.length < 2 || NickName.length >= 20) {
    alert("닉네임은 2글자 이상 20글자 이하입니다.");
  } else if (UserID.length < 2 || UserID.length >= 20) {
    alert("아이디는 2글자 이상 20글자 이하입니다.");
  } else if (UserPassword.length < 2 || UserPassword.length >= 20) {
    alert("비밀번호는 2글자 이상 20글자 이하입니다.");
  } else if (!UserEmail.includes("@") || !UserEmail.includes(".")) {
    alert("올바른 이메일 형식이 아닙니다.");
  } else {
    CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail);
  }
}