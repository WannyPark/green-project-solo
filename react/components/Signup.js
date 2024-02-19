import React, { useEffect, useState  } from "react";
import Nav from "./Nav";
import DaumPostcode from "react-daum-postcode";
import $ from "jquery";
import axios from "axios";
import "../css/signup.css";

const Signup = () => {
    const [modalState, setModalState] = useState(false); // 다음 API
    const [checkId, setCheckId] = useState(false);
    const [checkPw, setCheckPw] = useState(false);
    const [checkEqPw, setCheckEqPw] = useState(false);
    const [checkName, setCheckName] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);

    const check_id = () => { // 아이디 유효성 검사
        const check = /^[A-Za-z0-9_\-]{5,20}$/; // 영어 대/소문자 숫자만 허용
        if (!check.test($("#signup_id").val())) {
            $("#signup_id").css("outline", "2px solid red");
            setCheckId(true);
        } else {
            $("#signup_id").css("outline", "2px solid green");
            setCheckId(false);
        }
    }
    const check_pw = () => { // 비밀번호 유효성 검사
        const check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/; // 영어 대/소문자 숫자, 특수문자 한가지 이상 포함 검사
        if (!check.test($("#signup_pw").val())) {
            $("#signup_pw").css("outline", "2px solid red");
            setCheckPw(true);
        } else {
            $("#signup_pw").css("outline", "2px solid green");
            setCheckPw(false);
        }
    }
    const check_eq_pw = () => { // 비밀번호 동일한지 검사
        if (!setCheckPw || $("#signup_check_pw").val() != $("#signup_pw").val()) {
            $("#signup_check_pw").css("outline", "2px solid red");
            setCheckEqPw(true);
        } else {
            $("#signup_check_pw").css("outline", "2px solid green");
            setCheckEqPw(false);
        }
    }
    const check_name = () => { // 닉네임 정규식
        const check = /^[가-힣A-Za-z]{2,10}$/;
        if (!check.test($("#signup_name").val())) {
            $("#signup_name").css("outline", "2px solid red");
            setCheckName(true);
        } else {
            $("#signup_name").css("outline", "2px solid green");
            setCheckName(false);
        }
    }
    const check_email = () => { // 이메일 정규식
        const check = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (!check.test($("#signup_email").val())) {
            $("#signup_email").css("outline", "2px solid red");
            setCheckEmail(true);
        } else {
            $("#signup_email").css("outline", "2px solid green");
            setCheckEmail(false);
        }
    }
    
    const handleAdressSearch = () => { // 다음 API on/off
        setModalState(true);
    };
    const postCodeStyle = { // 다음 API 창 스타일
        width: '400px',
        height: '400px',
        display: modalState ? 'block' : 'none',
    };
    const onCompletePost = (data) => { // 다음 API 주소 지정했을때 실행 함수
        setModalState(false); // 다음 API 창 off
        if (data) {
            $("#signup_addr1").val(data.address); // 선택한 주소 input 에 적용
        }
    };

    const req_signup = async () => {
        const data = {
            id : $("#signup_id").val(),
            pw : $("#signup_pw").val(),
            name : $("#signup_name").val(),
            email : $("#signup_email").val(),
            addr : $("#signup_addr1").val() + " " + $("#signup_addr2").val(),
        }
        console.log(data);
        await axios.post("/api/mem/sign_up", data)
        .then(res => {
            console.log(res);
            if (res == 1) {
                alert("회원가입에 성공하였습니다. 로그인 해주세요 ~");
                window.location.href = "/login";
            }
        });
    }

    return (
        <div className="signup">
            <Nav />
            <div className="signup_flexContainer">
                <div className="signup_container">
                    <div>
                        <h2>회 원 가 입</h2>
                    </div>
                    <div>
                        <input type="text" className="signup_input" id="signup_id" placeholder="아이디를 입력해주세요." onChange={check_id}></input>
                        {checkId && <small>아이디는 영어 대/소문자 + 숫자로만 구성해주세요.</small>}
                    </div>
                    <div className="signup_bt_area">
                        <button className="signup_buttons_bt">중복검사</button>
                    </div>
                    <div>
                        <input type="password" className="signup_input" id="signup_pw" placeholder="비밀번호를 입력해주세요." onChange={check_pw}></input>
                        {checkPw && <small>비밀번호는 영어 대문자 + 소문자 + 숫자 + 특수문자로 구성해주세요.</small>}
                    </div>
                    <div>
                        <input type="password" className="signup_input" id="signup_check_pw" placeholder="비밀번호를 재입력해주세요." onChange={check_eq_pw}></input>
                        {checkEqPw && <small>비밀번호가 일치하지 않습니다.</small>}
                    </div>
                    <div>
                        <input type="text" className="signup_input" id="signup_name" placeholder="닉네임을 입력해주세요." onChange={check_name}></input>
                        {checkName && <small>닉네임은 한글, 영어 대/소문자로만 구성이 가능합니다.</small>}
                    </div>
                    <div>
                        <input type="text" className="signup_input" id="signup_email" placeholder="이메일을 입력해주세요." onChange={check_email}/>
                        {checkEmail && <small>올바른 형식으로 작성해주세요.</small>}
                    </div>
                    <div className="join_text">
                        {modalState &&
                        <div className='daumAPI'>
                            <button className='daumAPI_bt' onClick={() => setModalState(false)}>닫기</button>
                            <DaumPostcode
                            style={postCodeStyle}
                            onComplete={onCompletePost}
                            ></DaumPostcode>
                        </div>
                        }
                        <input type="text" className="signup_input" id="signup_addr1" placeholder="주소"/>
                    </div>
                    <div>
                        <input type="text" className="signup_input" id="signup_addr2" placeholder="상세 주소"/>
                    </div>
                    <div className="signup_bt_area">
                        <button className="signup_buttons_bt" onClick={handleAdressSearch}>주소 찾기</button>
                    </div>
                    <div className="login_buttons">
                        <input type="button" value="회원가입" className="signup_buttons_submit" onClick={req_signup}></input>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Signup;