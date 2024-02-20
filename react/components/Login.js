import Nav from "./Nav";
import axios from "axios";
import $ from "jquery";
import cookie from "js-cookie";
import "../css/login.css";

const Login = () => {
    const login = async () => {
        const data = {
            id : $("#login_id").val(),
            pw : $("#login_pw").val(),
        }
        await axios.post("/api/mem/login", data)
        .then(res => {
            if (res.data.token != undefined) {
                console.log(res);
                cookie.set("userToken", res.data.token);
                console.log(cookie.get("userToken"));
                alert("로그인에 성공했습니다.");
                window.location.href = "/";
                return ;
            }
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
            window.location.reload();
        });
    }

    return (
        <div className="login">
            <Nav />
            <div className="login_flexContainer">
                <div className="login_container">
                    <div>
                        <h2>로 그 인</h2>
                    </div>
                    <div>
                        <input type="text" className="login_inputid" id="login_id" placeholder="아이디를 입력해주세요."></input>
                    </div>
                    <div>
                        <input type="password" className="login_inputpw" id="login_pw" placeholder="비밀번호를 입력해주세요."></input>
                    </div>
                    <div className="login_buttons">
                        <input type="button" value="로그인" className="login_buttons_submit" onClick={login}></input>
                        <div className="login_goSignup" onClick={() => {window.location.href="/sign_up"}}>회원가입</div>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Login;