
// Sign Up #############################################################################################################################################

// 유효성 검사

function CheckSignUp(){
  var UserName = document.getElementById('UserName').value;
  var NickName = document.getElementById('NickName').value;
  var UserID = document.getElementById('UserID').value;
  var UserPassword = document.getElementById('UserPassword').value;
  var UserPasswordCheck = document.getElementById('UserPasswordCheck').value;
  var UserEmail = document.getElementById('UserEmail').value;

  if (NickName.length < 2 || NickName.length >= 20) {
    alert("닉네임은 2글자 이상 20글자 이하입니다.");
  } else if (ReadNickNameCall(NickName)) {
    alert("중복된 닉네임입니다.");
  } else if (UserID.length < 2 || UserID.length >= 20) {
    alert("아이디는 2글자 이상 20글자 이하입니다.");
  } else if (ReadIDCall(UserID)) {
    alert("중복된 아이디입니다.");
  } else if (UserPassword.length < 2 || UserPassword.length >= 20) {
    alert("비밀번호는 2글자 이상 20글자 이하입니다.");
  } else if (UserPassword !== UserPasswordCheck) {
    alert("비밀번호가 다릅니다.");
  } else if (!UserEmail.includes("@") || !UserEmail.includes(".")) {
    alert("올바른 이메일 형식이 아닙니다.");
  } else {
    CreatIDCall(UserName, NickName, UserID, UserPassword, UserEmail);
    alert("회원가입이 완료되었습니다.");
    location.replace("/login");
  }
}

// Login #############################################################################################################################################

// 쿠키

// 쿠키 저장
function setCookie(name, value, exp) {
	var date = new Date();
	date.setTime(date.getTime() + exp*24*60*60*1000);
	document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
}

// 쿠키 불러오기
function getCookie(name) {
	var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    
	return value? value[2] : null;
};

// 쿠키 삭제하기
function deleteCookie(name) {
	document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;SameSite=Lax';
  window.location.reload();
}

// 유효성 검사
function CheckLogin(){
  var tomrrow = new Date();
  tomrrow.setDate(tomrrow.getDate() + 1);

  var UserID = document.getElementById('UserID').value;
  var UserPassword = document.getElementById('UserPassword').value;
  var LoginCheck = LoginCheckCall(UserID, UserPassword);
  console.log(LoginCheck);

  if (LoginCheck === 0) {
    alert("존재하지 않는 회원 아이디입니다.");
  } else if (LoginCheck === 1) {
    alert("비밀번호가 일치하지 않습니다.");
  } else if (LoginCheck === 2) {
    alert("로그인 되었습니다.");
    setCookie('UserID', UserID, 1);
    location.replace("/");
  } else {
    alert("로그인 에러.");
  }
}

// 로그인
function LoginLogout() {
  if (getCookie('UserID') !== null) {
    $('.login').html(`<a onclick="deleteCookie('UserID')" class="login_text">로그아웃</a>`)
  } else {
    $('.login').html(`<a href="/login" class="login_text">로그인</a>`)
  }
}

// Post #############################################################################################################################################

// 등록 버튼
function writebt() {
  if (getCookie('UserID') !== null) {
    $('.bt_wrap').html(`<a href="/write" class="on">등록</a>`)
  } else {
    $('.bt_wrap').html(``)
  }
}

// 페이징
function MainPaging() {
  let totalData; //총 데이터
  let dataPerPage = 10; //한 페이지에 나타낼 글 수
  let pageCount = 10; //페이징에 나타낼 페이지 수
  let globalCurrentPage = 1; //현재 페이지

  totalData = AllPostCall();
  
  //글 목록 표시 호출 (테이블 생성)
  displayData(1, dataPerPage, totalData);
  
  //페이징 표시 호출
  paging(totalData, dataPerPage, pageCount, 1, globalCurrentPage);
  
}

// 게시글 작성
function CreatPost() {
  var PostTitle = document.getElementById('PostTitle').value;
  var PostTitleEdit = PostTitle.replaceAll("'", '"');
  var PostContent = document.getElementById('PostContent').value;
  var PostContentEdit = PostContent.replaceAll("'", '"');

  CreatPostCall(PostTitleEdit, PostContentEdit);

  alert("등록 되었습니다.");

  location.replace("/view");

}

