import Cookie from "js-cookie";
import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import * as auth from "../../apis/auth";
import * as Swal from "../../apis/alert";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "./MyInfoCp.css";

const MyInfoCp = () => {

    const {loginCheck, logout} = useContext(LoginContext);

    const [userNo, setUserNo] = useState("");
    const [checkOldPw, setCheckOldPw] = useState(false);
    const [checkNewPw, setCheckNewPw] = useState(false);
    const [checkEqPw, setCheckEqPw] = useState(false);

    const navigate = useNavigate();

    const changePw = async () => {
        const response = await auth.update({
            no: userNo,
            oldPw: $("#myInfo_oldPw").val(),
            newPw: $("#myInfo_newPw").val(),
            newPwCheck: $("#myInfo_newPw_check").val(),
        });
        const status = response.status;
        if (status == 200) {
            Swal.alert("비밀번호 변경 성공 !", "다시 로그인 해주세요 !", "success", () => {
                logout(true);
                navigate("/loginPage")
            });
        } else {
            Swal.alert("비밀번호 변경 실패 !", "제대로 된 암호를 설정 해주세요.", "error");
        }
    }

    const check_oldPw = () => { // 기존 비밀번호 유효성 검사
        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/; // 영어 대/소문자 숫자, 특수문자 한가지 이상 포함 검사
        if (!check.test($("#myInfo_oldPw").val())) {
            $("#myInfo_oldPw").css("outline", "3px solid red");
            setCheckOldPw(true);
        } else {
            $("#myInfo_oldPw").css("outline", "3px solid green");
            setCheckOldPw(false);
        }
    }
    const check_newPw = () => { // 새로운 비밀번호 유효성 검사
        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/; // 영어 대/소문자 숫자, 특수문자 한가지 이상 포함 검사
        if (!check.test($("#myInfo_newPw").val())) {
            $("#myInfo_newPw").css("outline", "3px solid red");
            setCheckNewPw(true);
        } else {
            $("#myInfo_newPw").css("outline", "3px solid green");
            setCheckNewPw(false);
        }
    }
    const check_eq_pw = () => { // 비밀번호 동일한지 검사
        if (!setCheckNewPw || $("#myInfo_newPw").val() != $("#myInfo_newPw_check").val()) {
            $("#myInfo_newPw_check").css("outline", "3px solid red");
            setCheckEqPw(true);
        } else {
            $("#myInfo_newPw_check").css("outline", "3px solid green");
            setCheckEqPw(false);
        }
    }

    useEffect(() => {
        const cookie = Cookie.get("accessToken");
        if (cookie == null) {
            navigate("/");
            return ;
        }
        $(".myInfo_form").css("display", "flex").hide().fadeIn(500);
        const getUserInfo = async () => {
            await loginCheck();
            const response = await auth.info();
            setUserNo(response.data.no);
            const userId = response.data.userId;
            const userName = response.data.name;
            const userEmail = response.data.email;
            $("#myInfo_id").val(userId);
            $("#myInfo_name").val(userName);
            $("#myInfo_email").val(userEmail);
        }
        getUserInfo();
    }, []);

    return (
        <>
            <div className="myInfo_form">
                <div className="myInfo_title">
                    <h2>My Infomation</h2>
                </div>
                <div className="myInfo_id_area">
                    <input type="text" id="myInfo_id" name="myInfo_id" readOnly />
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_oldPw" name="myInfo_pw" placeholder="Old Password" onChange={() => {check_oldPw()}} />
                    {checkOldPw && <small>비밀번호는 영어 대문자 + 소문자 + 숫자 + 특수문자로 구성 되어있습니다.</small>}
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_newPw" name="myInfo_pw" placeholder="New Password" onChange={() => {check_newPw()}} />
                    {checkNewPw && <small>비밀번호는 영어 대문자 + 소문자 + 숫자 + 특수문자로 구성 되야합니다.</small>}
                </div>
                <div className="myInfo_pw_area">
                    <input type="password" id="myInfo_newPw_check" name="myInfo_pw_check" placeholder="Check New Password" onChange={() => {check_eq_pw()}} />
                    {checkEqPw && <small>비밀번호가 일치하지 않습니다.</small>}
                </div>
                <div className="myInfo_name_area">
                    <input type="text" id="myInfo_name" name="myInfo_name" readOnly />
                </div>
                <div className="myInfo_email_area">
                    <input type="text" id="myInfo_email" name="myInfo_email" readOnly />
                </div>
                <div className="myInfo_button_area">
                    <input type="button" className="myInfo_button" value="변 경" onClick={() => {changePw()}} />
                </div>
            </div>
        </>
    )

}

export default MyInfoCp;