import Nav from "./Nav";
import "../css/login.css";

const Login = () => {

    return (
        <div className="login">
            <Nav />
            <div className="login_flexContainer">
                <div className="login_container">
                    <div>
                        <h2>로 그 인</h2>
                    </div>
                    <div>
                        <input type="text" className="login_inputid" placeholder="아이디를 입력해주세요."></input>
                    </div>
                    <div>
                        <input type="password" className="login_inputpw" placeholder="비밀번호를 입력해주세요."></input>
                    </div>
                    <div className="login_buttons">
                        <input type="button" value="로그인" className="login_buttons_submit"></input>
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