// 게시글 조회
function ReadPost() {
  var PostNum = getCookie('PostNum');
  var NickName = getCookie('NickName');
  var PostTitle = getCookie('PostTitle');
  var PostCreatDatetime = getCookie('PostCreatDatetime');
  var PostContent = ReadPostCall(NickName, PostCreatDatetime);
  var PostContentbr = PostContent.replaceAll('\n', '<br>');
  var PostTitleEdit = PostTitle.replaceAll('"', "'");
  var PostContentEdit = PostContentbr.replaceAll('"', "'");


  $('.title').html(`${PostTitleEdit}`);
  $('.info').html(
    `<dl>` +
        `<dt>번호</dt>` +
        `<dd>${PostNum}</dd>` +
    `</dl>` +
    `<dl>` +
        `<dt>글쓴이</dt>` +
        `<dd>${NickName}</dd>` +
    `</dl>` +
    `<dl>` +
        `<dt>작성일</dt>` +
        `<dd>${PostCreatDatetime}</dd>` +
    `</dl>`
  );
  $('.cont').html(`${PostContentEdit}`);

}

// 수정 버튼
function updatebt() {
  var NickName = getCookie('NickName');

  if (getCookie('UserID') !== null) {
    var UserID = getCookie('UserID');
    var NowUser = NickNameCall(UserID);
    if (NickName === NowUser) {

      $('.bt_wrap').html(
        `<a href="/" class="on">목록</a>` +
        `<a href="/edit">수정</a>`
      )
    } else {
      $('.bt_wrap').html(`<a href="/" class="on">목록</a>`)
    }
  } else {
    $('.bt_wrap').html(`<a href="/" class="on">목록</a>`)
  }


}

// 게시글 쿠키
function PostCookie(PostNum) {
  let totalData; //총 데이터

  totalData = AllPostCall();

  deleteCookie('PostNum');
  deleteCookie('NickName');
  deleteCookie('PostTitle');
  deleteCookie('PostCreatDatetime');

  setCookie('PostNum', PostNum + 1, 1);
  setCookie('NickName', totalData[2][PostNum], 1);
  setCookie('PostTitle', totalData[1][PostNum], 1);
  setCookie('PostCreatDatetime', totalData[3][PostNum], 1);

  location.href = "/view";
}

// 수정 페이지
function BeforePost() {
  
  var NickName = getCookie('NickName');
  var PostTitle = getCookie('PostTitle');
  var PostCreatDatetime = getCookie('PostCreatDatetime');
  var PostContent = ReadPostCall(NickName, PostTitle, PostCreatDatetime);

  $('.title').html(
    `<dl>` +
        `<dt>제목</dt>` +
        `<dd><input type="text" id="PostTitle" placeholder="제목 입력" value="${PostTitle}"></dd>` +
    `</dl>`
  );
  $('.cont').html(
    `<textarea id="PostContent" placeholder="내용 입력">` +
        `${PostContent}` +
    `</textarea>`
  );

}

// 게시글 수정
function UpdatePost() {

  var NickName = getCookie('NickName');
  var PostNum = getCookie('PostNum');
  var PostCreatDatetime = getCookie('PostCreatDatetime');
  var PostTitleUpdate = document.getElementById('PostTitle').value;
  var PostContentUpdate = document.getElementById('PostContent').value;

  UpdatePostCall(NickName, PostTitleUpdate, PostContentUpdate, PostCreatDatetime);

  deleteCookie('PostNum');
  deleteCookie('NickName');
  deleteCookie('PostTitle');
  deleteCookie('PostCreatDatetime');

  setCookie('PostNum', PostNum, 1);
  setCookie('NickName', NickName, 1);
  setCookie('PostTitle', PostTitleUpdate, 1);
  setCookie('PostCreatDatetime', PostCreatDatetime, 1);

  alert("수정 되었습니다.");

  location.href = "/view";
  
}

// 게시글 삭제
function DeletePost() {

  var NickName = getCookie('NickName');
  var PostCreatDatetime = getCookie('PostCreatDatetime');

  DeletePostCall(NickName, PostCreatDatetime);

  deleteCookie('PostNum');
  deleteCookie('NickName');
  deleteCookie('PostTitle');
  deleteCookie('PostCreatDatetime');

  alert("삭제 되었습니다.");

  location.replace("/");
  
}

// // Comment #############################################################################################################################################

// // 댓글 작성
// function CreatComment() {
//   var PostTitle = document.getElementById('PostTitle').value;
//   var PostContent = document.getElementById('PostContent').value;

//   CreatPostCall(PostTitle, PostContent);

//   alert("등록 되었습니다.");

