import React, { createContext, useEffect, useState } from "react";
import api from "../apis/api";
import Cookies from "js-cookie";
import * as auth from "../apis/auth";
import { useNavigate } from "react-router-dom";
import * as Swal from "../apis/alert";

export const LoginContext = createContext();
LoginContext.displayName = "LoginContextName";

// 로그인
// 로그인 체크
// 로그인
// 로그아웃
// 로그인 세팅
// 로그아웃 세팅
const LoginContextProvider = ({ children }) => {
    // ------------------ {State} ------------------
    // 상태
    // - 로그인 여부
    // - 유저 정보
    // - 권한 정보
    // - 아이디 저장
    // context value : 로그인 여부, 로그아웃 함수
    // 로그인 여부
    const [isLogin, setLogin] = useState(false);
    // 유저 정보
    const [userInfo, setUserInfo] = useState({});
    // 권한 정보
    const [roles, setRoles] = useState({isUser : false, isAdmin : false});
    // 아이디 저장
    const [rememeberUserId, setRememberUserId] = useState();
    // ------------------ {State} ------------------

    // 페이지 이동
    const navigate = useNavigate();

    // 로그인 체크
    const loginCheck = async () => {

        // Cookie 에서 토큰 가져오기
        const accessToken = Cookies.get("accessToken");
        console.log(`accesssToken : ${accessToken}`);

        let response;
        let data;

        // accessToken (jwt) 이 없는 경우
        if (!accessToken) {
            console.log(`쿠키에 accessToken(jwt) 이 없음`);
            // 로그아웃 세팅
            logoutSetting();
            return;
        }
        // header 에 jwt 담기
        // accessToken (jwt) 이 있는 경우
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        try {
            // 사용자 정보 요청
            response = await auth.info();
        } catch (error) {
            console.log(`error : ${error}`);
            console.log(`status : ${response.status}`);
            return ;
        }

        data = response.data;
        console.log(`data : ${data}`);

        // 인증 실패
        if (data == "UNAUTHORIZED" || response.status == 401) {
            console.log(`accessToken (jwt) 이 만료되었거나 인증에 실패하였습니다.`);
            return ;
        }
        // 인증 성공
        console.log(`accessToken (jwt) 토큰으로 사용자 인증정보 요청 성공 !`);
        // 로그인 세팅
        loginSetting(data, accessToken);

    }

    // 로그인
    const login = async (username, password) => {

        console.log(`username : ${username}`);
        console.log(`password : ${password}`);

        try {
            const response = await auth.login(username, password);
            console.log(response);
            const data = response.data;
            const status = response.status;
            const headers = response.headers;
            const authorization = headers.authorization;
            const accessToken = authorization.replace("Bearer ", ""); // JWT

            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            console.log(`header : ${headers}`);
            console.log(`authorization : ${authorization}`);
            console.log(`accessToken : ${accessToken}`);

            // 로그인 성공
            if (status == 200) {
                // 쿠키에 accessToken(jwt) 저장
                Cookies.set("accessToken", accessToken);
                
                // 로그인 체크 (/users/{userId} <--- userData)
                loginCheck();

                // alert(`로그인 성공`);
                Swal.alert(`로그인 성공`, `메인 화면으로 갑니다.`, `success`, () => {navigate("/")});

                // 메인 페이지로 이동
                // navigate("/");
            }
        } catch (error) {
            // 로그인 실패
            // - 아이디 또는 비밀번호가 일치하지 않습니다.
            // alert("로그인 실패 !");
            Swal.alert(`로그인 실패`, `아이디 또는 비밀번호가 일치하지 않습니다.`, `error`);
        }

    }

    // 로그인 세팅
    // userData, accessToken
    const loginSetting = (userData, accessToken) => {
        const {no, userId, authList} = userData;
        const roleList = authList.map((auth) => auth.auth);

        console.log(`no : ${no}`);
        console.log(`userId : ${userId}`);
        console.log(`accessTokeno : ${accessToken}`);
        console.log(`roleList : ${roleList}`);

        // axios 객체의 header(Authorization : `Bearer ${accessToken}`)
        api.defaults.headers.common.Authorization = `Bearer ${accessToken}`

        // 로그인 여부 true
        setLogin(true);

        // 유저 정보 세팅
        const updateUserInfo = {no, userId, roleList};
        setUserInfo(updateUserInfo);

        // 권한 정보 세팅
        const updatedRoles = {isUser : false, isAdmin : false};

        roleList.forEach((role) => {
            if (role == "ROLE_USER") updatedRoles.isUser = true;
            if (role == "ROLE_ADMIN") updatedRoles.isAdmin = true;
        })
        setRoles(updatedRoles);
        localStorage.setItem("userInfo", JSON.stringify(updateUserInfo));
        localStorage.setItem("isLogin", true);
    }

    // 로그아웃
    const logout = (force=false) => {
        if (force) {
            logoutSetting();
            localStorage.clear();
            navigate("/");
            return ;
        }

        Swal.confirm(`로그아웃 하시겠습니까?`, `로그아웃을 진행합니다.`, `warning`, (result) => {
            if (result.isConfirmed) {
                // 로그아웃 세팅
                logoutSetting();
                localStorage.clear();
                // 메인 페이지 이동
                navigate("/");
            }
        })
    }

    // 로그아웃 세팅
    const logoutSetting = () => {
        // axios 헤더 초기화
        api.defaults.headers.common.Authorization = undefined;

        // 쿠키 초기화
        Cookies.remove("accessToken");

        // 로그인 여부 : false
        setLogin(false);

        // 유저 정보 초기화
        setUserInfo(null);
        
        // 권환 정보 초기화
        setRoles(null);
    }

    useEffect (() => {
        // 로그인 체크
        loginCheck();
    }, [])

    return (
            <LoginContext.Provider value={{isLogin, userInfo, roles, login, loginCheck, logout}}>
                {children}
            </LoginContext.Provider>
    )
}

export default LoginContextProvider;