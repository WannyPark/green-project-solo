import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import * as auth from "../../apis/auth";
import $ from "jquery";
import "./UserForm.css";
import { useNavigate } from "react-router-dom";
import * as Swal from "../../apis/alert";

const UserForm = () => {

    const [ userInfo, setUserInfo ] = useState({});
    const { isLogin, roles, loginCheck, logout } = useContext(LoginContext);
    const navigate = useNavigate();

    // 회원 정보 조회
    const getUserInfo = async () => {
        // 비로그인 또는 USER 권한이 없는 경우 로그인 페이지로 이동
        if (!isLogin || !roles.isUser) {
            navigate("/loginPage");
            return ;
        }
        try {
            const response = await auth.info();
            const data = response.data;
            console.log(`getUserInfo`);
            console.log(data);
            setUserInfo();
            $("#username").val(data.userId);
            $("#name").val(data.name);
            $("#email").val(data.email);
        } catch (error) {
            console.error(`${error}`);
            console.error(`회원정보를 가져오는 중 에러가 발생했습니다.`);
        }
    }

    // 회원 정보 수정
    const updateUser = async (datas) => {
        try {
            const response = await auth.update(datas);
            const data = response.data;
            const status = response.status;
            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            if (status == 200) {
                console.log("회원정보 수정 성공 !");
                Swal.alert("회원수정 성공", "로그아웃 후, 다시 로그인 해주세요.", "success", () => {logout(true)});
                // alert("회원정보 수정 성공 !");
                // logout();
            } else {
                console.log("회원정보 수정 실패 !");
                Swal.alert("회원수정 실패", "회원수정에 실패하였습니다.", "error");
                // alert("회원정보 수정 실패 !");
            }
        } catch (error) {
            console.error(`${error}`);
            console.error(`회원정보 수정 중 에러가 발생했습니다.`);
        }
    }

    // 회원 탈퇴
    const deleteUser = async (userId) => {
        console.log(userId);

        try {
            const response = await auth.remove(userId);
            const data = response.data;
            const status = response.status;
            console.log(`data : ${data}`);
            console.log(`status : ${status}`);
            if (status == 200) {
                console.log("회원탈퇴 성공 !");
                Swal.alert("회원탈퇴 성공", "그동안 감사했습니다 :)", "success", () => {logout(true)});
                // alert("회원탈퇴 성공 !");
                // logout();
            } else {
                console.log("회원탈퇴 실패 !");
                Swal.alert("회원탈퇴 실패", "회원탈퇴에 실패하였습니다.", "error");
                // alert("회원탈퇴 실패 !");
            }
        } catch (error) {
            console.error(`${error}`);
            console.error(`회원탈퇴 수정 중 에러가 발생했습니다.`);
        }
    }

    const onUpdate = (e) => {
        e.preventDefault();
        
        const form = e.target;
        const userId = form.username.value;
        const userPw = form.password.value;
        const name = form.name.value;
        const email = form.email.value;

        console.log(`userId : ${userId}`);
        console.log(`userPw : ${userPw}`);
        console.log(`name : ${name}`);
        console.log(`email : ${email}`);
        const data = {
            "userId" : userId,
            "userPw" : userPw,
            "name" : name,
            "email" : email,
        }
        updateUser(data);
    }

    useEffect(() => {
        if ( !isLogin ) {
            return ;
        }
        getUserInfo();
    }, [ isLogin ])

    return (
        <div className="form">
            <h2 className="login-title">Join</h2>
            <form className="login-form" onSubmit={(e) => onUpdate(e)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" 
                           id="username"
                           placeholder="username"
                           name="username"
                           autoComplete="username"
                           required
                           readOnly
                        //    defaultValue={userInfo.userId}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" 
                                id="password"
                                placeholder="password"
                                name="password"
                                autoComplete="password"
                                required
                    />
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" 
                           id="name"
                           placeholder="name"
                           name="name"
                           autoComplete="name"
                           required
                        //    defaultValue={userInfo.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" 
                           id="email"
                           placeholder="email"
                           name="email"
                           autoComplete="email"
                           required
                        //    defaultValue={userInfo.email}
                    />
                </div>
                <button type="submit" className="btn btn--form btn-login">
                    Update
                </button>
                <button type="button" onClick={() => deleteUser($("#username").val())} className="btn btn--form btn-login">
                    remove
                </button>
            </form>
        </div>
    )

}

export default UserForm;