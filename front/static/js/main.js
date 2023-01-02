
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
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostTitle = totalData[1][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  var PostContent = ReadPostCall(NickName, PostCreatDatetime);
  var PostContentbr = PostContent.replaceAll('\n', '<br>');
  var PostTitleEdit = PostTitle.replaceAll('"', "'");
  var PostContentEdit = PostContentbr.replaceAll('"', "'");


  $('.title').html(`${PostTitleEdit}`);
  $('.info').html(
    `<dl>` +
        `<dt>번호</dt>` +
        `<dd>${Number(PostNum) + 1}</dd>` +
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

  return NickName;

}

// 수정 버튼
function updatebtClick() {
  location.replace("/edit");
}
function updatebt(NickName) {

  if (getCookie('UserID') !== null) {
    var UserID = getCookie('UserID');
    var NowUser = NickNameCall(UserID);
    if (NickName === NowUser) {

      $('.bt_wrap').html(
        `<a href="/" class="on">목록</a>` +
        `<a onclick="updatebtClick()">수정</a>` +
        `<a onclick="DeletePost()">삭제</a>`
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

  deleteCookie('PostNum');

  setCookie('PostNum', PostNum, 1);

  location.href = "/view";
}

// 수정 페이지
function BeforePost() {
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostTitle = totalData[1][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  var PostContent = ReadPostCall(NickName, PostCreatDatetime);
  var PostTitleEdit = PostTitle.replaceAll('"', "'");
  var PostContentEdit = PostContent.replaceAll('"', "'");

  $('.title').html(
    `<dl>` +
        `<dt>제목</dt>` +
        `<dd><input type="text" id="PostTitle" placeholder="제목 입력" value="${PostTitleEdit}"></dd>` +
    `</dl>`
  );
  $('.cont').html(
    `<textarea id="PostContent" placeholder="내용 입력">` +
        `${PostContentEdit}` +
    `</textarea>`
  );

}

// 게시글 수정
function UpdatePost() {
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  var PostTitleUpdate = document.getElementById('PostTitle').value;
  var PostTitleUpdateEdit = PostTitleUpdate.replaceAll("'", '"');
  var PostContentUpdate = document.getElementById('PostContent').value;
  var PostContentUpdateEdit = PostContentUpdate.replaceAll("'", '"');

  UpdatePostCall(NickName, PostTitleUpdateEdit, PostContentUpdateEdit, PostCreatDatetime);

  deleteCookie('PostNum');

  setCookie('PostNum', PostNum, 1);

  alert("수정 되었습니다.");

  location.replace("/view");
  
}

// 게시글 삭제
function DeletePost() {
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];

  DeletePostCall(NickName, PostCreatDatetime);

  deleteCookie('PostNum');

  alert("삭제 되었습니다.");

  location.replace("/");
  
}

// Comment #############################################################################################################################################

// 댓글 등록
function Commentwritebt() {
  if (getCookie('UserID') !== null) {
    $('.comment_input').html(
      `<textarea id="CommentContent" placeholder="댓글을 입력하세요."></textarea>` +
      `<div class="comment_input_bt">` +
          `<a onclick="CreatComment()" class="on">등록</a>` +
      `</div>`
      )
  } else {
    $('.comment_input').html(``)
  }
}

// 댓글 작성
function CreatComment() {
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  var CommentContent = document.getElementById('CommentContent').value;

  CreatCommentCall(NickName, PostCreatDatetime, CommentContent);

  window.location.reload();

}

// 댓글 조회
function ReadComment() {
  let ContHtml = "";
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  let CommenttotalData; //총 데이터

  CommenttotalData = AllCommentCall(NickName, PostCreatDatetime);

  var CommentNickName = CommenttotalData[1];
  var CommentContent = CommenttotalData[2];
  var CommentCreatDatetime = CommenttotalData[3];

  for (
    var i = 0;
    i < Number(CommenttotalData[0]);
    i++
  ) { 
    if (getCookie('UserID') !== null) {
      var UserID = getCookie('UserID');
      var NowUser = NickNameCall(UserID);
      if (CommentNickName[i] === NowUser) {
        var updateComment = getCookie('updateComment');
        if (updateComment === '0'+`${i}`) {
          ContHtml += 
            `<div class="comment">` +
              `<textarea id="updateCommentContent" placeholder="댓글을 입력하세요.">${CommentContent[i]}</textarea>` +
              `<div class="comment_bt">` +
                  `<a onclick="updateCommentoutbt('${NickName}', '${PostCreatDatetime}', '${CommentNickName[i]}', '${CommentCreatDatetime[i]}')" class="on">등록</a>` +
                  `<a onclick="DeleteCommentCall('${NickName}', '${PostCreatDatetime}', '${CommentNickName[i]}', '${CommentCreatDatetime[i]}')">삭제</a>` +
              `</div>` +
              `<div class="reply_input_${i} reply_input">` +
              `</div>` +
              `<div class="reply_box_${i}">` +
              `</div>` +
            `</div>`
        } else {
          ContHtml += 
            `<div class="comment">` +
              `<div class="CommentNickName">` +
                  `${CommentNickName[i]}` +
              `</div>` +
              `<div class="CommentContent">` +
                  `${CommentContent[i]}` +
              `</div>` +
              `<div class="CommentCreatDatetime">` +
                  `${CommentCreatDatetime[i]}` +
              `</div>` +
              `<div class="comment_bt">` +
                  `<a onclick="ReplyOn('${i}')" class="on">답글</a>` +
                  `<a onclick="updateCommentinbt('${i}')">수정</a>` +
                  `<a onclick="DeleteCommentCall('${NickName}', '${PostCreatDatetime}', '${CommentNickName[i]}', '${CommentCreatDatetime[i]}')">삭제</a>` +
              `</div>` +
              `<div class="reply_input_${i} reply_input">` +
              `</div>` +
              `<div class="reply_box_${i}">` +
              `</div>` +
            `</div>`
        }
      } else {
        ContHtml += 
          `<div class="comment">` +
            `<div class="CommentNickName">` +
                `${CommentNickName[i]}` +
            `</div>` +
            `<div class="CommentContent">` +
                `${CommentContent[i]}` +
            `</div>` +
            `<div class="CommentCreatDatetime">` +
                `${CommentCreatDatetime[i]}` +
            `</div>` +
            `<div class="comment_bt">` +
                `<a onclick="ReplyOn('${i}')" class="on">답글</a>` +
            `</div>` +
            `<div class="reply_input_${i} reply_input">` +
            `</div>` +
            `<div class="reply_box_${i}">` +
            `</div>` +
          `</div>`
      }
    } else {
      ContHtml += 
        `<div class="comment">` +
          `<div class="CommentNickName">` +
              `${CommentNickName[i]}` +
          `</div>` +
          `<div class="CommentContent">` +
              `${CommentContent[i]}` +
          `</div>` +
          `<div class="CommentCreatDatetime">` +
              `${CommentCreatDatetime[i]}` +
          `</div>` +
          `<div class="comment_bt">` +
              `<a onclick="ReplyOn(${i})" class="on">답글</a>` +
          `</div>` +
          `<div class="reply_input_${i} reply_input">` +
          `</div>` +
          `<div class="reply_box_${i}">` +
          `</div>` +
        `</div>`
    }
  }

  $(".comment_box").html(ContHtml);
}

// 수정 버튼
function updateCommentinbt(i) {
  deleteCookie('updateComment');
  setCookie('updateComment', '0' + `${i}`, 1);
}

function updateCommentoutbt(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime) {
  var updateCommentContent = document.getElementById('updateCommentContent').value;

  UpdateCommentCall(NickName, PostCreatDatetime, CommentNickName, updateCommentContent, CommentCreatDatetime);

  deleteCookie('updateComment');
  setCookie('updateComment', 1, 1);
}

// Reply #############################################################################################################################################

// 답글 등록
function ReplyOn(CommentNum, updateReply){
  var NumCommentNum = Number(CommentNum);
  if (getCookie('UserID') !== null) {
    $(`.reply_input_${NumCommentNum}`).html(
      `<textarea id="ReplyContent_${NumCommentNum}" placeholder="답글을 입력하세요."></textarea>` +
      `<div class="reply_input_bt">` +
          `<a onclick="CreatReply(${NumCommentNum})" class="on">등록</a>` +
      `</div>`
      )
  } else {
    $(`.reply_input_${NumCommentNum}`).html(``)
  }
  ReadReply(NumCommentNum, updateReply);
}

function ReplyOff(CommentNum) {
  var NumCommentNum = Number(CommentNum);
    $(`.reply_input_${NumCommentNum}`).html(``)
    $(`.reply_box_${NumCommentNum}`).html('');
}

// 답글 작성
function CreatReply(CommentNum) {
  var NumCommentNum = Number(CommentNum);
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  let CommenttotalData; //총 데이터

  CommenttotalData = AllCommentCall(NickName, PostCreatDatetime);

  var CommentNickName = CommenttotalData[1][NumCommentNum];
  var CommentCreatDatetime = CommenttotalData[3][NumCommentNum];
  var ReplyContent = document.getElementById(`ReplyContent_${NumCommentNum}`).value;

  CreatReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyContent);

  ReplyOn(NumCommentNum, 1);

}

// 답글 조회
function ReadReply(CommentNum, updateReply) {
  let ContHtml = "";
  let BottomHtml = "";
  let TotalHtml = "";
  let totalData; //총 데이터

  totalData = AllPostCall();

  var PostNum = getCookie('PostNum');
  var NickName = totalData[2][PostNum];
  var PostCreatDatetime = totalData[3][PostNum];
  let CommenttotalData; //총 데이터

  CommenttotalData = AllCommentCall(NickName, PostCreatDatetime);
  var NumCommentNum = Number(CommentNum);
  var CommentNickName = CommenttotalData[1][NumCommentNum];
  var CommentCreatDatetime = CommenttotalData[3][NumCommentNum];
  let ReplytotalData; //총 데이터

  ReplytotalData = AllReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime);

  var ReplyNickName = ReplytotalData[1];
  var ReplyContent = ReplytotalData[2];
  var ReplyCreatDatetime = ReplytotalData[3];

  for (
    var i = 0;
    i < Number(ReplytotalData[0]);
    i++
  ) { 
    if (getCookie('UserID') !== null) {
      var UserID = getCookie('UserID');
      var NowUser = NickNameCall(UserID);
      if (ReplyNickName[i] === NowUser) {
        if (updateReply === '0'+`${i}`) {
          ContHtml += 
            `<div class="reply">` +
              `<textarea id="updateReplyContent" placeholder="답글을 입력하세요.">${ReplyContent[i]}</textarea>` +
              `<div class="reply_bt">` +
                  `<a onclick="updateReplyoutbt('${NickName}', '${PostCreatDatetime}', '${CommentNickName}', '${CommentCreatDatetime}', '${ReplyNickName[i]}', '${ReplyCreatDatetime[i]}', ${i})" class="on">등록</a>` +
                  `<a onclick="DeleteReply('${NickName}', '${PostCreatDatetime}', '${CommentNickName}', '${CommentCreatDatetime}', '${ReplyNickName[i]}', '${ReplyCreatDatetime[i]}', ${i})">삭제</a>` +
              `</div>` +
            `</div>`
        } else {
          ContHtml += 
            `<div class="reply">` +
              `<div class="ReplyNickName">` +
                  `${ReplyNickName[i]}` +
              `</div>` +
              `<div class="ReplyContent">` +
                  `${ReplyContent[i]}` +
              `</div>` +
              `<div class="ReplyCreatDatetime">` +
                  `${ReplyCreatDatetime[i]}` +
              `</div>` +
              `<div class="reply_bt">` +
                  `<a onclick="updateReplyinbt(${i})" class="on">수정</a>` +
                  `<a onclick="DeleteReply('${NickName}', '${PostCreatDatetime}', '${CommentNickName}', '${CommentCreatDatetime}', '${ReplyNickName[i]}', '${ReplyCreatDatetime[i]}', ${i})">삭제</a>` +
              `</div>` +
            `</div>`
        }
      } else {
        ContHtml += 
          `<div class="reply">` +
            `<div class="ReplyNickName">` +
                `${ReplyNickName[i]}` +
            `</div>` +
            `<div class="ReplyContent">` +
                `${ReplyContent[i]}` +
            `</div>` +
            `<div class="ReplyCreatDatetime">` +
                `${ReplyCreatDatetime[i]}` +
            `</div>` +
          `</div>`
      }
    } else {
      ContHtml += 
        `<div class="reply">` +
          `<div class="ReplyNickName">` +
              `${ReplyNickName[i]}` +
          `</div>` +
          `<div class="ReplyContent">` +
              `${ReplyContent[i]}` +
          `</div>` +
          `<div class="ReplyCreatDatetime">` +
              `${ReplyCreatDatetime[i]}` +
          `</div>` +
        `</div>`
    }
  }
  BottomHtml =
      '<div class="bottom">' +
          `<a onclick="ReplyOff(${NumCommentNum})">접기</a>` +
      '</div>';
  
  TotalHtml = ContHtml + BottomHtml;
  $(`.reply_box_${NumCommentNum}`).html(TotalHtml);
}

// 수정 버튼
function updateReplyinbt(CommentNum) {
  var NumCommentNum = Number(CommentNum);
  var updateReply = '0' + `${NumCommentNum}`;
  ReplyOn(NumCommentNum, updateReply);
}

function updateReplyoutbt(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, ReplyCreatDatetime, CommentNum) {
  var NumCommentNum = Number(CommentNum);
  var updateReplyContent = document.getElementById('updateReplyContent').value;

  UpdateReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, updateReplyContent, ReplyCreatDatetime);

  var updateReply = 1;
  ReplyOn(NumCommentNum, updateReply);
}

// 답글 삭제
function DeleteReply(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, ReplyCreatDatetime, CommentNum){
  var NumCommentNum = Number(CommentNum);

  DeleteReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, ReplyCreatDatetime, NumCommentNum);
  ReplyOn(NumCommentNum, 1);
  
}