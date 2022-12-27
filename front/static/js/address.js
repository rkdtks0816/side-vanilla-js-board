// IP, PORT Address
const ip = "10.0.2.15";
const port = "8001";

// API Address

// SignUp #############################################################################################################################################

// 아이디 중복확인
const ReadIDAddress = '/GetReadID';

// 닉네임 중복확인
const ReadNickNameAddress = '/GetReadNickName';

// 아이디 정보 저장
const CreatIDAddress = '/GetCreatID';

// 아이디 정보 삭제 
const DeleteIDAddress = '/GetDeleteID';

// Login #############################################################################################################################################

// 아이디 정보 삭제 
const LoginCheckAddress = '/GetLoginCheck';

// Post #############################################################################################################################################

// 게시글 저장
const CreatPostAddress = '/GetCreatPost';

// 게시글 조회
const ReadPostAddress = '/GetReadPost';

// 게시글 수정 
const UpdatePostAddress = '/GetUpdatePost';

// 게시글 삭제 
const DeletePostAddress = '/GetDeletePost';