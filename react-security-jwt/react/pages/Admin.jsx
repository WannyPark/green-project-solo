import React, { useContext, useEffect } from "react";
import Header from "../components/Header/Header";
import { LoginContext } from "../contexts/LoginContextProvider";
import { useNavigate } from "react-router-dom";
import * as Swal from "../apis/alert";

const About = () => {

    const { isLogin, userInfo, roles } = useContext(LoginContext);
    const navigate = useNavigate();

    useEffect(() => {
        if ( !isLogin || !userInfo ) {
            Swal.alert("로그인이 필요합니다.", "로그인 화면으로 이동합니다.", "warning", () => {navigate("/loginPage")});
            // alert("로그인이 필요합니다.");
            // navigate("/loginPage");
            return ;
        }
        if ( !roles.isAdmin ) {
            Swal.alert("권한이 없습니다.", "이전 화면으로 이동합니다.", "warning", () => {navigate(-1)});
            // alert("권한이 없습니다.");
            // navigate(-1);
            return ;
        }
    }, [ userInfo ])

    return (
        <>
        {
            isLogin && roles.isAdmin &&
            <>
                <Header />
                <div className="container">
                    <h1>Admin</h1>
                    <hr />
                    <h2>관리자 페이지</h2>
                </div>
            </>
        }
        </>
    )

}

export default About;