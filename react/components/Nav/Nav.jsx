import { useNavigate } from "react-router-dom";
import "./Nav.css";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContextProvider";

const Nav = () => {

    const {isLogin, logout} = useContext(LoginContext);

    const navigate = useNavigate();
    
    return (
        <>
            <div className="nav_container">
                <div className="nav_logo" onClick={() => navigate("/")}>
                    <h1>Way</h1>
                </div>
                    {!isLogin ?
                        <div className="nav_menu">
                            <div className="nav_button" onClick={() => navigate("/recommendationBoard")}>맛집추천</div>
                            <div className="nav_button">소개</div>
                            <div className="nav_button" onClick={() => navigate("/signUp")}>회원가입</div>
                            <div className="nav_login_button" onClick={() => navigate("/loginPage")}>로그인</div>
                        </div>
                        :
                        <div className="nav_menu">
                            <div className="nav_button" onClick={() => navigate("/recommendationBoard")}>맛집추천</div>
                            <div className="nav_button">소개</div>
                            <div className="nav_button" onClick={() => navigate("/myInfo")}>마이페이지</div>
                            <div className="nav_login_button" onClick={() => logout()}>로그아웃</div>
                        </div>
                    }
            </div>
        </>
    )

}

export default Nav;