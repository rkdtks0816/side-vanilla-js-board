
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
    $('.login').append(`<a onclick="deleteCookie('UserID')" class="login_text">로그아웃</a>`)
  } else {
    $('.login').append(`<a href="/login" class="login_text">로그인</a>`)
  }
}

// Post #############################################################################################################################################

// 등록 버튼
function writebt() {
  if (getCookie('UserID') !== null) {
    $('.bt_wrap').append(`<a href="/write" class="on">등록</a>`)
  } else {
    $('.bt_wrap').append(``)
  }
}

// 페이징
function MainPaging () {
  let totalData; //총 데이터 수
  let dataPerPage = 10; //한 페이지에 나타낼 글 수
  let pageCount = 10; //페이징에 나타낼 페이지 수
  let globalCurrentPage = 1; //현재 페이지

  $.ajax({ // ajax로 데이터 가져오기
    method: "GET",
    url: "https://url/data?" + data,
    dataType: "json",
    success: function (d) {
      //totalData 구하기
      totalData = d.data.length;
    }
  });
  
  //글 목록 표시 호출 (테이블 생성)
  displayData(1, dataPerPage);
  
  //페이징 표시 호출
  paging(totalData, dataPerPage, pageCount, 1);
  
}

// 페이징
function paging(totalData, dataPerPage, pageCount, currentPage) {
  console.log("currentPage : " + currentPage);

  totalPage = Math.ceil(totalData / dataPerPage); //총 페이지 수
  
  if(totalPage<pageCount){
    pageCount=totalPage;
  }
  
  let pageGroup = Math.ceil(currentPage / pageCount); // 페이지 그룹
  let last = pageGroup * pageCount; //화면에 보여질 마지막 페이지 번호
  
  if (last > totalPage) {
    last = totalPage;
  }

  let first = last - (pageCount - 1); //화면에 보여질 첫번째 페이지 번호
  let next = last + 1;
  let prev = first - 1;

  let pageHtml = "";

  if (prev > 0) {
    pageHtml += "<li><a href='#' id='prev'> 이전 </a></li>";
  }

 //페이징 번호 표시 
  for (var i = first; i <= last; i++) {
    if (currentPage == i) {
      pageHtml +=
        "<li class='on'><a href='#' id='" + i + "'>" + i + "</a></li>";
    } else {
      pageHtml += "<li><a href='#' id='" + i + "'>" + i + "</a></li>";
    }
  }

  if (last < totalPage) {
    pageHtml += "<li><a href='#' id='next'> 다음 </a></li>";
  }

  $("#pagingul").html(pageHtml);
  let displayCount = "";
  displayCount = "현재 1 - " + totalPage + " 페이지 / " + totalData + "건";
  $("#displayCount").text(displayCount);


  //페이징 번호 클릭 이벤트 
  $("#pagingul li a").click(function () {
    let $id = $(this).attr("id");
    selectedPage = $(this).text();

    if ($id == "next") selectedPage = next;
    if ($id == "prev") selectedPage = prev;
    
    //전역변수에 선택한 페이지 번호를 담는다...
    globalCurrentPage = selectedPage;
    //페이징 표시 재호출
    paging(totalData, dataPerPage, pageCount, selectedPage);
    //글 목록 표시 재호출
    displayData(selectedPage, dataPerPage);
  });
}