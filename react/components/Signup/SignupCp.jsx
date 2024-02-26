import { useNavigate } from "react-router-dom";
import * as auth from "../../apis/auth";
import * as Swal from "../../apis/alert";
import Cookie from "js-cookie";
import $ from "jquery";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "./SignupCp.css";

const SignupCp = () => {
    
    const navigate = useNavigate();

    const {login} = useContext(LoginContext);

    const [checkId, setCheckId] = useState(false);
    const [checkPw, setCheckPw] = useState(false);
    const [checkEqPw, setCheckEqPw] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const reqSignup = async () => {
        const id = $("#signup_id").val();
        const pw = $("#signup_pw").val();
        const name = $("#signup_name").val();
        const email = $("#signup_email").val();

        console.log(`id: ${id}`);
        console.log(`pw: ${pw}`);
        console.log(`name: ${name}`);
        console.log(`email: ${email}`);
        const response = await auth.join({
            "userId" : id,
            "userPw" : pw,
            "name" : name,
            "email" : email,
        });
        const headers = response.headers;
        const status = response.status;
        if (status == 200) {
            Swal.alert("회원가입 성공!", "로그인 페이지로 이동합니다.", "success", () => {navigate("/loginPage")});
        } else {
            Swal.alert("회원가입 실패!", "다시시도 해주세요.", "error");
        }
    }

    const check_id = () => { // 아이디 유효성 검사
        const check = /^[A-Za-z0-9_\-]{5,20}$/; // 영어 대/소문자 숫자만 허용
        if (!check.test($("#signup_id").val())) {
            $("#signup_id").css("outline", "3px solid red");
            setCheckId(true);
        } else {
            $("#signup_id").css("outline", "3px solid green");
            setCheckId(false);
        }
    }
    const check_pw = () => { // 비밀번호 유효성 검사
        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/; // 영어 대/소문자 숫자, 특수문자 한가지 이상 포함 검사
        if (!check.test($("#signup_pw").val())) {
            $("#signup_pw").css("outline", "3px solid red");
            setCheckPw(true);
        } else {
            $("#signup_pw").css("outline", "3px solid green");
            setCheckPw(false);
        }
    }
    const check_eq_pw = () => { // 비밀번호 동일한지 검사
        if (!setCheckPw || $("#signup_pw_check").val() != $("#signup_pw").val()) {
            $("#signup_pw_check").css("outline", "3px solid red");
            setCheckEqPw(true);
        } else {
            $("#signup_pw_check").css("outline", "3px solid green");
            setCheckEqPw(false);
        }
    }
    const check_name = () => { // 닉네임 정규식
        const check = /^[가-힣A-Za-z]{2,10}$/;
        if (!check.test($("#signup_name").val())) {
            $("#signup_name").css("outline", "3px solid red");
            setCheckName(true);
        } else {
            $("#signup_name").css("outline", "3px solid green");
            setCheckName(false);
        }
    }
    const check_email = () => { // 이메일 정규식
        const check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (!check.test($("#signup_email").val())) {
            $("#signup_email").css("outline", "3px solid red");
            setCheckEmail(true);
        } else {
            $("#signup_email").css("outline", "3px solid green");
            setCheckEmail(false);
        }
    }

    useEffect(() => {
        const cookie = Cookie.get("accessToken");
        if (cookie != null) {
            navigate("/");
            return ;
        }
        $(".signup_form").css("display", "flex").hide().fadeIn(500);
    }, [])

    return (
        <>
            <div className="signup_form">
                <div className="signup_title">
                    <h2>Sign up</h2>
                </div>
                <div className="signup_id_area">
                    <input type="text" id="signup_id" name="signup_id" placeholder="ID" onChange={check_id} />
                    {checkId && <small>아이디는 영어 대/소문자 + 숫자로만 구성해주세요.</small>}
                </div>
                <div className="signup_pw_area">
                    <input type="password" id="signup_pw" name="signup_pw" placeholder="Password" onChange={check_pw} />
                    {checkPw && <small>비밀번호는 영어 대문자 + 소문자 + 숫자 + 특수문자로 구성해주세요.</small>}
                </div>
                <div className="signup_pw_area">
                    <input type="password" id="signup_pw_check" name="signup_pw_check" placeholder="Check Password" onChange={check_eq_pw} />
                    {checkEqPw && <small>비밀번호가 일치하지 않습니다.</small>}
                </div>
                <div className="signup_name_area">
                    <input type="text" id="signup_name" name="signup_name" placeholder="Name" onChange={check_name} />
                    {checkName && <small>닉네임은 한글, 영어 대/소문자로만 구성이 가능합니다.</small>}
                </div>
                <div className="signup_email_area">
                    <input type="text" id="signup_email" name="signup_email" placeholder="Email" onChange={check_email} />
                    {checkEmail && <small>올바른 형식으로 작성해주세요.</small>}
                </div>
                <div className="signup_button_area">
                    <input type="button" className="signup_button" value="회원가입" onClick={() => reqSignup()} />
                </div>
            </div>
        </>
    )

}

export default SignupCp;