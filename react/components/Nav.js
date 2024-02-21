import { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import "../css/nav.css";

const Nav = () => {
    const [user, setUser] = useState({});

    const getMemInfo = async () => {
        await axios.post("/api/mem/getMemInfo",
                        {
                            token: cookie.get("userToken"),
                        },
                        {
                            headers: {
                                AUTHORIZATION: "Bearer " + cookie.get("userToken"),
                            }
                        }
                        )
        .then(res => {
            console.log(res);
            if (res.data.mem_id == "anonymous") {
                alert("토큰이 만료되었습니다. 로그인을 다시 해주세요.");
                window.location.href = "/logout";
                return ;
            }
            setUser(res.data);
        });
    }

    useEffect(() => {
        getMemInfo();
    },[]);

    return (
        <div className="nav">
            <div className="nav_container">
                <div className="nav_logo_area">
                    <div className="nav_logo" onClick={() => window.location.href="/"}>
                        <h1>WAY</h1>
                    </div>
                    <div className="nav_links_menu">
                        <div className="nav_links_board" onClick={() => window.location.href="/board/list"}>게시판</div>
                    </div>
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
                    <div className="nav_links_user" onClick={() => window.location.href="/"}>
                        {user.mem_name} 님 반갑습니다.
                    </div>}
                    {cookie.get("userToken") && 
                    <div className="nav_links_logout" onClick={() => window.location.href="/logout"}>
                        로그아웃
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Nav;