//   location.replace("/view");

// }

// // 댓글 조회
// function ReadPost() {
//   var PostNum = getCookie('PostNum');
//   var NickName = getCookie('NickName');
//   var PostTitle = getCookie('PostTitle');
//   var PostCreatDatetime = getCookie('PostCreatDatetime');
//   var PostContent = ReadPostCall(NickName, PostTitle, PostCreatDatetime);
//   var PostContentedit = PostContent.replaceAll('\n', '<br>')

//   $('.title').html(`${PostTitle}`);
//   $('.info').html(
//     `<dl>` +
//         `<dt>번호</dt>` +
//         `<dd>${PostNum}</dd>` +
//     `</dl>` +
//     `<dl>` +
//         `<dt>글쓴이</dt>` +
//         `<dd>${NickName}</dd>` +
//     `</dl>` +
//     `<dl>` +
//         `<dt>작성일</dt>` +
//         `<dd>${PostCreatDatetime}</dd>` +
//     `</dl>`
//   );
//   $('.cont').html(`${PostContentedit}`);

//   return NickName;
// }

// // 수정 버튼
// function updatebt(NickName) {


//   if (getCookie('UserID') !== null) {
//     var UserID = getCookie('UserID');
//     var NowUser = NickNameCall(UserID);
//     if (NickName === NowUser) {

//       $('.bt_wrap').html(
//         `<a href="/" class="on">목록</a>` +
//         `<a href="/edit">수정</a>`
//       )
//     } else {
//       $('.bt_wrap').html(`<a href="/" class="on">목록</a>`)
//     }
//   } else {
//     $('.bt_wrap').html(`<a href="/" class="on">목록</a>`)
//   }


// }

// // 게시글 쿠키
// function PostCookie(PostNum) {
//   let totalData; //총 데이터

//   totalData = AllPostCall();

//   deleteCookie('PostNum');
//   deleteCookie('NickName');
//   deleteCookie('PostTitle');
//   deleteCookie('PostCreatDatetime');

//   setCookie('PostNum', PostNum + 1, 1);
//   setCookie('NickName', totalData[2][PostNum], 1);
//   setCookie('PostTitle', totalData[1][PostNum], 1);
//   setCookie('PostCreatDatetime', totalData[3][PostNum], 1);

//   location.href = "/view";
// }

// // 수정 페이지
// function BeforePost() {
  
//   var NickName = getCookie('NickName');
//   var PostTitle = getCookie('PostTitle');
//   var PostCreatDatetime = getCookie('PostCreatDatetime');
//   var PostContent = ReadPostCall(NickName, PostTitle, PostCreatDatetime);

//   $('.title').html(
//     `<dl>` +
//         `<dt>제목</dt>` +
//         `<dd><input type="text" id="PostTitle" placeholder="제목 입력" value="${PostTitle}"></dd>` +
//     `</dl>`
//   );
//   $('.cont').html(
//     `<textarea id="PostContent" placeholder="내용 입력">` +
//         `${PostContent}` +
//     `</textarea>`
//   );

// }

// // 게시글 수정
// function UpdatePost() {

//   var NickName = getCookie('NickName');
//   var PostNum = getCookie('PostNum');
//   var PostCreatDatetime = getCookie('PostCreatDatetime');
//   var PostTitleUpdate = document.getElementById('PostTitle').value;
//   var PostContentUpdate = document.getElementById('PostContent').value;

//   UpdatePostCall(NickName, PostTitleUpdate, PostContentUpdate, PostCreatDatetime);

//   deleteCookie('PostNum');
//   deleteCookie('NickName');
//   deleteCookie('PostTitle');
//   deleteCookie('PostCreatDatetime');

//   setCookie('PostNum', PostNum, 1);
//   setCookie('NickName', NickName, 1);
//   setCookie('PostTitle', PostTitleUpdate, 1);
//   setCookie('PostCreatDatetime', PostCreatDatetime, 1);

//   alert("수정 되었습니다.");

//   location.href = "/view";
  
// }

// // 게시글 삭제
// function DeletePost() {

//   var NickName = getCookie('NickName');
//   var PostCreatDatetime = getCookie('PostCreatDatetime');

//   DeletePostCall(NickName, PostCreatDatetime);

//   deleteCookie('PostNum');
//   deleteCookie('NickName');
//   deleteCookie('PostTitle');
//   deleteCookie('PostCreatDatetime');

//   alert("삭제 되었습니다.");

//   location.replace("/");
  
// }