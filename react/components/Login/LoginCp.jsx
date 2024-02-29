import { useNavigate } from "react-router-dom";
import * as auth from "../../apis/auth";
import Cookie from "js-cookie";
import $ from "jquery";
import { useContext, useEffect } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";
import "./LoginCp.css";

const LoginCp = () => {
    
    const navigate = useNavigate();

    const {login} = useContext(LoginContext);

    const reqLogin = () => {
        const id = $("#login_id").val();
        const pw = $("#login_pw").val();

        login(id, pw);
    }

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            reqLogin();
        }
    }

    useEffect(() => {
        const cookie = Cookie.get("accessToken");
        if (cookie != null) {
            navigate("/");
            return ;
        }
        $(".login_form").css("display", "flex").hide().fadeIn(500);
    }, [])

    return (
        <>
            <div className="login_form">
                <div className="login_title">
                    <h2>Login</h2>
                </div>
                <div className="login_id_area">
                    <input type="text" id="login_id" name="login_id" placeholder="ID" onKeyDown={(e) => {pressEnter(e)}} />
                </div>
                <div className="login_pw_area">
                    <input type="password" id="login_pw" name="login_pw" placeholder="Password" onKeyDown={(e) => {pressEnter(e)}} />
                </div>
                <div className="login_button_area">
                    <input type="button" className="login_button" value="로 그 인" onClick={() => reqLogin()} />
                </div>
            </div>
        </>
    )

}

export default LoginCp;