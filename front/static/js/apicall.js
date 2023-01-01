
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
  let today_edit = `${year}-${month}-${date} ${hour}:${minutes}:${Seconds}`

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

// 아이디 비밀번호 확인
function LoginCheckCall(UserID, UserPassword){
  var LoginCheckDone;
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${LoginCheckAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "UserID":  UserID },
    async: false,
  }).done((data) => {

    if ( data.length === 0 ) {
      LoginCheckDone = 0;
    } else {
      
      // 데이터 정리
      const convertData = {};
      data.forEach(function(key){
        convertData.UserID = key.UserID;
        convertData.UserPassword = key.UserPassword;
      })
      if (convertData.UserPassword !== UserPassword) {
        LoginCheckDone = 1;
      } else {
        LoginCheckDone = 2;
      }
      console.log(LoginCheckDone)
    }
    
  }).fail((err) => {
    console.log(err)
  })
  console.log(LoginCheckDone)
  return LoginCheckDone;
}

// Post #############################################################################################################################################

// 전체 게시글 조회
function AllPostCall() {
  let totalData = [];

  $.ajax({
    url: `http://${ip}:${port}${AllPostAddress}`,
    method: "GET",
    dataType: "json",
    async: false,
    }).done((data) => {

      // 데이터 정리
      const PostTitleData = [];
      const NickNameData = [];
      const PostCreatDatetimeData = [];
      data.forEach(function(key){
        PostTitleData.push(key.PostTitle);
        NickNameData.push(key.NickName);
        PostCreatDatetimeData.push(key.PostCreatDatetime);
      });

      totalData.push(data.length);
      totalData.push(PostTitleData);
      totalData.push(NickNameData);
      totalData.push(PostCreatDatetimeData);
      
    }).fail((err) => {
      console.log(err)
    })
    
    return totalData;
}

// 닉네임 조회

function NickNameCall(UserID){
  var NickName;
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${NickNameAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { "UserID":  UserID },
    async: false,
  }).done((data) => {
    NickName = data[0].NickName
  }).fail((err) => {
    console.log(err)
  })

  return NickName;
}

// 게시글 등록
function CreatPostCall(PostTitle, PostContent){
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
  let today_edit = `${year}-${month}-${date} ${hour}:${minutes}:${Seconds}`

  let UserID = getCookie('UserID');
  let NickName = NickNameCall(UserID);
  console.log(NickName)
  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${CreatPostAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "UserID":  UserID,
      "PostTitle":  PostTitle,
      "PostContent":  PostContent,
      "PostCreatDatetime":  today_edit
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

  deleteCookie('PostNum');

  setCookie('PostNum', 0, 1);

}

// 게시글 조회
function ReadPostCall(NickName, PostCreatDatetime){
  let PostContent;

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${ReadPostAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
    },
    async: false,
  }).done((data) => {
    PostContent = data[0].PostContent;
  }).fail((err) => {
    console.log(err)
  })

  return PostContent;

}

// 게시글 수정
function UpdatePostCall(NickName, PostTitleUpdate, PostContentUpdate, PostCreatDatetime){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${UpdatePostAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostTitle":  PostTitleUpdate,
      "PostContent":  PostContentUpdate,
      "PostCreatDatetime":  PostCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// 게시글 삭제
function DeletePostCall(NickName, PostCreatDatetime){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${DeletePostAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// Comment #############################################################################################################################################

// 전체 댓글 조회
function AllCommentCall(NickName, PostCreatDatetime) {
  let totalData = [];

  $.ajax({
    url: `http://${ip}:${port}${AllCommentAddress}`,
    method: "GET",
    dataType: "json",
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime
    },
    async: false,
    }).done((data) => {

      // 데이터 정리
      const CommentNickNameData = [];
      const CommentContentData = [];
      const CommentCreatDatetimeData = [];
      data.forEach(function(key){
        CommentNickNameData.push(key.CommentNickName);
        CommentContentData.push(key.CommentContent);
        CommentCreatDatetimeData.push(key.CommentCreatDatetime);
      });

      totalData.push(data.length);
      totalData.push(CommentNickNameData);
      totalData.push(CommentContentData);
      totalData.push(CommentCreatDatetimeData);
      
    }).fail((err) => {
      console.log(err)
    })
    
    return totalData;
}

// 댓글 등록
function CreatCommentCall(NickName, PostCreatDatetime, CommentContent){
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
  let today_edit = `${year}-${month}-${date} ${hour}:${minutes}:${Seconds}`

  let UserID = getCookie('UserID');
  let CommentNickName = NickNameCall(UserID);

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${CreatCommentAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentContent":  CommentContent,
      "CommentCreatDatetime":  today_edit
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// 댓글 수정
function UpdateCommentCall(NickName, PostCreatDatetime, CommentNickName, CommentContent, CommentCreatDatetime){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${UpdateCommentAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentContent":  CommentContent,
      "CommentCreatDatetime":  CommentCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// 댓글 삭제
function DeleteCommentCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${DeleteCommentAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentCreatDatetime":  CommentCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

  window.location.reload();
}

// Reply #############################################################################################################################################

// 전체 답글 조회
function AllReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime) {
  let totalData = [];

  $.ajax({
    url: `http://${ip}:${port}${AllReplyAddress}`,
    method: "GET",
    dataType: "json",
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentCreatDatetime":  CommentCreatDatetime
    },
    async: false,
    }).done((data) => {

      // 데이터 정리
      const ReplyNickNameData = [];
      const ReplyContentData = [];
      const ReplyCreatDatetimeData = [];
      data.forEach(function(key){
        ReplyNickNameData.push(key.ReplyNickName);
        ReplyContentData.push(key.ReplyContent);
        ReplyCreatDatetimeData.push(key.ReplyCreatDatetime);
      });

      totalData.push(data.length);
      totalData.push(ReplyNickNameData);
      totalData.push(ReplyContentData);
      totalData.push(ReplyCreatDatetimeData);
      
    }).fail((err) => {
      console.log(err)
    })
    
    return totalData;
}

// 답글 등록
function CreatReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyContent){
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
  let today_edit = `${year}-${month}-${date} ${hour}:${minutes}:${Seconds}`

  let UserID = getCookie('UserID');
  let ReplyNickName = NickNameCall(UserID);

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${CreatReplyAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentCreatDatetime":  CommentCreatDatetime,
      "ReplyNickName":  ReplyNickName,
      "ReplyContent":  ReplyContent,
      "ReplyCreatDatetime":  today_edit
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// 답글 수정
function UpdateReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, ReplyContent, ReplyCreatDatetime){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${UpdateReplyAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentCreatDatetime":  CommentCreatDatetime,
      "ReplyNickName":  ReplyNickName,
      "ReplyContent":  ReplyContent,
      "ReplyCreatDatetime":  ReplyCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

}

// 답글 삭제
function DeleteReplyCall(NickName, PostCreatDatetime, CommentNickName, CommentCreatDatetime, ReplyNickName, ReplyCreatDatetime, CommentNum){

  // api 호출
  $.ajax({
    url: `http://${ip}:${port}${DeleteReplyAddress}`,
    method: 'GET',
    dataType: 'json',
    data: { 
      "NickName":  NickName,
      "PostCreatDatetime":  PostCreatDatetime,
      "CommentNickName":  CommentNickName,
      "CommentCreatDatetime":  CommentCreatDatetime,
      "ReplyNickName":  ReplyNickName,
      "ReplyCreatDatetime":  ReplyCreatDatetime
    },
    async: false,
  }).done((data) => {
    console.log(data)
  }).fail((err) => {
    console.log(err)
  })

  ReplyOn(CommentNum);
  
}