import cookie from "js-cookie";
import "../css/nav.css";

const Nav = () => {
    return (
        <div className="nav">
            <div className="nav_container">
                <div className="nav_logo" onClick={() => window.location.href="/"}>
                    <img src="/images/logo.png" />
                </div>
                <div className="nav_links">
                    {!cookie.get("userToken") && 
                    <div className="nav_links_signUp" onClick={() => window.location.href="/sign_up"}>
                        회원가입
                    </div>}
                    {!cookie.get("userToken") && 
                    <div className="nav_links_login" onClick={() => window.location.href="/login"}>
                        로그인
                    </div>}
                    {cookie.get("userToken") && 
                    <div className="nav_links_logout" onClick={() => window.location.href="/logout"}>
                        로그아웃
                    </div>}
                    <div className="nav_links_board" onClick={() => window.location.href="/board/list"}>
                        게시판
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav;