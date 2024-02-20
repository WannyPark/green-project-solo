import cookie from "js-cookie";

const Logout = () => {
    const logout = () => {
        cookie.remove("userToken");
        window.location.href = "/";
    }
    return (
        <div className="logout">
            {logout()}
            <h1>로그아웃 중입니다.</h1>
        </div>
    )
}

export default Logout;