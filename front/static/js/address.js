// IP, PORT Address
const ip = "125.191.175.102";
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

// 전체 게시글 조회
const AllPostAddress = '/GetAllPost';

// 닉네임 조회
const NickNameAddress = '/GetNickName';

// 게시글 저장
const CreatPostAddress = '/GetCreatPost';

// 게시글 조회
const ReadPostAddress = '/GetReadPost';

// 게시글 수정 
const UpdatePostAddress = '/GetUpdatePost';

// 게시글 삭제 
const DeletePostAddress = '/GetDeletePost';

// Comment #############################################################################################################################################

// 전체 댓글 조회
const AllCommentAddress = '/GetAllComment';

// 댓글 저장
const CreatCommentAddress = '/GetCreatComment';

// 댓글 수정 
const UpdateCommentAddress = '/GetUpdateComment';

// 댓글 삭제 
const DeleteCommentAddress = '/GetDeleteComment';

// Reply #############################################################################################################################################

// 전체 답글 조회
const AllReplyAddress = '/GetAllReply';

// 답글 저장
const CreatReplyAddress = '/GetCreatReply';

// 답글 수정 
const UpdateReplyAddress = '/GetUpdateReply';

// 답글 삭제 
const DeleteReplyAddress = '/GetDeleteReply';