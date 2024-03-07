import api from "./api";

// 로그인
export const login = async (username, password) => {
    const response = await api.get(`/login?username=${username}&password=${password}`);
    return response;
}

// 사용자 정보
export const info = async () => {
    const response = await api.get(`/api/users/info`);
    return response;
}

// 회원가입
export const join = async (data) => {
    const response = await api.post(`/api/users`, data);
    return response;
}

// 회원 정보 수정
export const update = async (data) => {
    const response = await api.put(`/api/users`, data);
    return response;
}

// 회원 탈퇴
export const remove = async (userId) => {
    const response = await api.delete(`/api/users/${userId}`);
    return response;
}

// 게시물 요청 (검색 x)
export const getBoard = async (page) => {
    const response = await api.get(`/api/board/get?page=${page}`);
    return response;
}

// 게시물 요청 (검색 o)
export const getBoardSearch = async (page, data) => {
    const response = await api.get(`/api/board/getSearch?page=${page}&title=${data.title}&name=${data.name}&loc1=${data.loc1}&loc2=${data.loc2}`);
    return response;
}

// 게시물 등록
export const boardWrite = async (data) => {
    const response = await api.post(`/api/board/write`, data);
    return response;
}

// 게시물 사진 등록
export const boardImgWrite = async (data) => {
    const response = await api.post(`/api/board/imgWrite`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return response;
}

// 게시글 자세히 보기
export const boardInfo = async (boardNo) => {
    const response = await api.get(`/api/board/getInfo?boardNo=${boardNo}`);
    return response;
}

// 게시글 이미지 요청
export const boardImages = async (boardNo) => {
    const response = await api.get(`/api/board/getImages?boardNo=${boardNo}`);
    return response;
}

// 게시글 좋아요 클릭
export const boardLike = async (boardNo, userNo) => {
    const response = await api.get(`/api/board/like?boardNo=${boardNo}&userNo=${userNo}`);
    return response;
}

// 좋아요 누른 게시글
export const userLikeBoards = async (userId) => {
    const response = await api.get(`/api/board/likeBoard/${userId}`);
    return response;
}

// 게시물 수정 요청
export const boardModify = async (data) => {
    const response = await api.post(`/api/board/modify`, data);
    return response;
}

// 게시물 삭제 요청
export const boardDelete = async (boardNo) => {
    const response = await api.delete(`/api/board/${boardNo}`);
    return response;
}

// 홈 전국 맛집추천 게시글 TOP5 요청
export const homeBoardAllLoc = async () => {
    const response = await api.get(`/api/home/all`);
    return response;
}