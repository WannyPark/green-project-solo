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